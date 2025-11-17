import { Hono } from 'hono';
import { vValidator } from '@hono/valibot-validator';
import { db } from '../lib/db.js';
import { CreateTrailEventSchema, UpdateTrailEventSchema } from '../schemas/trail-event.js';

const app = new Hono();

// GET /api/trail-events - List all trail events
app.get('/', async (c) => {
  const trailEvents = await db.trailEvent.findMany({
    include: {
      distances: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
  return c.json(trailEvents);
});

// GET /api/trail-events/:id - Get single trail event
app.get('/:id', async (c) => {
  const id = c.req.param('id');

  const trailEvent = await db.trailEvent.findUnique({
    where: { id },
    include: {
      distances: true,
    },
  });

  if (!trailEvent) {
    return c.json({ error: 'Trail event not found' }, 404);
  }

  return c.json(trailEvent);
});

// POST /api/trail-events - Create trail event
app.post('/', vValidator('json', CreateTrailEventSchema), async (c) => {
  const data = c.req.valid('json');

  const trailEvent = await db.trailEvent.create({
    data: {
      name: data.name,
      date: data.date,
      location: data.location,
      podcastEpisode: data.podcastEpisode,
      ...(data.distances && {
        distances: {
          create: data.distances,
        },
      }),
    },
    include: {
      distances: true,
    },
  });

  return c.json(trailEvent, 201);
});

// PATCH /api/trail-events/:id - Update trail event
app.patch('/:id', vValidator('json', UpdateTrailEventSchema), async (c) => {
  const id = c.req.param('id');
  const data = c.req.valid('json');

  const existing = await db.trailEvent.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: 'Trail event not found' }, 404);
  }

  const trailEvent = await db.trailEvent.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.date && { date: data.date }),
      ...(data.location && { location: data.location }),
      ...(data.podcastEpisode && { podcastEpisode: data.podcastEpisode }),
    },
    include: {
      distances: true,
    },
  });

  return c.json(trailEvent);
});

// DELETE /api/trail-events/:id - Delete trail event
app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const existing = await db.trailEvent.findUnique({ where: { id } });
  if (!existing) {
    return c.json({ error: 'Trail event not found' }, 404);
  }

  await db.trailEvent.delete({ where: { id } });

  return c.json({ message: 'Trail event deleted' });
});

export default app;
