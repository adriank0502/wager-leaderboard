import { AnimatedBackground } from '@/components/leaderboard/AnimatedBackground';
import { NewNavbar } from '@/components/leaderboard/NewNavbar';
import { NewPrizeHero } from '@/components/leaderboard/NewPrizeHero';
import { NewCountdownTimer } from '@/components/leaderboard/NewCountdownTimer';
import { PeriodToggle } from '@/components/leaderboard/PeriodToggle';
import { NewPodiumSection } from '@/components/leaderboard/NewPodiumSection';
import { NewLeaderboardTable } from '@/components/leaderboard/NewLeaderboardTable';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { useTournaments } from '@/hooks/useTournaments';

const Index = () => {
  // Fetch active tournament
  const { activeTournament, isLoading: tournamentsLoading } = useTournaments({
    apiHost: import.meta.env.VITE_API_HOST || 'https://wager-dev-api.sgldemo.xyz',
    useMockData: false, // Now using real API data
  });

  // Fetch leaderboard for the active tournament
  // Using tournament ID 121172 which has data
  const { topThree, restOfLeaderboard, currentUser, isLoading: leaderboardLoading, error } = useLeaderboard({
    tournamentId: '121172', // Using tournament 121172 which has data
    useMockData: false, // Now using real API data
    apiHost: import.meta.env.VITE_API_HOST || 'https://wager-dev-api.sgldemo.xyz',
    includeMe: true, // Include current user's position
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
          prizeAmount="$40,000" 
          period="Monthly"
          description="Sign up using referral code WAGER and start wagering to compete for prizes"
          streamerName="WAGER"
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
