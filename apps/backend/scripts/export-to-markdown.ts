import { PrismaClient } from '../src/generated/prisma';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Slug generation: "S/LAB Pulsar 4" -> "s-lab-pulsar-4"
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Parse date string to Date object for proper YAML serialization
function parseDate(isoString: string): Date {
  return new Date(isoString);
}

async function exportReviews() {
  const db = new PrismaClient();
  const reviews = await db.review.findMany({
    include: {
      shoe: true,
      productLinks: true,
      pictureLinks: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const slugs = new Set<string>();
  const reviewsDir = path.join(__dirname, '../../frontend/src/content/reviews');

  // Ensure directory exists
  await fs.mkdir(reviewsDir, { recursive: true });

  for (const review of reviews) {
    const slug = generateSlug(review.productName);

    // Check for duplicate slugs
    if (slugs.has(slug)) {
      console.error(`DUPLICATE SLUG: ${slug} for ${review.productName}`);
      continue;
    }
    slugs.add(slug);

    const frontmatter = {
      title: `${review.productName} - ${review.brand}`,
      productName: review.productName,
      brand: review.brand,
      weight: review.weight,
      price: review.price,
      rating: review.rating,
      date: parseDate(review.createdAt),
      podcastEpisode: review.podcastEpisode || null,
      // Flatten shoe data (optional fields)
      drop: review.shoe?.drop || null,
      grip: review.shoe?.grip || null,
      sole: review.shoe?.sole || null,
      // Arrays
      productLinks: review.productLinks.map(pl => ({
        url: pl.link,
        text: pl.altText
      })),
      pictureLinks: review.pictureLinks.map(pl => ({
        url: pl.link,
        alt: pl.altText
      }))
    };

    const markdown = `---
${yaml.dump(frontmatter).trim()}
---

${review.statement}
`;

    const outputPath = path.join(reviewsDir, `${slug}.md`);
    await fs.writeFile(outputPath, markdown, 'utf-8');
    console.log(`✓ Exported review: ${slug}.md`);
  }

  console.log(`\n✓ Exported ${reviews.length} reviews`);
  await db.$disconnect();
}

async function exportTrailEvents() {
  const db = new PrismaClient();
  const events = await db.trailEvent.findMany({
    include: { distances: true },
    orderBy: { date: 'asc' }
  });

  const slugs = new Set<string>();
  const racesDir = path.join(__dirname, '../../frontend/src/content/races');

  // Ensure directory exists
  await fs.mkdir(racesDir, { recursive: true });

  for (const event of events) {
    const slug = generateSlug(event.name);

    // Check for duplicate slugs
    if (slugs.has(slug)) {
      console.error(`DUPLICATE SLUG: ${slug} for ${event.name}`);
      continue;
    }
    slugs.add(slug);

    const frontmatter = {
      title: event.name,
      name: event.name,
      date: parseDate(event.date), // Convert to Date for YAML
      location: event.location,
      podcastEpisode: event.podcastEpisode || null,
      distances: event.distances.map(d => ({
        km: d.distance,
        gpxUrl: d.gpxLink
      }))
    };

    const markdown = `---
${yaml.dump(frontmatter).trim()}
---

Trail event in ${event.location}.
`;

    const outputPath = path.join(racesDir, `${slug}.md`);
    await fs.writeFile(outputPath, markdown, 'utf-8');
    console.log(`✓ Exported race: ${slug}.md`);
  }

  console.log(`\n✓ Exported ${events.length} trail events`);
  await db.$disconnect();
}

async function main() {
  console.log('Starting export...\n');
  await exportReviews();
  await exportTrailEvents();
  console.log('\n✅ Export complete!');
}

main().catch(console.error);
