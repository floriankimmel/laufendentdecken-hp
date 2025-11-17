import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing reviews...');

  // Delete all existing reviews (cascade will handle related records)
  await prisma.review.deleteMany({});

  console.log('Existing reviews cleared.');
  console.log('Seeding reviews from podcast episodes...');

  // Review 1: Salomon S/LAB Pulsar 4
  await prisma.review.create({
    data: {
      productName: 'S/LAB Pulsar 4',
      brand: 'Salomon',
      weight: 270,
      price: 250,
      podcastEpisode: 'https://laufendentdecken-podcast.at/329/',
      rating: 4.5,
      statement: 'Der Salomon S/LAB Pulsar 4 ist eine gelungene Weiterentwicklung der Serie, die sich von den minimalistischeren Vorgängern in Richtung mehr Komfort bewegt. Der Schuh funktioniert auf verschiedensten Untergründen, von Klettersteigen bis zu Schotterwegen. Mit 4mm Stollentiefe bietet er auch auf härterem Untergrund guten Grip und wirkt dabei präzise ohne klobig zu erscheinen.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Excellent',
          sole: 'Custom Salomon',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.salomon.com/de-at/shop-emea/product/s-lab-pulsar-4.html',
            altText: 'Salomon S/LAB Pulsar 4',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 2: Salomon Pulsar
  await prisma.review.create({
    data: {
      productName: 'Pulsar',
      brand: 'Salomon',
      weight: 281,
      price: 150,
      podcastEpisode: 'https://laufendentdecken-podcast.at/336/',
      rating: 4,
      statement: 'Der Salomon Pulsar ist ein solider Allrounder für Wald- und Wiesenwege ohne übermäßige Dämpfung. Er positioniert sich als vielseitige Option fürs Trailrunning, die nicht auf maximale Polsterung setzt.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Good',
          sole: 'Custom Salomon',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 3: Saucony Exodus Ultra 4
  await prisma.review.create({
    data: {
      productName: 'Exodus Ultra 4',
      brand: 'Saucony',
      weight: 295,
      price: 180,
      podcastEpisode: 'https://laufendentdecken-podcast.at/327/',
      rating: 4,
      statement: 'Vielseitiger Allrounder mit 6mm Sprengung und Vibram Megagrip-Sohle – ideal für mittelschwere Trails und Waldwege unter 200 Euro. Der Schuh überzeugt als anpassungsfähiger Begleiter auf unterschiedlichen Trail-Untergründen.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Excellent',
          sole: 'Vibram Megagrip',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 4: Saucony Triumph 23
  await prisma.review.create({
    data: {
      productName: 'Triumph 23',
      brand: 'Saucony',
      weight: 280,
      price: 170,
      podcastEpisode: 'https://laufendentdecken-podcast.at/327/',
      rating: 4.5,
      statement: 'Ein hervorragender Daily Trainer für die Straße mit ausgezeichneter Dämpfung und auffälligem Zitronen-Gelb Design. Die überlegene Stoßdämpfung macht ihn ideal fürs Straßenlaufen.',
      shoe: {
        create: {
          drop: 8,
          grip: 'Good',
          sole: 'PWRRUN+',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 5: Saucony Endorphin Speed 5
  await prisma.review.create({
    data: {
      productName: 'Endorphin Speed 5',
      brand: 'Saucony',
      weight: 225,
      price: 180,
      podcastEpisode: 'https://laufendentdecken-podcast.at/327/',
      rating: 4.5,
      statement: 'Eine ausgefeilte Weiterentwicklung des Straßenracers für ambitionierte Hobbyläufer. Gelobt für seine Abrollmechanik, den antriebigen Charakter, die spritzige Reaktionsfähigkeit und den besonders guten Sitz. Ein wirklich feiner Schuh mit responsiven Übergängen und angenehmem Laufgefühl.',
      shoe: {
        create: {
          drop: 8,
          grip: 'Good',
          sole: 'PWRRUN PB',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 6: Scarpa Spin Ultra 2
  await prisma.review.create({
    data: {
      productName: 'Spin Ultra 2',
      brand: 'Scarpa',
      weight: 290,
      price: 190,
      podcastEpisode: 'https://laufendentdecken-podcast.at/325/',
      rating: 4.5,
      statement: 'Schmaler Vorfuß mit sicherem Fersenhalt und sockenartigem Einstieg. Top Grip in nassen und matschigen Bedingungen mit starker Bergabkontrolle. Geeignet für technisches Gelände, tägliches Training und als Racerschuh über mittlere bis lange Distanzen. Gefertigt mit ca. 30% recycelten Materialien im Obermaterial.',
      shoe: {
        create: {
          drop: 4,
          grip: 'Excellent',
          sole: 'Vibram Megagrip',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://at.scarpa.com/product/34237815/spin-ultra-2-trailrunningschuh-fur-lange-distanzen-eis-neonorange',
            altText: 'Scarpa Spin Ultra 2',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 7: CEP Omni Speed
  await prisma.review.create({
    data: {
      productName: 'Omni Speed',
      brand: 'CEP',
      weight: 290,
      price: 225,
      podcastEpisode: 'https://laufendentdecken-podcast.at/316/',
      rating: 3.5,
      statement: 'Ein gelungenes Modell mit innovativen Ansätzen für CEPs ersten Laufschuh. Mit Botech-Technologie und Glasfaser-verstärktem Mittelteil ausgestattet. Florian: "Sehr gute Performance, angenehmes Laufgefühl, mittlerweile Go-To-Straßenschuh. Klingt allerdings beim Laufen wie ein Pferd." Geordi bemerkte eine gewisse Belastung der Waden.',
      shoe: {
        create: {
          drop: 7,
          grip: 'Good',
          sole: 'Custom CEP',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 8: Dynafit Trail Graphic
  await prisma.review.create({
    data: {
      productName: 'Trail Graphic',
      brand: 'Dynafit',
      weight: 260,
      price: 170,
      podcastEpisode: 'https://laufendentdecken-podcast.at/314/',
      rating: 4,
      statement: 'Der Schuh hat uns optisch überzeugt. Die Passform ist trotz typisch schmaler Dynafit-Konstruktion überraschend komfortabel. Die Atmungsaktivität sticht hervor und funktioniert selbst bei Regenläufen gut. Für längere Distanzen bleiben jedoch Vorbehalte.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Excellent',
          sole: 'Vibram XS-Trek',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.dynafit.com/de-at/trail-graphic',
            altText: 'Dynafit Trail Graphic',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 9: Dynafit Alpine DNA 2
  await prisma.review.create({
    data: {
      productName: 'Alpine DNA 2',
      brand: 'Dynafit',
      weight: 260,
      price: 200,
      podcastEpisode: 'https://laufendentdecken-podcast.at/314/',
      rating: 4.5,
      statement: 'Für mittlere Distanzen konzipiert, besticht dieser Schuh durch Stabilität dank X-förmiger Stützplatte. Der Strickkragen verhindert Schmutzeinfall bei technischer Trailarbeit. Die PEBAX und Vibram-Kombination liefert überzeugende Komfort, Leichtigkeit und Grip.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Excellent',
          sole: 'Vibram Litebase',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.dynafit.com/de-de/alpine-dna-2',
            altText: 'Dynafit Alpine DNA 2',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 10: Dynafit Alpine Pro 2
  await prisma.review.create({
    data: {
      productName: 'Alpine Pro 2',
      brand: 'Dynafit',
      weight: 280,
      price: 180,
      podcastEpisode: 'https://laufendentdecken-podcast.at/314/',
      rating: 4,
      statement: 'Überzeugt mit Dämpfung und Komfort auf alpinem, steinigem Gelände durch Rock Shield Zehenschutz. Performt exzellent auf trockenem Terrain, aber geringe Stollentiefe könnte bei matschigen oder verschneiten Bedingungen Probleme bereiten. Empfohlen für 20-70km Distanzen auf steinigen Trails.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Very Good',
          sole: 'Vibram Megagrip',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.dynafit.com/de-at/alpine-pro-2',
            altText: 'Dynafit Alpine Pro 2',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 11: 361° Lynx
  await prisma.review.create({
    data: {
      productName: 'Lynx',
      brand: '361°',
      weight: 290,
      price: 160,
      podcastEpisode: 'https://laufendentdecken-podcast.at/291/',
      rating: 4,
      statement: 'Der Schuh will nichts spezielles, macht alles mit - im besten Sinne unauffällig. Vielseitiger Allrounder für Hügel, Waldwege und mittelgebirgiges Terrain. Stollentiefe und Profil kommen mit Matsch, Schnee und Schotter gut zurecht, auf Asphalt akzeptabel ohne sich wie ein Fußballschuh anzufühlen.',
      shoe: {
        create: {
          drop: 5,
          grip: 'Excellent',
          sole: 'Vibram',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 12: Hoka Speedgoat 6
  await prisma.review.create({
    data: {
      productName: 'Speedgoat 6',
      brand: 'Hoka',
      weight: 280,
      price: 170,
      podcastEpisode: 'https://laufendentdecken-podcast.at/285/',
      rating: 4.5,
      statement: 'Der legendäre Trail-Schuh mit bewährter Performance auf technischem Terrain. Ein Klassiker für anspruchsvolle Trailläufe.',
      shoe: {
        create: {
          drop: 4,
          grip: 'Excellent',
          sole: 'Vibram Megagrip',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.hoka.com/de/de/herren-gelaende/speedgoat-6/1147791.html',
            altText: 'Hoka Speedgoat 6',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 13: Hoka Mach 6
  await prisma.review.create({
    data: {
      productName: 'Mach 6',
      brand: 'Hoka',
      weight: 240,
      price: 150,
      podcastEpisode: 'https://laufendentdecken-podcast.at/281/',
      rating: 4,
      statement: 'Daily Trainer mit solider Performance für den täglichen Einsatz.',
      shoe: {
        create: {
          drop: 5,
          grip: 'Good',
          sole: 'Hoka Rubber',
        },
      },
      productLinks: {
        create: [],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 14: Salomon DRX Defy Grvl
  await prisma.review.create({
    data: {
      productName: 'DRX Defy Grvl',
      brand: 'Salomon',
      weight: 280,
      price: 160,
      podcastEpisode: 'https://laufendentdecken-podcast.at/273/',
      rating: 4,
      statement: 'Vielseitiger Gravel- und Trail-Schuh mit solider Performance für gemischte Untergründe.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Very Good',
          sole: 'Custom Salomon',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.salomon.com/de-at/shop-emea/product/drx-defy-grvl-li6257.html',
            altText: 'Salomon DRX Defy Grvl',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 15: Altra Mont Blanc Carbon
  await prisma.review.create({
    data: {
      productName: 'Mont Blanc Carbon',
      brand: 'Altra Running',
      weight: 270,
      price: 220,
      podcastEpisode: 'https://laufendentdecken-podcast.at/267/',
      rating: 4.5,
      statement: 'Carbon-bestückter Ultra-Trail-Schuh mit Zero Drop und breiter Zehenbox. Ideal für Ultra-Distanzen mit natürlichem Laufgefühl.',
      shoe: {
        create: {
          drop: 0,
          grip: 'Excellent',
          sole: 'Vibram Litebase',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.altrarunning.eu/de/mont-blanc-carbon',
            altText: 'Altra Mont Blanc Carbon',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 16: Scarpa Golden Gate 2 ATR
  await prisma.review.create({
    data: {
      productName: 'Golden Gate 2 ATR',
      brand: 'Scarpa',
      weight: 285,
      price: 170,
      podcastEpisode: 'https://laufendentdecken-podcast.at/260/',
      rating: 4,
      statement: 'All-Terrain Laufschuh für gemischte Untergründe mit vielseitigem Einsatzbereich.',
      shoe: {
        create: {
          drop: 5,
          grip: 'Very Good',
          sole: 'Scarpa ATR',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://de.scarpa.com/shop/search/Golden%20Gate%20ATR',
            altText: 'Scarpa Golden Gate 2 ATR',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 17: Mizuno Wave Mujin X
  await prisma.review.create({
    data: {
      productName: 'Wave Mujin X',
      brand: 'Mizuno',
      weight: 300,
      price: 180,
      podcastEpisode: 'https://laufendentdecken-podcast.at/308/',
      rating: 4,
      statement: 'Technischer Trail-Schuh mit Mizuno Wave-Technologie für anspruchsvolle Trailläufe.',
      shoe: {
        create: {
          drop: 8,
          grip: 'Excellent',
          sole: 'Michelin',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://emea.mizuno.com/eu/de-de/wave-mujin-10/J1GJ247051.html',
            altText: 'Mizuno Wave Mujin X',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  // Review 18: Salomon S/LAB Ultra Glide
  await prisma.review.create({
    data: {
      productName: 'S/LAB Ultra Glide',
      brand: 'Salomon',
      weight: 265,
      price: 190,
      podcastEpisode: 'https://laufendentdecken-podcast.at/303/',
      rating: 4.5,
      statement: 'Premium Ultra-Distanz Trail-Schuh mit exzellenter Dämpfung für lange Läufe. Ideal für mehrstündige Trailläufe.',
      shoe: {
        create: {
          drop: 6,
          grip: 'Excellent',
          sole: 'Contagrip',
        },
      },
      productLinks: {
        create: [
          {
            link: 'https://www.salomon.com/de-at/shop-emea/product/s-lab-ultra-glide-li6991.html',
            altText: 'Salomon S/LAB Ultra Glide',
          },
        ],
      },
      pictureLinks: {
        create: [],
      },
    },
  });

  console.log('Successfully seeded 18 running shoe reviews from podcast episodes!');
  console.log('Reviews are now available via API at http://localhost:3001/api/reviews');
}

main()
  .catch((e) => {
    console.error('Error seeding reviews:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
