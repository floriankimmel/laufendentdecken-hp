import { Hono } from 'hono';
import { vValidator } from '@hono/valibot-validator';
import { db } from '../lib/db.js';
import { CreateReviewSchema, UpdateReviewSchema } from '../schemas/review.js';

const app = new Hono();

// GET /api/reviews - List all reviews
app.get('/', async (c) => {
  const reviews = await db.review.findMany({
    include: {
      shoe: true,
      productLinks: true,
      pictureLinks: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return c.json(reviews);
});

// GET /api/reviews/:id - Get single review
app.get('/:id', async (c) => {
  const id = c.req.param('id');

  const review = await db.review.findUnique({
    where: { id },
    include: {
      shoe: true,
      productLinks: true,
      pictureLinks: true,
    },
  });

  if (!review) {
    return c.json({ error: 'Review not found' }, 404);
  }

  return c.json(review);
});

// POST /api/reviews - Create review
app.post('/', vValidator('json', CreateReviewSchema), async (c) => {
  const data = c.req.valid('json');

  const review = await db.review.create({
    data: {
      productName: data.productName,
      brand: data.brand,
      weight: data.weight,
      price: data.price,
      podcastEpisode: data.podcastEpisode,
      rating: data.rating,
      statement: data.statement,
      ...(data.shoe && {
        shoe: {
          create: data.shoe,
        },
      }),
      ...(data.productLinks && {
        productLinks: {
          create: data.productLinks,
        },
      }),
      ...(data.pictureLinks && {
        pictureLinks: {
          create: data.pictureLinks,
        },
      }),
    },
    include: {
      shoe: true,
      productLinks: true,
      pictureLinks: true,
    },
  });

  return c.json(review, 201);
});

// PATCH /api/reviews/:id - Update review
app.patch('/:id', vValidator('json', UpdateReviewSchema), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');

  const existing = await db.review.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: 'Review not found' }, 404);
  }

  const review = await db.review.update({
    where: { id },
    data: {
      ...(data.productName && { productName: data.productName }),
      ...(data.brand && { brand: data.brand }),
      ...(data.weight && { weight: data.weight }),
      ...(data.price && { price: data.price }),
      ...(data.podcastEpisode && { podcastEpisode: data.podcastEpisode }),
      ...(data.rating && { rating: data.rating }),
      ...(data.statement && { statement: data.statement }),
    },
    include: {
      shoe: true,
      productLinks: true,
      pictureLinks: true,
    },
  });

  return c.json(review);
});

// DELETE /api/reviews/:id - Delete review
app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const existing = await db.review.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: 'Review not found' }, 404);
  }

  await db.review.delete({ where: { id } });

  return c.json({ message: 'Review deleted' });
});

export default app;
