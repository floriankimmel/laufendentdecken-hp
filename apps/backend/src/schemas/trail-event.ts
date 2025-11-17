import * as v from 'valibot';

export const TrailEventDistanceSchema = v.object({
  distance: v.number(),
  gpxLink: v.pipe(v.string(), v.url()),
});

export const CreateTrailEventSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  date: v.string(), // ISO date string
  location: v.pipe(v.string(), v.minLength(1)),
  podcastEpisode: v.pipe(v.string(), v.url()),
  distances: v.optional(v.array(TrailEventDistanceSchema)),
});

export const UpdateTrailEventSchema = v.partial(CreateTrailEventSchema);

export type CreateTrailEventInput = v.InferOutput<typeof CreateTrailEventSchema>;
export type UpdateTrailEventInput = v.InferOutput<typeof UpdateTrailEventSchema>;
