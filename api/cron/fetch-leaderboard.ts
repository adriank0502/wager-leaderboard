import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

interface CachedLeaderboard {
  data: any;
  timestamp: number;
  tournamentId: string;
}

// Cache helper functions
const CACHE_PREFIX = 'leaderboard:';
const DEFAULT_TTL = 300; // 5 minutes

async function setCache(tournamentId: string, data: any, ttl: number = DEFAULT_TTL): Promise<void> {
  const key = `${CACHE_PREFIX}${tournamentId}`;
  const cached: CachedLeaderboard = {
    data,
    timestamp: Date.now(),
    tournamentId,
  };

  try {
    await redis.setex(key, ttl, JSON.stringify(cached));
  } catch (error) {
    // Fallback: continue without caching if Redis fails
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const apiHost = process.env.VITE_API_HOST || 'https://api.wager.com';
    const tournamentId = process.env.VITE_TOURNAMENT_ID;

    if (!tournamentId) {
      return res.status(400).json({ error: 'No tournament ID configured' });
    }

    // Fetch leaderboard from API
    const url = `${apiHost}/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100&include_me=true`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch leaderboard: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the data with 5 minute TTL
    await setCache(tournamentId, data, 300);

    return res.status(200).json({
      success: true,
      message: `Cached ${data.data?.length || 0} entries`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Failed to fetch leaderboard',
      message: error.message,
    });
  }
}
