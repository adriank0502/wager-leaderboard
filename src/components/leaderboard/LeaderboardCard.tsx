import { useLeaderboard } from '@/hooks/useLeaderboard';
import { CountdownTimer } from './CountdownTimer';
import { PodiumSection } from './PodiumSection';
import { CompetitionList } from './CompetitionList';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function LeaderboardCard() {
  const { topThree, restOfLeaderboard, isLoading, error, refetch } = useLeaderboard({
    tournamentId: '121134',
    useMockData: true, // Using mock data for now
    apiHost: import.meta.env.VITE_API_HOST || 'https://api.wager.com',
  });

  return (
    <section className="container mx-auto px-2 sm:px-4 pb-8 sm:pb-16 relative z-10">
      {/* Countdown Timer */}
      <div className="mb-6 sm:mb-12">
        <CountdownTimer />
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-destructive mb-3 text-sm">{error}</p>
          <Button onClick={refetch} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </Button>
        </div>
      ) : (
        <div>
          <PodiumSection topThree={topThree} />
          
          <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-6 mt-4 sm:mt-8">
            <CompetitionList entries={restOfLeaderboard} />
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-4 sm:mt-8">
            <Button className="btn-primary rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold w-auto">
              View More
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
