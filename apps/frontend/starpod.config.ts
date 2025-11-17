import { defineStarpodConfig } from 'src/utils/config';

export default defineStarpodConfig({
  blurb: 'Der österreichische Laufpodcast',
  description:
    'Laufend Entdecken ist der österreichische Laufpodcast. Wir sprechen über Laufen, Training, Wettkämpfe und alles rund ums Thema Laufsport.',
  hosts: [
    {
      name: 'Florian',
      bio: 'Host',
      img: 'florian.png',
      github: 'https://github.com/floriankimmel',
      website: 'https://laufendentdecken-podcast.at'
    },
    {
      name: 'Peter',
      bio: 'Host',
      img: 'peter.png',
      website: 'https://laufendentdecken-podcast.at'
    },
    {
      name: 'Geordi',
      bio: 'Host',
      img: 'geordi.png',
      website: 'https://laufendentdecken-podcast.at'
    }
  ],
  platforms: {
    apple: 'https://podcasts.apple.com/at/podcast/laufend-entdecken-podcast-der-%C3%B6sterreichische-laufpodcast/id1191080260',
    appleIdNumber: '1191080260',
    spotify: 'https://open.spotify.com/show/74Qf7mQCKHCWflEK7YpegY',
    youtube: 'https://www.youtube.com/channel/UCwYSWnwytu411Y9vrBO333w/videos'
  },
  rssFeed: 'https://laufendentdecken-podcast.at/feed/mp3/'
});

