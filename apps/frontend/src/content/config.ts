import { defineCollection, z } from 'astro:content';

const transcripts = defineCollection({});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    rating: z.number().min(1).max(5),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  transcripts,
  reviews
};
