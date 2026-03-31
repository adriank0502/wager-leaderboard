import { AnimatedBackground } from '@/components/leaderboard/AnimatedBackground';
import { NewNavbar } from '@/components/leaderboard/NewNavbar';
import { NewPrizeHero } from '@/components/leaderboard/NewPrizeHero';
import { NewCountdownTimer } from '@/components/leaderboard/NewCountdownTimer';
import { PeriodToggle } from '@/components/leaderboard/PeriodToggle';
import { NewPodiumSection } from '@/components/leaderboard/NewPodiumSection';
import { NewLeaderboardTable } from '@/components/leaderboard/NewLeaderboardTable';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useTournaments } from '@/hooks/useTournaments';
import { API_CONFIG } from '@/config/api';
import { BRANDING } from '@/config/branding';
import { getHardcodedPrize } from '@/utils/prizes';

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

  // Determine tournament ID:
  // 1. Use VITE_TOURNAMENT_ID env var if set (per-streamer Vercel deployment)
  // 2. Otherwise use the ID from the tournaments API response
  const tournamentId = envTournamentId
    ? String(envTournamentId)
    : activeTournament?.id
      ? String(activeTournament.id)
      : null;

  // Find the resolved tournament payload for countdown start/end dates.
  const resolvedTournament = envTournamentId
    ? tournaments.find((tournament) => {
        const envId = String(envTournamentId);
        return String(tournament.id) === envId || String(tournament.current_tournament?.id ?? '') === envId;
      }) || activeTournament
    : activeTournament;

  const countdownStartAt = resolvedTournament?.current_tournament?.start_at || resolvedTournament?.start_at;
  const countdownEndAt = resolvedTournament?.current_tournament?.end_at || resolvedTournament?.end_at;

  // Fetch leaderboard for the active tournament
  const csvUrl = BRANDING.streamerCode === 'butcher'
    ? '/btx_leaderboard_rankings_2026-03-31T12_44_51.874825705Z.csv'
    : null;

  const { topThree, restOfLeaderboard, currentUser, isLoading: leaderboardLoading, error } = useLeaderboard({
    tournamentId: tournamentId || undefined,
    useMockData: false,
    apiHost,
    includeMe: true,
    csvUrl,
  });

  const isLoading = tournamentsLoading || leaderboardLoading;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <NewNavbar />
      
      {/* Main Content */}
      <div className="relative z-10 pb-20">
        {/* Hero Section */}
        <NewPrizeHero 
          prizeAmount="$5,000" 
          period="Monthly"
          description={BRANDING.customText?.heroDescription || `Sign up using referral code ${BRANDING.customText?.referralCode || BRANDING.streamerName} and start wagering to compete for prizes`}
          streamerName={BRANDING.streamerName}
        />
        
        {/* Countdown Timer */}
        <div className="px-4 sm:px-6 mt-12">
          <NewCountdownTimer startAt={countdownStartAt} endAt={countdownEndAt} />
        </div>
        
        {/* Period Toggle */}
        <PeriodToggle />
        
        {/* Podium Section - Only show if we have top 3 */}
        {!isLoading && topThree.length > 0 && <NewPodiumSection topThree={topThree} />}
        
        {/* Leaderboard Table - Shows empty state if no data */}
        {!isLoading && (
          <>
            {restOfLeaderboard.length > 0 ? (
              <NewLeaderboardTable 
                entries={restOfLeaderboard
                  .filter((e) => getHardcodedPrize(e.rank) !== '0')
                  .filter((e) => e.rank <= 18)} 
                currentUser={currentUser} 
              />
            ) : topThree.length === 0 ? (
              <NewLeaderboardTable entries={[]} currentUser={currentUser} />
            ) : null}
          </>
        )}
        
        {/* Error Message */}
        {error && !isLoading && (
          <div className="mx-auto max-w-5xl px-4 mb-8">
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
              <p className="text-red-400 text-sm">
                ⚠️ {error}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
