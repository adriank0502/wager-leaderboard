import type { VercelRequest, VercelResponse } from '@vercel/node';
import { leaderboardCache } from './lib/cache.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const tournamentId = req.query.tournamentId as string || process.env.VITE_TOURNAMENT_ID;

    if (!tournamentId) {
      return res.status(400).json({ error: 'Tournament ID required' });
    }

    // Get cached data
    const cached = await leaderboardCache.get(tournamentId);

    if (!cached) {
      return res.status(404).json({
        error: 'No cached data available',
        message: 'Leaderboard data not yet cached. Cron job may not have run yet.',
      });
    }

    // Get remaining TTL from Redis
    const ttl = await leaderboardCache.getTTL(tournamentId);
    const cacheAge = Date.now() - cached.timestamp;
    const isStale = ttl < 60; // Consider stale if less than 1 minute remaining

    return res.status(200).json({
      ...cached.data,
      cached: true,
      stale: isStale,
      cacheAge: Math.floor(cacheAge / 1000), // seconds
      ttl: ttl, // seconds until expiration
      timestamp: new Date(cached.timestamp).toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
