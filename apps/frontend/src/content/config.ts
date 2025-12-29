import { defineCollection, z } from 'astro:content';

const transcripts = defineCollection({});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    productName: z.string(),
    brand: z.string(),
    weight: z.number(),
    price: z.number(),
    rating: z.number().min(1).max(5),
    date: z.date(),
    podcastEpisode: z.string().url().nullable(),
    // Flattened shoe details (optional)
    drop: z.number().nullable(),
    grip: z.string().nullable(),
    sole: z.string().nullable(),
    // Arrays
    productLinks: z
      .array(
        z.object({
          url: z.string().url(),
          text: z.string()
        })
      )
      .default([]),
    pictureLinks: z
      .array(
        z.object({
          url: z.string().url(),
          alt: z.string()
        })
      )
      .default([])
  })
});

const races = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    name: z.string(),
    date: z.date(),
    location: z.string(),
    podcastEpisode: z.string().url().nullable(),
    distances: z
      .array(
        z.object({
          km: z.number(),
          gpxUrl: z.string().url()
        })
      )
      .default([])
  })
});

export const collections = {
  transcripts,
  reviews,
  races
};
