import { useState, useEffect, useCallback } from 'react';
import { LeaderboardEntry, LeaderboardResponse } from '@/types/leaderboard';

// Mock data for development
const mockData: LeaderboardEntry[] = [
  {
    rank: 1,
    player: {
      id: 1,
      uuid: '1',
      username: 'mo*********er20',
      avatar_url: '',
      vip: { id: 1, name: 'Diamond', level: 10 },
    },
    prize: { type: 'cash', amount: '15,000.00', currency_code: 'USD' },
    value: '1,584,371.59',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 2,
    player: {
      id: 2,
      uuid: '2',
      username: 'em*****king',
      avatar_url: '',
      vip: { id: 2, name: 'Platinum 6', level: 8 },
    },
    prize: { type: 'cash', amount: '8,000.00', currency_code: 'USD' },
    value: '272,910.93',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 3,
    player: {
      id: 3,
      uuid: '3',
      username: 'ch*****shit',
      avatar_url: '',
      vip: { id: 3, name: 'Platinum 3', level: 6 },
    },
    prize: { type: 'cash', amount: '6,000.00', currency_code: 'USD' },
    value: '178,098.88',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 4,
    player: {
      id: 4,
      uuid: '4',
      username: 'br********reen',
      avatar_url: '',
      vip: { id: 4, name: 'Platinum 6', level: 8 },
    },
    prize: { type: 'cash', amount: '3,100.00', currency_code: 'USD' },
    value: '122,642.73',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 5,
    player: {
      id: 5,
      uuid: '5',
      username: 'm***user',
      avatar_url: '',
      vip: { id: 5, name: 'Gold', level: 5 },
    },
    prize: { type: 'cash', amount: '1,820.00', currency_code: 'USD' },
    value: '73,608.62',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 6,
    player: {
      id: 6,
      uuid: '6',
      username: 'Ga*********lacy',
      avatar_url: '',
      vip: { id: 6, name: 'Gold', level: 4 },
    },
    prize: { type: 'cash', amount: '1,200.00', currency_code: 'USD' },
    value: '51,502.52',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 7,
    player: {
      id: 7,
      uuid: '7',
      username: 'z*xvly',
      avatar_url: '',
      vip: { id: 7, name: 'Silver', level: 3 },
    },
    prize: { type: 'cash', amount: '1,000.00', currency_code: 'USD' },
    value: '51,135.92',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 8,
    player: {
      id: 8,
      uuid: '8',
      username: 'wi***nings',
      avatar_url: '',
    },
    prize: { type: 'cash', amount: '850.00', currency_code: 'USD' },
    value: '48,227.15',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 9,
    player: {
      id: 9,
      uuid: '9',
      username: 'Lu***ight',
      avatar_url: '',
    },
    prize: { type: 'cash', amount: '700.00', currency_code: 'USD' },
    value: '43,912.66',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
  {
    rank: 10,
    player: {
      id: 10,
      uuid: '10',
      username: 'Ju*****jump',
      avatar_url: '',
    },
    prize: { type: 'cash', amount: '600.00', currency_code: 'USD' },
    value: '39,804.88',
    currency: { code: 'USD', symbol: '$' },
    mechanic_type: 1,
    mechanic_type_name: 'Wager',
  },
];

interface UseLeaderboardOptions {
  tournamentId?: string;
  useMockData?: boolean;
}

export function useLeaderboard({ tournamentId = '1', useMockData = true }: UseLeaderboardOptions = {}) {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData(mockData);
        setHasMore(false);
      } else {
        const response = await fetch(
          `https://wager.com/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const result: LeaderboardResponse = await response.json();
        setData(result.data);
        setHasMore(result.has_more);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fall back to mock data on error
      setData(mockData);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId, useMockData]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const topThree = data.filter((entry) => entry.rank <= 3);
  const restOfLeaderboard = data.filter((entry) => entry.rank > 3);

  return {
    data,
    topThree,
    restOfLeaderboard,
    isLoading,
    error,
    hasMore,
    refetch: fetchLeaderboard,
  };
}
