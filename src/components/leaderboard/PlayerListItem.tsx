import { LeaderboardEntry } from '@/types/leaderboard';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface PlayerListItemProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

export function PlayerListItem({ entry, isCurrentUser = false }: PlayerListItemProps) {
  // Mask username for privacy - shorter on mobile
  const maskUsername = (username: string, short = false) => {
    if (username.length <= 4) return username;
    if (short) {
      return `${username.slice(0, 2)}***${username.slice(-2)}`;
    }
    const start = username.slice(0, 2);
    const end = username.slice(-3);
    return `${start}*****${end}`;
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between py-3 sm:py-4 px-3 sm:px-5 rounded-xl transition-all",
        isCurrentUser ? "player-row-highlight" : "player-row"
      )}
    >
      {/* Left side: Rank + Avatar + Name */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Rank */}
        <div className="w-6 sm:w-8 text-center">
          <span className="text-xs sm:text-sm font-semibold text-muted-foreground">{entry.rank}</span>
        </div>

        {/* Avatar - desktop only */}
        <div className="hidden sm:flex w-8 h-8 rounded-full bg-secondary items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Username - shorter on mobile */}
        <span className="font-medium text-foreground text-xs sm:text-sm">
          <span className="sm:hidden">{maskUsername(entry.player.username, true)}</span>
          <span className="hidden sm:inline">{maskUsername(entry.player.username)}</span>
          {isCurrentUser && <span className="text-primary ml-1">(you)</span>}
        </span>
      </div>
      
      {/* Right side: Amount */}
      <div className="text-right">
        <span className="text-xs sm:text-sm font-semibold text-foreground">
          ${entry.value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
