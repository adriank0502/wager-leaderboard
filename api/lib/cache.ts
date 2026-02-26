// Production-ready cache using Upstash Redis
// This provides persistent caching across serverless function instances

import { Redis } from '@upstash/redis';

// Initialize Redis client
// Environment variables are automatically available in Vercel:
// - UPSTASH_REDIS_REST_URL
// - UPSTASH_REDIS_REST_TOKEN
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

interface CachedLeaderboard {
  data: any;
  timestamp: number;
  tournamentId: string;
}

class LeaderboardCache {
  private readonly CACHE_PREFIX = 'leaderboard:';
  private readonly DEFAULT_TTL = 300; // 5 minutes in seconds

  /**
   * Cache leaderboard data with TTL
   */
  async set(tournamentId: string, data: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    const key = `${this.CACHE_PREFIX}${tournamentId}`;
    const cached: CachedLeaderboard = {
      data,
      timestamp: Date.now(),
      tournamentId,
    };

    try {
      // Store with expiration
      await redis.setex(key, ttl, JSON.stringify(cached));
    } catch (error) {
      // Fallback: continue without caching if Redis fails
    }
  }

  /**
   * Get cached leaderboard data
   */
  async get(tournamentId: string): Promise<CachedLeaderboard | null> {
    const key = `${this.CACHE_PREFIX}${tournamentId}`;

    try {
      const cached = await redis.get<string>(key);
      
      if (!cached) {
        return null;
      }

      return JSON.parse(cached) as CachedLeaderboard;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if cache exists
   */
  async has(tournamentId: string): Promise<boolean> {
    const key = `${this.CACHE_PREFIX}${tournamentId}`;
    
    try {
      const exists = await redis.exists(key);
      return exists === 1;
    } catch (error) {
      return false;
    }
  }

  /**
   * Clear cache for a specific tournament or all tournaments
   */
  async clear(tournamentId?: string): Promise<void> {
    try {
      if (tournamentId) {
        const key = `${this.CACHE_PREFIX}${tournamentId}`;
        await redis.del(key);
      } else {
        // Clear all leaderboard caches
        const keys = await redis.keys(`${this.CACHE_PREFIX}*`);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      }
    } catch (error) {
      // Silently fail on clear error
    }
  }

  /**
   * Get cache TTL (time to live) in seconds
   */
  async getTTL(tournamentId: string): Promise<number> {
    const key = `${this.CACHE_PREFIX}${tournamentId}`;
    
    try {
      const ttl = await redis.ttl(key);
      return ttl;
    } catch (error) {
      return -1;
    }
  }

  /**
   * Extend cache expiration
   */
  async extend(tournamentId: string, additionalSeconds: number): Promise<void> {
    const key = `${this.CACHE_PREFIX}${tournamentId}`;
    
    try {
      await redis.expire(key, additionalSeconds);
    } catch (error) {
      // Silently fail on extend error
    }
  }
}

// Export singleton instance
export const leaderboardCache = new LeaderboardCache();
