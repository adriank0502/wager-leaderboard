import { LeaderboardEntry } from '@/types/leaderboard';
import { PlayerListItem } from './PlayerListItem';

interface CompetitionListProps {
  entries: LeaderboardEntry[];
}

export function CompetitionList({ entries }: CompetitionListProps) {
  if (entries.length === 0) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="w-8 text-center">#</span>
          <span>Player</span>
        </div>
        <span>Wagered</span>
      </div>

      {/* Player List */}
      <div className="space-y-2">
        {entries.map((entry) => (
          <PlayerListItem 
            key={entry.player.uuid} 
            entry={entry} 
            isCurrentUser={entry.rank === 12}
          />
        ))}
      </div>
    </div>
  );
}
