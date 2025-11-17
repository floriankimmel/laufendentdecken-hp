import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample reviews
  const review1 = await prisma.review.create({
    data: {
      productName: 'Trail Runner Pro',
      brand: 'Mountain Gear',
      weight: 285.5,
      price: 149.99,
      podcastEpisode: 'https://laufendentdecken-podcast.at/episode/1',
      rating: 4.5,
      statement: 'Excellent trail running shoe with great grip and comfort.',
      shoe: {
        create: {
          drop: 8,
          grip: 'Excellent',
          sole: 'Vibram MegaGrip',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://example.com/product/trail-runner-pro',
            altText: 'Buy on Example Store',
          },
        ],
      },
      pictureLinks: {
        create: [
          {
            link: 'https://example.com/images/trail-runner-pro.jpg',
            altText: 'Trail Runner Pro - Side View',
          },
        ],
      },
    },
  });

  const review2 = await prisma.review.create({
    data: {
      productName: 'Ultra Distance 500',
      brand: 'EnduroTech',
      weight: 310.0,
      price: 189.99,
      podcastEpisode: 'https://laufendentdecken-podcast.at/episode/2',
      rating: 5,
      statement: 'Perfect for ultra-distance runs with exceptional cushioning.',
      shoe: {
        create: {
          drop: 4,
          grip: 'Very Good',
          sole: 'Continental Rubber',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://example.com/product/ultra-distance-500',
            altText: 'Buy on Example Store',
          },
        ],
      },
      pictureLinks: {
        create: [
          {
            link: 'https://example.com/images/ultra-distance-500.jpg',
            altText: 'Ultra Distance 500 - Profile',
          },
        ],
      },
    },
  });

  // Create sample trail events
  const trailEvent1 = await prisma.trailEvent.create({
    data: {
      name: 'Alpine Challenge 2024',
      date: '2024-06-15',
      location: 'Austrian Alps',
      podcastEpisode: 'https://laufendentdecken-podcast.at/episode/10',
      distances: {
        create: [
          {
            distance: 25,
            gpxLink: 'https://example.com/gpx/alpine-challenge-25k.gpx',
          },
          {
            distance: 50,
            gpxLink: 'https://example.com/gpx/alpine-challenge-50k.gpx',
          },
          {
            distance: 100,
            gpxLink: 'https://example.com/gpx/alpine-challenge-100k.gpx',
          },
        ],
      },
    },
  });

  const trailEvent2 = await prisma.trailEvent.create({
    data: {
      name: 'Forest Trail Marathon',
      date: '2024-09-20',
      location: 'Black Forest, Germany',
      podcastEpisode: 'https://laufendentdecken-podcast.at/episode/15',
      distances: {
        create: [
          {
            distance: 21.1,
            gpxLink: 'https://example.com/gpx/forest-trail-half.gpx',
          },
          {
            distance: 42.2,
            gpxLink: 'https://example.com/gpx/forest-trail-full.gpx',
          },
        ],
      },
    },
  });

  console.log('Seeding completed!');
  console.log({
    reviews: [review1, review2],
    trailEvents: [trailEvent1, trailEvent2],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
