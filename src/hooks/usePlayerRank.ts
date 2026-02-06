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
  apiHost = 'https://wager-dev-api.sgldemo.xyz',
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
          console.log('🔄 Fetching player rank from:', url);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies for authentication
          });

          console.log('📡 Rank response status:', response.status);

          if (!response.ok) {
            if (response.status === 404) {
              // User not ranked yet - this is normal
              console.log('ℹ️ User not ranked yet (404)');
              setPlayerRank(null);
              return;
            }
            const errorText = await response.text();
            console.error('❌ Rank API Error:', errorText);
            throw new Error(`Failed to fetch player rank: ${response.status}`);
          }

          const responseText = await response.text();
          console.log('📄 Rank raw response:', responseText);
          
          let result: RankResponse;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            console.error('❌ Rank JSON Parse Error:', parseError);
            throw new Error('Invalid JSON response from rank API');
          }
          
          console.log('✅ Parsed rank data:', result);
          
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
          console.log('👤 Player rank:', result.rank);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('❌ Rank fetch error:', errorMessage);
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
