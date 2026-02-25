import { useState, useEffect } from 'react';

interface Tournament {
  id: number | string;
  name: string;
  code?: string;
  status?: number;
  description?: string;
  start_at?: string;
  end_at?: string;
  start_date?: string;
  end_date?: string;
  status_name?: string;
  progress_status?: string;
  is_joined?: boolean;
  mechanic_type?: number;
  prize_pool?: string;
  currency?: any;
  converted?: any;
  mechanic_type_name?: string;
  leaderboard?: any;
  current_tournament?: {
    id: number;
    name: string;
    code: string;
    status: number;
    status_name: string;
    start_at: string;
    end_at: string;
    is_settled: number;
  };
  previous_tournament?: any;
  cms_property?: any;
  type?: string;
}

interface TournamentsResponse {
  data: Tournament[];
}

interface UseTournamentsOptions {
  apiHost?: string;
  useMockData?: boolean;
}

export function useTournaments({ 
  apiHost = 'https://api.wager.com',
  useMockData = false 
}: UseTournamentsOptions = {}) {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [activeTournament, setActiveTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (useMockData) {
          // Mock tournament data
          const mockTournament: Tournament = {
            id: '121134',
            name: 'Monthly Streamer Tournament',
            prize_pool: '40000',
            end_date: '2026-02-28T23:59:59Z',
            status: 'ongoing',
            type: 'monthly',
          };
          setTournaments([mockTournament]);
          setActiveTournament(mockTournament);
        } else {
          const url = `${apiHost}/player/api/v1/tournaments?categories[]=streamer&status[]=ongoing`;
          console.log('🔄 Fetching tournaments from:', url);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          console.log('📡 Tournaments response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Tournaments API Error:', errorText);
            throw new Error(`Failed to fetch tournaments: ${response.status}`);
          }

          const responseText = await response.text();
          console.log('📄 Tournaments raw response:', responseText);
          
          let result: TournamentsResponse;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            console.error('❌ Tournaments JSON Parse Error:', parseError);
            throw new Error('Invalid JSON response from tournaments API');
          }
          
          console.log('✅ Parsed tournaments data:', result);
          console.log('📊 Number of tournaments:', result.data?.length || 0);
          
          setTournaments(result.data || []);
          
          // Set the first tournament as active
          if (result.data && result.data.length > 0) {
            const tournament = result.data[0];
            console.log('✅ Active tournament:', tournament);
            
            // Use current_tournament.id if available, otherwise use main tournament id
            const tournamentId = tournament.current_tournament?.id 
              ? tournament.current_tournament.id 
              : tournament.id;
            
            // Create tournament object with the correct ID
            const tournamentToUse = { ...tournament, id: tournamentId };
            
            setActiveTournament(tournamentToUse);
            console.log('✅ Using tournament ID:', tournamentId);
            console.log('✅ Main tournament ID:', tournament.id);
            console.log('✅ Current tournament ID:', tournament.current_tournament?.id);
          } else {
            console.warn('⚠️ No tournaments found in response');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback to mock data on error
        const mockTournament: Tournament = {
          id: '121134',
          name: 'Monthly Streamer Tournament',
          prize_pool: '40000',
          end_date: '2026-02-28T23:59:59Z',
          status: 'ongoing',
          type: 'monthly',
        };
        setTournaments([mockTournament]);
        setActiveTournament(mockTournament);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, [apiHost, useMockData]);

  return {
    tournaments,
    activeTournament,
    isLoading,
    error,
  };
}
