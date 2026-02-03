import { AnimatedBackground } from '@/components/leaderboard/AnimatedBackground';
import { NewNavbar } from '@/components/leaderboard/NewNavbar';
import { NewPrizeHero } from '@/components/leaderboard/NewPrizeHero';
import { NewCountdownTimer } from '@/components/leaderboard/NewCountdownTimer';
import { PeriodToggle } from '@/components/leaderboard/PeriodToggle';
import { NewPodiumSection } from '@/components/leaderboard/NewPodiumSection';
import { NewLeaderboardTable } from '@/components/leaderboard/NewLeaderboardTable';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const Index = () => {
  const { topThree, restOfLeaderboard, isLoading } = useLeaderboard({
    tournamentId: '121134',
    useMockData: true,
  });

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
        
        {/* Podium Section */}
        {!isLoading && <NewPodiumSection topThree={topThree} />}
        
        {/* Leaderboard Table */}
        {!isLoading && <NewLeaderboardTable entries={restOfLeaderboard} />}
      </div>
    </div>
  );
};

export default Index;
