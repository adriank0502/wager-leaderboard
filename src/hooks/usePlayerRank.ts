import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';

interface UsePlayerRankOptions {
  tournamentId: string;
  apiHost?: string;
  useMockData?: boolean;
}

interface RankResponse {
  rank: number;
  player: {
    id: number;
    uuid: string;
    username: string;
  };
  prize: {
    type: string;
    amount: string;
    currency_code: string;
  };
  value: string;
  currency: {
    code: string;
    symbol: string;
  };
  mechanic_type: number;
  mechanic_type_name: string;
}

export function usePlayerRank({ 
  tournamentId, 
  apiHost = 'https://api.wager.com',
  useMockData = false 
}: UsePlayerRankOptions) {
  const [playerRank, setPlayerRank] = useState<LeaderboardEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerRank = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (useMockData) {
          // Mock data - simulate no rank
          await new Promise((resolve) => setTimeout(resolve, 500));
          setPlayerRank(null);
        } else {
          const url = `${apiHost}/player/api/v1/tournaments/${tournamentId}/rank`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication
          });

          if (!response.ok) {
            if (response.status === 404) {
              // User not ranked yet - this is normal
              setPlayerRank(null);
              return;
            }
            const errorText = await response.text();
            throw new Error(`Failed to fetch player rank: ${response.status}`);
          }

          const responseText = await response.text();
          
          let result: RankResponse;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            throw new Error('Invalid JSON response from rank API');
          }
          
          // Convert to LeaderboardEntry format
          const rankEntry: LeaderboardEntry = {
            rank: result.rank,
            player: {
              id: result.player.id,
              uuid: result.player.uuid,
              username: result.player.username,
              avatar_url: null,
            },
            prize: {
              type: result.prize.type,
              amount: result.prize.amount,
              currency_code: result.prize.currency_code,
            },
            value: result.value,
            currency: result.currency,
            mechanic_type: result.mechanic_type,
            mechanic_type_name: result.mechanic_type_name,
            me: true, // This is the current user
          };
          
          setPlayerRank(rankEntry);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setPlayerRank(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (tournamentId) {
      fetchPlayerRank();
    }
  }, [tournamentId, apiHost, useMockData]);

  return {
    playerRank,
    isLoading,
    error,
  };
}
