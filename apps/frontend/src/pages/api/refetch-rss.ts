import type { APIRoute } from 'astro';
import { getAllEpisodes, getShowInfo } from '../../lib/rss';

export const GET: APIRoute = async () => {
  try {
    console.log('Refetching RSS feed...');

    // Force refetch by passing skipCache=true
    await Promise.all([getShowInfo(true), getAllEpisodes(true)]);

    console.log('RSS cache refreshed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'RSS cache refreshed successfully',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Failed to refetch RSS:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to refetch RSS feed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
