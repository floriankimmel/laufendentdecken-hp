import type { Review, TrailEvent } from './types';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getReviews(): Promise<Review[]> {
  return fetchAPI<Review[]>('/reviews');
}

export async function getReview(id: string): Promise<Review> {
  return fetchAPI<Review>(`/reviews/${id}`);
}

export async function getTrailEvents(): Promise<TrailEvent[]> {
  return fetchAPI<TrailEvent[]>('/trail-events');
}

export async function getTrailEvent(id: string): Promise<TrailEvent> {
  return fetchAPI<TrailEvent>(`/trail-events/${id}`);
}
