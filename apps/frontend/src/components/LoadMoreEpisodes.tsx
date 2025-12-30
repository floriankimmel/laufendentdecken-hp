import { useState } from 'preact/hooks';
import type { Episode, Show } from '../lib/rss';

interface Props {
  initialPage: number;
  show: Show;
}

export default function LoadMoreEpisodes({ initialPage, show }: Props) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/episodes/${page}.json`);
      const data = await res.json();
      setEpisodes([...episodes, ...data.episodes.data]);
      setCanLoadMore(data.canLoadMore);
      setPage(page + 1);
    } catch (error) {
      console.error('Failed to load more episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!canLoadMore && episodes.length === 0) {
    return null;
  }

  return (
    <>
      {episodes.map((episode) => (
        <li key={episode.id} class="dark:border-dark-border border-b">
          <div class="flex w-full flex-col py-12 lg:flex-row">
            <img
              alt={`${episode.title} - episode art`}
              aria-hidden="true"
              class="mb-3 block h-40 w-40 rounded-md lg:mr-6"
              height={160}
              loading="lazy"
              src={episode.episodeThumbnail ?? show.image}
              width={160}
            />

            <div class="flex flex-col">
              <time class="text-xs tracking-wide text-gray-500 uppercase">
                {new Date(episode.published)
                  .toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                  .toUpperCase()}
              </time>

              <h2 class="text-light-text-heading my-2 text-lg font-bold dark:text-white">
                <a href={`/${episode.episodeNumber}`}>
                  {episode.episodeNumber}: {episode.title}
                </a>
              </h2>

              <p class="mb-5">{episode.description}</p>

              <div class="flex items-center gap-6 text-sm">
                <a
                  class="text-light-text-heading font-bold dark:text-white"
                  href={`/${episode.episodeNumber}`}
                >
                  Shownotes anzeigen
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}

      {canLoadMore && (
        <div class="py-8 text-center">
          <button
            class="rounded-md bg-cyan-200 px-8 py-3 font-bold transition-colors hover:bg-cyan-300"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Laden...' : 'Mehr laden'}
          </button>
        </div>
      )}
    </>
  );
}
