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
  csvUrl?: string | null;
}

const parseCsvLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // Handle escaped double-quote inside quoted field ("")
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip the next quote
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const toNumberString = (raw: string): string => {
  const num = parseFloat(raw.replace(/,/g, '').trim());
  if (Number.isNaN(num)) {
    return '0.00';
  }

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const parseCsvLeaderboardEntries = (csvText: string): LeaderboardEntry[] => {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const headerCols = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const colIndex = (name: string, fallback: number | null = null): number | null => {
    const idx = headerCols.indexOf(name.toLowerCase());
    return idx >= 0 ? idx : fallback;
  };

  const idxRank = colIndex('rank_position', 0);
  const idxPlayerId = colIndex('player_id', 1);
  const idxUsername = colIndex('username', 2);
  const idxValue = colIndex('total_wager_usd', 3);

  const entries: LeaderboardEntry[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Some exporters wrap the entire row in quotes and escape inner quotes.
    // Example: "1,""79,131"",neksann77,""170,689.9"",27"
    // Normalize such rows by removing the outer quotes and un-escaping inner quotes.
    let rawLine = lines[i];
    if (rawLine.startsWith('"') && rawLine.endsWith('"')) {
      const inner = rawLine.slice(1, -1);
      // Only treat as wrapped if after un-escape we see expected commas
      if (inner.includes('",') || inner.includes(',"')) {
        rawLine = inner.replace(/""/g, '"');
      }
    }

    const cols = parseCsvLine(rawLine);
    if (cols.length < 3) {
      continue;
    }

    const rankRaw = idxRank !== null ? cols[idxRank] : cols[0];
    const rank = parseInt(String(rankRaw).replace(/[^0-9]/g, ''), 10);
    if (Number.isNaN(rank)) {
      continue;
    }

    const playerIdRaw = idxPlayerId !== null ? cols[idxPlayerId] : cols[1];
    const playerId = parseInt(String(playerIdRaw).replace(/[^0-9]/g, ''), 10) || 0;

    const username = (idxUsername !== null ? cols[idxUsername] : cols[2]) || `Player ${rank}`;

    const valueRaw = idxValue !== null ? cols[idxValue] : cols[3];
    const value = toNumberString(valueRaw);

    entries.push({
      rank,
      player: {
        id: playerId,
        uuid: `csv-${playerId || rank}`,
        username,
        avatar_url: null,
      },
      prize: {
        type: 'cash',
        amount: '0.00',
        currency_code: 'USD',
      },
      value,
      currency: {
        name: 'US Dollar',
        code: 'USD',
        symbol: '$',
        decimals: 2,
        order: null,
        type: 1,
        type_name: 'Fiat Money',
        is_default: 1,
      },
      mechanic_type: 0,
      mechanic_type_name: 'Turnover',
      me: false,
    });
  }

  return entries.sort((a, b) => a.rank - b.rank);
};

export function useLeaderboard({ 
  tournamentId, 
  useMockData = true,
  apiHost = 'https://api.wager.com',
  includeMe = true,
  csvUrl = null,
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
    // Guard: Only bail if neither tournamentId nor csvUrl is provided
    if ((!tournamentId || tournamentId.trim() === '') && !csvUrl) {
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
        let finalData: LeaderboardEntry[] = [];
        let userEntry: LeaderboardEntry | null = null;

        // If we have a tournamentId, attempt to fetch API data first
        if (tournamentId && tournamentId.trim() !== '') {
          const includeParam = includeMe ? '&include_me=true' : '';
          const url = `${apiHost}/player/api/v1/tournaments/${tournamentId}/leaderboard?per_page=100${includeParam}`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch leaderboard data: ${response.status} ${response.statusText}`);
          }

          const responseText = await response.text();
          
          let result: LeaderboardResponse;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            throw new Error('Invalid JSON response from API');
          }
          
          if (!Array.isArray(result.data)) {
            throw new Error('API response data is not an array');
          }
          
          finalData = result.data || [];
          userEntry = result.data?.find(entry => entry.me === true) || null;
          setHasMore(result.has_more || false);
        }

        // Optional CSV override: use rank + wagered values from uploaded CSV.
        if (csvUrl) {
          try {
            const csvResponse = await fetch(csvUrl, {
              method: 'GET',
              headers: {
                'Accept': 'text/csv,text/plain,*/*',
              },
            });

            if (csvResponse.ok) {
              const csvText = await csvResponse.text();
              const csvEntries = parseCsvLeaderboardEntries(csvText);
              if (csvEntries.length > 0) {
                finalData = csvEntries;
                userEntry = null;
                setHasMore(false);
              }
            }
          } catch {
            // Fallback to API data if CSV cannot be loaded.
          }
        }

        setData(finalData);
        setCurrentUser(userEntry);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      // Fall back to mock data on error
      setData(mockDataWithMe);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentId, useMockData, apiHost, includeMe, csvUrl]);

  useEffect(() => {
    // Fetch if we have a valid tournament ID OR a csvUrl override
    if ((tournamentId && tournamentId.trim() !== '') || csvUrl) {
      fetchLeaderboard();
    } else {
      // Reset state if no valid tournament ID
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
