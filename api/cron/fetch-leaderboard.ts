import type { VercelRequest, VercelResponse } from '@vercel/node';
import { leaderboardCache } from '../lib/cache.js';

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
    await leaderboardCache.set(tournamentId, data, 300);

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

