import * as v from 'valibot';

export const ReviewShoeSchema = v.object({
  drop: v.number(),
  grip: v.string(),
  sole: v.string(),
});

export const LinkSchema = v.object({
  link: v.pipe(v.string(), v.url()),
  altText: v.string(),
});

export const CreateReviewSchema = v.object({
  productName: v.pipe(v.string(), v.minLength(1)),
  brand: v.pipe(v.string(), v.minLength(1)),
  weight: v.number(),
  price: v.number(),
  podcastEpisode: v.pipe(v.string(), v.url()),
  rating: v.pipe(v.number(), v.minValue(0), v.maxValue(5)),
  statement: v.string(),
  shoe: v.optional(ReviewShoeSchema),
  productLinks: v.optional(v.array(LinkSchema)),
  pictureLinks: v.optional(v.array(LinkSchema)),
});

export const UpdateReviewSchema = v.partial(CreateReviewSchema);

export type CreateReviewInput = v.InferOutput<typeof CreateReviewSchema>;
export type UpdateReviewInput = v.InferOutput<typeof UpdateReviewSchema>;
