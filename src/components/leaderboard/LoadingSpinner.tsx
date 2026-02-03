import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">Loading leaderboard...</p>
    </div>
  );
}
