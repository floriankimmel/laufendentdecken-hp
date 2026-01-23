import { htmlToText } from 'html-to-text';
import he from 'he';
import { XMLParser } from 'fast-xml-parser';
import { array, number, object, optional, parse, string } from 'valibot';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { optimizeImage } from './optimize-episode-image';
import { dasherize } from '../utils/dasherize';
import { truncate } from '../utils/truncate';
import starpodConfig from '../../starpod.config';

// Helper to parse RSS feed using fetch + fast-xml-parser (Bun-compatible)
async function parseFeedFromURL(url: string) {
  const response = await fetch(url);
  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true
  });

  const result = parser.parse(xml);
  const channel = result.rss?.channel || result.feed;

  // Convert to rss-to-json-like format
  const items = (
    Array.isArray(channel.item) ? channel.item : [channel.item]
  ).map((item: any) => ({
    id: item.guid?.['#text'] || item.guid || item.link,
    title: item.title,
    published: new Date(item.pubDate).getTime(),
    description: item.description,
    content_encoded: item['content:encoded'],
    itunes_duration: item['itunes:duration'],
    itunes_episode: item['itunes:episode'],
    itunes_episodeType: item['itunes:episodeType'] || 'full',
    itunes_image: item['itunes:image']
      ? { href: item['itunes:image']?.['@_href'] }
      : undefined,
    enclosures: item.enclosure
      ? (Array.isArray(item.enclosure) ? item.enclosure : [item.enclosure]).map(
          (enc: any) => ({
            url: enc['@_url'],
            type: enc['@_type']
          })
        )
      : []
  }));

  return {
    items,
    channel: {
      title: channel.title,
      description: channel.description,
      link: channel.link,
      image: channel.image ? { url: channel.image?.url } : undefined,
      'itunes:image': channel['itunes:image']
        ? { '@_href': channel['itunes:image']?.['@_href'] }
        : undefined
    }
  };
}

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

function replaceWordPressEmojis(html: string): string {
  // Replace WordPress emoji images with native Unicode emojis
  // Pattern: <img ... alt="emoji" ... class="wp-smiley" ... />
  return html.replace(
    /<img[^>]*\balt="([^"]*)"[^>]*\bclass="[^"]*wp-smiley[^"]*"[^>]*\/?>/gi,
    '$1'
  );
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
  featuredImage?: string;
  audio: {
    src: string;
    type: string;
  };
}

let showInfoCache: Show | null = null;

export async function getShowInfo(skipCache = false): Promise<Show> {
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
  const feed = await parseFeedFromURL(starpodConfig.rssFeed);
  const showInfo = {
    title: feed.channel?.title || '',
    description: feed.channel?.description || '',
    image:
      feed.channel?.image?.url ||
      feed.channel?.['itunes:image']?.['@_href'] ||
      '',
    link: feed.channel?.link || starpodConfig.rssFeed
  } as Show;
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

function extractFeaturedImageFromContent(content: string): string | undefined {
  // Try to find wordpress.png in content first (fastest)
  const wpMatch = content.match(/wp-content\/uploads\/[^"]*wordpress\.png/);
  if (wpMatch) {
    return `https://laufendentdecken-podcast.at/${wpMatch[0]}`;
  }
  return undefined;
}

async function fetchWordPressFeaturedImage(
  episodeNumber: string,
  content: string
): Promise<string | undefined> {
  // First try to extract from content (no extra request needed)
  const contentImage = extractFeaturedImageFromContent(content);
  if (contentImage) {
    return contentImage;
  }

  // Fallback: fetch the page (with short timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    const response = await fetch(
      `https://laufendentdecken-podcast.at/${episodeNumber}/`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    const html = await response.text();
    const match = html.match(/wp-content\/uploads\/[^"]*wordpress\.png/);
    if (match) {
      return `https://laufendentdecken-podcast.at/${match[0]}`;
    }
  } catch (e) {
    // Silently fail - not critical
  }
  return undefined;
}

let episodesCache: Array<Episode> | null = null;

export async function getAllEpisodes(
  skipCache = false
): Promise<Array<Episode>> {
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

  let feed = await parseFeedFromURL(starpodConfig.rssFeed);
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
          const episodeImageUrl = itunes_image?.href
            ? he.decode(itunes_image.href)
            : undefined;

          const rawContent = content_encoded || description;
          const featuredImage = await fetchWordPressFeaturedImage(
            episodeNumber,
            rawContent
          );

          return {
            id,
            title: `${title}`,
            content: replaceWordPressEmojis(rawContent), // Replace WP emoji images with native emojis
            description: truncate(htmlToText(description), 260),
            duration: parseDuration(itunes_duration),
            episodeImage: episodeImageUrl,
            episodeNumber,
            episodeSlug,
            episodeThumbnail: await optimizeImage(episodeImageUrl, {
              height: 160,
              width: 160
            }),
            featuredImage,
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
