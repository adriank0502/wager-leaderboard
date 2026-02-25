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

const Index = () => {
  // Fetch active tournament
  const { activeTournament, isLoading: tournamentsLoading } = useTournaments({
    apiHost: import.meta.env.VITE_API_HOST || 'https://api.wager.com',
    useMockData: false, // Now using real API data
  });

  // Get tournamentId from activeTournament
  // Only use tournament ID from API, don't use default while loading
  // Convert to string if it's a number (API returns number, but we need string for URL)
  const tournamentId = activeTournament?.id 
    ? String(activeTournament.id) 
    : null; // Don't use default - wait for tournaments to load

  // Debug logging
  console.log('📋 Index: activeTournament:', activeTournament);
  console.log('📋 Index: tournamentId:', tournamentId);
  console.log('📋 Index: tournamentsLoading:', tournamentsLoading);

  // Fetch leaderboard for the active tournament
  // Only fetch if we have a valid tournament ID from the API
  const { topThree, restOfLeaderboard, currentUser, isLoading: leaderboardLoading, error } = useLeaderboard({
    tournamentId: tournamentId || undefined, // Use tournament ID from activeTournament, or undefined if not loaded yet
    useMockData: false, // Now using real API data
    apiHost: import.meta.env.VITE_API_HOST || 'https://api.wager.com',
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
