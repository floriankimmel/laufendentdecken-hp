export interface ReviewShoe {
  id: string;
  reviewId: string;
  drop: number;
  grip: string;
  sole: string;
}

export interface ProductLink {
  id: string;
  reviewId: string;
  link: string;
  altText: string;
}

export interface ReviewPicture {
  id: string;
  reviewId: string;
  link: string;
  altText: string;
}

export interface Review {
  id: string;
  productName: string;
  brand: string;
  weight: number;
  price: number;
  podcastEpisode: string;
  rating: number;
  statement: string;
  createdAt: string;
  updatedAt: string;
  shoe: ReviewShoe | null;
  productLinks: ProductLink[];
  pictureLinks: ReviewPicture[];
}

export interface TrailEventDistance {
  id: string;
  trailEventId: string;
  distance: number;
  gpxLink: string;
}

export interface TrailEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  podcastEpisode: string;
  createdAt: string;
  updatedAt: string;
  distances: TrailEventDistance[];
}
