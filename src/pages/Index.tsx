import { NewNavbar } from '@/components/leaderboard/NewNavbar';
import { MikeLeaderboard } from '@/components/leaderboard/MikeLeaderboard';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useTournaments } from '@/hooks/useTournaments';
import { API_CONFIG } from '@/config/api';
import { BRANDING } from '@/config/branding';
import { useEffect } from 'react';

const Index = () => {
  const apiHost = import.meta.env.VITE_API_HOST || 'https://api.wager.com';

  // If VITE_TOURNAMENT_ID is set in Vercel env vars, skip the tournaments API call
  const envTournamentId = API_CONFIG.TOURNAMENT_ID;

  const preferredCode = BRANDING.customText?.referralCode || BRANDING.streamerCode;

  const { tournaments, activeTournament, isLoading: tournamentsLoading } = useTournaments({
    apiHost,
    useMockData: false,
    preferredCode,
    preferredTournamentId: envTournamentId ? String(envTournamentId) : null,
  });

  // Force tournament ID to 121148 per request
  const tournamentId = '121148';

  // Find the resolved tournament payload for countdown start/end dates.
  const resolvedTournament = envTournamentId
    ? tournaments.find((tournament) => {
        const envId = String(envTournamentId);
        return String(tournament.id) === envId || String(tournament.current_tournament?.id ?? '') === envId;
      }) || activeTournament
    : activeTournament;

  // Explicit countdown window per request (fallbacks to API if needed)
  const explicitStartAt = '2026-03-01T00:00:00.000Z';
  const explicitEndAt = '2026-04-19T21:00:00.000Z';
  const countdownStartAt = explicitStartAt || resolvedTournament?.current_tournament?.start_at || resolvedTournament?.start_at;
  const countdownEndAt = explicitEndAt || resolvedTournament?.current_tournament?.end_at || resolvedTournament?.end_at;

  // Fetch leaderboard for the active tournament
  // Use live API only (no CSV override)
  const csvUrl = null;

  const { topThree, restOfLeaderboard, currentUser, isLoading: leaderboardLoading, error, refetchSilent } = useLeaderboard({
    tournamentId: tournamentId || undefined,
    useMockData: false,
    apiHost,
    includeMe: true,
    csvUrl,
  });

  const isLoading = tournamentsLoading || leaderboardLoading;

  // Auto-refresh leaderboard every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      refetchSilent();
    }, 5000);
    return () => clearInterval(id);
  }, [tournamentId]); // stable interval; only resets if tournament changes

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <NewNavbar />

      {/* New Mike leaderboard UI only */}
      <div className="relative z-10 pb-20 mt-8 sm:mt-12">
        {!isLoading && (
          <MikeLeaderboard
            topThree={topThree}
            entries={restOfLeaderboard}
            startAt={countdownStartAt}
            endAt={countdownEndAt}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
