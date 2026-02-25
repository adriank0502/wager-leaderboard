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
  tournamentId?: string | null;
  useMockData?: boolean;
  apiHost?: string;
  includeMe?: boolean;
}

export function useLeaderboard({ 
  tournamentId, 
  useMockData = true,
  apiHost = 'https://api.wager.com',
  includeMe = true
}: UseLeaderboardOptions = {}) {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentUser, setCurrentUser] = useState<LeaderboardEntry | null>(null);

  // Add mock "me" field to mock data for testing
  const mockDataWithMe = mockData.map(entry => ({
    ...entry,
    me: false,
  }));

  const fetchLeaderboard = useCallback(async () => {
    // Guard: Don't fetch if no tournament ID
    if (!tournamentId || tournamentId.trim() === '') {
      console.warn('⚠️ Cannot fetch leaderboard: No tournament ID provided');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (useMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData(mockDataWithMe);
        setHasMore(false);
        setCurrentUser(null);
      } else {
        const includeParam = includeMe ? '&include_me=true' : '';
        const url = `${apiHost}/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100${includeParam}`;
        
        console.log('🔄 Fetching leaderboard from:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error:', errorText);
          throw new Error(`Failed to fetch leaderboard data: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        console.log('📄 Raw response text:', responseText);
        
        let result: LeaderboardResponse;
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('❌ JSON Parse Error:', parseError);
          console.error('❌ Response text:', responseText);
          throw new Error('Invalid JSON response from API');
        }
        
        console.log('✅ Parsed leaderboard data:', result);
        console.log('📊 Data array:', result.data);
        console.log('📊 Number of entries:', result.data?.length || 0);
        console.log('📊 Has more:', result.has_more);
        
        // Check if data is actually an array
        if (!Array.isArray(result.data)) {
          console.error('❌ Data is not an array!', typeof result.data, result.data);
          throw new Error('API response data is not an array');
        }
        
        setData(result.data || []);
        setHasMore(result.has_more || false);
        
        // Find current user in data (me: true)
        const userEntry = result.data?.find(entry => entry.me === true);
        setCurrentUser(userEntry || null);
        
        if (userEntry) {
          console.log('👤 Current user found at rank:', userEntry.rank);
        } else {
          console.log('ℹ️ No current user found in leaderboard (not ranked or not logged in)');
        }
        
        if (result.data.length === 0) {
          console.warn('⚠️ API returned empty data array. This might be normal if no players are ranked yet.');
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error('❌ Leaderboard fetch error:', errorMessage);
      setError(errorMessage);
      // Fall back to mock data on error
      setData(mockDataWithMe);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId, useMockData, apiHost, includeMe]);

  useEffect(() => {
    // Only fetch if we have a valid tournament ID (not null, not undefined, not empty)
    if (tournamentId && tournamentId.trim() !== '') {
      console.log('🔄 useLeaderboard: Fetching with tournament ID:', tournamentId);
      fetchLeaderboard();
    } else {
      // Reset state if no valid tournament ID
      console.log('⏸️ useLeaderboard: Waiting for tournament ID...');
      setIsLoading(false);
      setData([]);
      setCurrentUser(null);
      setHasMore(false);
    }
  }, [fetchLeaderboard, tournamentId]);

  const topThree = data.filter((entry) => entry.rank <= 3);
  const restOfLeaderboard = data.filter((entry) => entry.rank > 3);

  return {
    data,
    topThree,
    restOfLeaderboard,
    currentUser,
    isLoading,
    error,
    hasMore,
    refetch: fetchLeaderboard,
  };
}
