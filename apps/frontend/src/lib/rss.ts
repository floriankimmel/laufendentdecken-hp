import { htmlToText } from 'html-to-text';
import parseFeed from 'rss-to-json';
import { array, number, object, optional, parse, string } from 'valibot';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';
import starpodConfig from '../../starpod.config';

const CACHE_DIR = join(process.cwd(), '.cache');
const SHOW_CACHE_FILE = join(CACHE_DIR, 'show-info.json');
const EPISODES_CACHE_FILE = join(CACHE_DIR, 'episodes.json');

function parseDuration(duration: string | number | undefined): number {
  if (!duration) return 0;
  if (typeof duration === 'number') return duration;

  // Parse HH:MM:SS or MM:SS format
  const parts = duration.split(':').map((p) => parseInt(p, 10));
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

export interface Show {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Episode {
  id: string;
  title: string;
  published: number;
  description: string;
  duration: number;
  content: string;
  episodeImage?: string;
  episodeNumber?: string;
  episodeSlug: string;
  episodeThumbnail?: string;
  audio: {
    src: string;
    type: string;
  };
}

let showInfoCache: Show | null = null;

export async function getShowInfo(skipCache = false) {
  if (showInfoCache && !skipCache) {
    return showInfoCache;
  }

  // Try to load from file cache
  if (!skipCache && existsSync(SHOW_CACHE_FILE)) {
    try {
      const cached = JSON.parse(readFileSync(SHOW_CACHE_FILE, 'utf-8'));
      showInfoCache = cached;
      return cached;
    } catch (e) {
      console.warn('Failed to read show cache, refetching...');
    }
  }

  // Fetch from RSS
  // @ts-expect-error
  const showInfo = (await parseFeed.parse(starpodConfig.rssFeed)) as Show;
  showInfo.image = (await optimizeImage(showInfo.image, {
    height: 640,
    width: 640
  })) as string;

  // Save to file cache
  try {
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR, { recursive: true });
    }
    writeFileSync(SHOW_CACHE_FILE, JSON.stringify(showInfo, null, 2));
  } catch (e) {
    console.warn('Failed to write show cache:', e);
  }

  showInfoCache = showInfo;
  return showInfo;
}

let episodesCache: Array<Episode> | null = null;

export async function getAllEpisodes(skipCache = false) {
  if (episodesCache && !skipCache) {
    return episodesCache;
  }

  // Try to load from file cache
  if (!skipCache && existsSync(EPISODES_CACHE_FILE)) {
    try {
      const cached = JSON.parse(readFileSync(EPISODES_CACHE_FILE, 'utf-8'));
      episodesCache = cached;
      return cached;
    } catch (e) {
      console.warn('Failed to read episodes cache, refetching...');
    }
  }

  let FeedSchema = object({
    items: array(
      object({
        id: string(),
        title: string(),
        published: number(),
        description: string(),
        content_encoded: optional(string()), // Full HTML content from content:encoded
        itunes_duration: optional(string()), // Can be string like "00:00:00" or number
        itunes_episode: optional(number()),
        itunes_episodeType: string(),
        itunes_image: optional(object({ href: optional(string()) })),
        enclosures: array(
          object({
            url: string(),
            type: string()
          })
        )
      })
    )
  });

  // @ts-expect-error
  let feed = (await parseFeed.parse(starpodConfig.rssFeed)) as Show;
  let items = parse(FeedSchema, feed).items;

  let episodes: Array<Episode> = await Promise.all(
    items
      .filter((item) => item.itunes_episodeType !== 'trailer')
      .map(
        async ({
          description,
          content_encoded,
          id,
          title,
          enclosures,
          published,
          itunes_duration,
          itunes_episode,
          itunes_episodeType,
          itunes_image
        }) => {
          const episodeNumber =
            itunes_episodeType === 'bonus' ? 'Bonus' : `${itunes_episode}`;
          const episodeSlug = dasherize(title);

          return {
            id,
            title: `${title}`,
            content: content_encoded || description, // Use full content if available, fallback to description
            description: truncate(htmlToText(description), 260),
            duration: parseDuration(itunes_duration),
            episodeImage: itunes_image?.href,
            episodeNumber,
            episodeSlug,
            episodeThumbnail: await optimizeImage(itunes_image?.href, {
              height: 160,
              width: 160
            }),
            published,
            audio: enclosures.map((enclosure) => ({
              src: enclosure.url,
              type: enclosure.type
            }))[0]
          };
        }
      )
  );

  // Save to file cache
  try {
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR, { recursive: true });
    }
    writeFileSync(EPISODES_CACHE_FILE, JSON.stringify(episodes, null, 2));
  } catch (e) {
    console.warn('Failed to write episodes cache:', e);
  }

  episodesCache = episodes;
  return episodes;
}
