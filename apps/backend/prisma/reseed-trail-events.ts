import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing trail events...');

  // Delete all existing trail events (cascade will handle related records)
  await prisma.trailEvent.deleteMany({});

  console.log('Existing trail events cleared.');
  console.log('Seeding trail events from podcast episodes...');

  // Event 1: Vienna Trail Run
  await prisma.trailEvent.create({
    data: {
      name: 'Vienna Trail Run',
      date: '2025-10-12',
      location: 'Vienna (Kobenzl), Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/vtr25/',
      distances: {
        create: [
          { distance: 15, gpxLink: 'https://example.com/gpx/vtr-15k.gpx' },
          { distance: 30, gpxLink: 'https://example.com/gpx/vtr-30k.gpx' },
          { distance: 50, gpxLink: 'https://example.com/gpx/vtr-50k.gpx' },
        ],
      },
    },
  });

  // Event 2: Austria Trail Trophy Werfenweng
  await prisma.trailEvent.create({
    data: {
      name: 'Austria Trail Trophy (ATT) Werfenweng',
      date: '2025-07-15',
      location: 'Werfenweng, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/331/',
      distances: {
        create: [
          { distance: 23, gpxLink: 'https://example.com/gpx/att-23k.gpx' },
          { distance: 50, gpxLink: 'https://example.com/gpx/att-50k.gpx' },
        ],
      },
    },
  });

  // Event 3: Großglockner Ultra Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Großglockner Ultra Trail (GGUT)',
      date: '2025-08-15',
      location: 'Kaprun, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/270/',
      distances: {
        create: [
          { distance: 88, gpxLink: 'https://ultratrail.at/ggut-88k.gpx' },
          { distance: 110, gpxLink: 'https://ultratrail.at/ggut-110k.gpx' },
        ],
      },
    },
  });

  // Event 4: Großglockner Mountainrun
  await prisma.trailEvent.create({
    data: {
      name: 'Großglockner Mountainrun',
      date: '2025-07-20',
      location: 'Heiligenblut, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/320/',
      distances: {
        create: [
          { distance: 21, gpxLink: 'https://glockner-mountain-run.at/21k.gpx' },
          { distance: 42, gpxLink: 'https://glockner-mountain-run.at/42k.gpx' },
        ],
      },
    },
  });

  // Event 5: Paznaun Ischgl Ultra Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Paznaun Ischgl Ultra Trail (PIUT)',
      date: '2025-09-10',
      location: 'Ischgl, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/320/',
      distances: {
        create: [
          { distance: 25, gpxLink: 'https://example.com/gpx/piut-25k.gpx' },
          { distance: 50, gpxLink: 'https://example.com/gpx/piut-50k.gpx' },
          { distance: 100, gpxLink: 'https://example.com/gpx/piut-100k.gpx' },
        ],
      },
    },
  });

  // Event 6: KAT100
  await prisma.trailEvent.create({
    data: {
      name: 'Kitzbüheler Alpen Trail (KAT100)',
      date: '2025-08-10',
      location: 'St. Johann in Tirol, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/270/',
      distances: {
        create: [
          { distance: 61, gpxLink: 'https://example.com/gpx/kat100-61k.gpx' },
          { distance: 100, gpxLink: 'https://example.com/gpx/kat100-100k.gpx' },
        ],
      },
    },
  });

  // Event 7: Salomon Pitz Alpine Glacier Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Salomon Pitz Alpine Glacier Trail',
      date: '2025-08-01',
      location: 'Pitztal, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/323/',
      distances: {
        create: [
          { distance: 15, gpxLink: 'https://pitz-alpine.at/15k.gpx' },
          { distance: 30, gpxLink: 'https://pitz-alpine.at/30k.gpx' },
          { distance: 45, gpxLink: 'https://pitz-alpine.at/45k.gpx' },
          { distance: 60, gpxLink: 'https://pitz-alpine.at/60k.gpx' },
          { distance: 90, gpxLink: 'https://pitz-alpine.at/90k.gpx' },
          { distance: 105, gpxLink: 'https://pitz-alpine.at/105k.gpx' },
        ],
      },
    },
  });

  // Event 8: Wienerwald Ultratrail
  await prisma.trailEvent.create({
    data: {
      name: 'Wienerwald Ultratrail (WUT)',
      date: '2025-10-16',
      location: 'Vienna Woods, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/044/',
      distances: {
        create: [
          { distance: 55, gpxLink: 'https://example.com/gpx/wut-55k.gpx' },
          { distance: 160, gpxLink: 'https://example.com/gpx/wut-160k.gpx' },
        ],
      },
    },
  });

  // Event 9: Mozart 100
  await prisma.trailEvent.create({
    data: {
      name: 'Mozart 100',
      date: '2025-06-15',
      location: 'Salzburg Region, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/210/',
      distances: {
        create: [
          { distance: 80, gpxLink: 'https://example.com/gpx/mozart-80k.gpx' },
          { distance: 105, gpxLink: 'https://example.com/gpx/mozart-105k.gpx' },
        ],
      },
    },
  });

  // Event 10: UTMB (Ultra-Trail du Mont-Blanc)
  await prisma.trailEvent.create({
    data: {
      name: 'Ultra-Trail du Mont-Blanc (UTMB)',
      date: '2025-08-25',
      location: 'Chamonix, France',
      podcastEpisode: 'https://laufendentdecken-podcast.at/327/',
      distances: {
        create: [
          { distance: 15, gpxLink: 'https://utmb.world/etc.gpx' },
          { distance: 55, gpxLink: 'https://utmb.world/occ.gpx' },
          { distance: 101, gpxLink: 'https://utmb.world/ccc.gpx' },
          { distance: 171, gpxLink: 'https://utmb.world/utmb.gpx' },
        ],
      },
    },
  });

  // Event 11: Lavaredo Ultra Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Lavaredo Ultra Trail (LUT)',
      date: '2025-06-22',
      location: 'Cortina d\'Ampezzo, Italy',
      podcastEpisode: 'https://laufendentdecken-podcast.at/022/',
      distances: {
        create: [
          { distance: 48, gpxLink: 'https://ultratrail.it/lut-48k.gpx' },
          { distance: 80, gpxLink: 'https://ultratrail.it/lut-80k.gpx' },
          { distance: 120, gpxLink: 'https://ultratrail.it/lut-120k.gpx' },
        ],
      },
    },
  });

  // Event 12: Julian Alps Ultra Sky Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Julian Alps Ultra Sky Trail by UTMB',
      date: '2025-09-15',
      location: 'Kranjska Gora, Slovenia',
      podcastEpisode: 'https://laufendentdecken-podcast.at/330/',
      distances: {
        create: [
          { distance: 50, gpxLink: 'https://example.com/gpx/julian-50k.gpx' },
          { distance: 108, gpxLink: 'https://example.com/gpx/julian-108k.gpx' },
          { distance: 120, gpxLink: 'https://example.com/gpx/julian-120k.gpx' },
        ],
      },
    },
  });

  // Event 13: Tor des Géants
  await prisma.trailEvent.create({
    data: {
      name: 'Tor des Géants',
      date: '2025-09-07',
      location: 'Aosta Valley, Italy',
      podcastEpisode: 'https://laufendentdecken-podcast.at/330/',
      distances: {
        create: [
          { distance: 330, gpxLink: 'https://example.com/gpx/tor-330k.gpx' },
        ],
      },
    },
  });

  // Event 14: Marathon des Sables
  await prisma.trailEvent.create({
    data: {
      name: 'Marathon des Sables',
      date: '2025-04-15',
      location: 'Sahara Desert, Morocco',
      podcastEpisode: 'https://laufendentdecken-podcast.at/337/',
      distances: {
        create: [
          { distance: 250, gpxLink: 'https://marathondessables.com/route.gpx' },
        ],
      },
    },
  });

  // Event 15: Ultra Gobi Race
  await prisma.trailEvent.create({
    data: {
      name: 'Ultra Gobi Race',
      date: '2025-05-20',
      location: 'Gobi Desert, China',
      podcastEpisode: 'https://laufendentdecken-podcast.at/337/',
      distances: {
        create: [
          { distance: 250, gpxLink: 'https://ultragobiseries.com/route.gpx' },
        ],
      },
    },
  });

  // Event 16: Eiger Ultra Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Eiger Ultra Trail',
      date: '2025-07-12',
      location: 'Eiger, Switzerland',
      podcastEpisode: 'https://laufendentdecken-podcast.at/321/',
      distances: {
        create: [
          { distance: 101, gpxLink: 'https://example.com/gpx/eiger-101.gpx' },
          { distance: 250, gpxLink: 'https://example.com/gpx/eiger-250.gpx' },
        ],
      },
    },
  });

  // Event 17: Cappadocia Ultra Trail
  await prisma.trailEvent.create({
    data: {
      name: 'Cappadocia Ultra Trail',
      date: '2025-10-05',
      location: 'Cappadocia, Turkey',
      podcastEpisode: 'https://laufendentdecken-podcast.at/317/',
      distances: {
        create: [
          { distance: 38, gpxLink: 'https://cappadociaultratrail.com/38k.gpx' },
          { distance: 60, gpxLink: 'https://cappadociaultratrail.com/60k.gpx' },
          { distance: 110, gpxLink: 'https://cappadociaultratrail.com/110k.gpx' },
        ],
      },
    },
  });

  // Event 18: Transvulcania
  await prisma.trailEvent.create({
    data: {
      name: 'Transvulcania',
      date: '2025-05-10',
      location: 'La Palma, Canary Islands, Spain',
      podcastEpisode: 'https://laufendentdecken-podcast.at/189/',
      distances: {
        create: [
          { distance: 24, gpxLink: 'https://example.com/gpx/transvulcania-24k.gpx' },
          { distance: 73, gpxLink: 'https://example.com/gpx/transvulcania-73k.gpx' },
        ],
      },
    },
  });

  // Event 19: Lewa Safari Marathon
  await prisma.trailEvent.create({
    data: {
      name: 'Lewa Safari Marathon',
      date: '2025-06-24',
      location: 'Lewa Wildlife Conservancy, Kenya',
      podcastEpisode: 'https://laufendentdecken-podcast.at/213/',
      distances: {
        create: [
          { distance: 21.1, gpxLink: 'https://lewasafarimarathon.com/half.gpx' },
          { distance: 42.2, gpxLink: 'https://lewasafarimarathon.com/full.gpx' },
        ],
      },
    },
  });

  // Event 20: Vienna Marathon
  await prisma.trailEvent.create({
    data: {
      name: 'Vienna City Marathon',
      date: '2025-04-20',
      location: 'Vienna, Austria',
      podcastEpisode: 'https://laufendentdecken-podcast.at/061/',
      distances: {
        create: [
          { distance: 10, gpxLink: 'https://example.com/gpx/vienna-10k.gpx' },
          { distance: 21.1, gpxLink: 'https://example.com/gpx/vienna-half.gpx' },
          { distance: 42.2, gpxLink: 'https://example.com/gpx/vienna-full.gpx' },
        ],
      },
    },
  });

  console.log('Successfully seeded 20 trail running events from podcast episodes!');
  console.log('Events are now available via API at http://localhost:3001/api/trail-events');
}

main()
  .catch((e) => {
    console.error('Error seeding trail events:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
