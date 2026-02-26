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

const Index = () => {
  const apiHost = import.meta.env.VITE_API_HOST || 'https://api.wager.com';

  // If VITE_TOURNAMENT_ID is set in Vercel env vars, skip the tournaments API call
  const envTournamentId = API_CONFIG.TOURNAMENT_ID;

  // Only fetch tournaments if no tournament ID is set in env vars
  const { activeTournament, isLoading: tournamentsLoading } = useTournaments({
    apiHost,
    useMockData: !!envTournamentId, // Skip real API call if envTournamentId is set
  });

  // Determine tournament ID:
  // 1. Use VITE_TOURNAMENT_ID env var if set (per-streamer Vercel deployment)
  // 2. Otherwise use the ID from the tournaments API response
  const tournamentId = envTournamentId
    ? String(envTournamentId)
    : activeTournament?.id
      ? String(activeTournament.id)
      : null;

  // Fetch leaderboard for the active tournament
  const { topThree, restOfLeaderboard, currentUser, isLoading: leaderboardLoading, error } = useLeaderboard({
    tournamentId: tournamentId || undefined,
    useMockData: false,
    apiHost,
    includeMe: true,
  });

  const isLoading = (!envTournamentId && tournamentsLoading) || leaderboardLoading;

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
          <NewCountdownTimer />
        </div>
        
        {/* Period Toggle */}
        <PeriodToggle />
        
        {/* Podium Section - Only show if we have top 3 */}
        {!isLoading && topThree.length > 0 && <NewPodiumSection topThree={topThree} />}
        
        {/* Leaderboard Table - Shows empty state if no data */}
        {!isLoading && (
          <>
            {restOfLeaderboard.length > 0 ? (
              <NewLeaderboardTable entries={restOfLeaderboard} currentUser={currentUser} />
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
