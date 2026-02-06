import { LeaderboardEntry } from '@/types/leaderboard';
import { EmptyLeaderboard } from './EmptyLeaderboard';

interface NewLeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUser?: LeaderboardEntry | null;
}

export function NewLeaderboardTable({ entries, currentUser }: NewLeaderboardTableProps) {
  if (entries.length === 0) {
    return <EmptyLeaderboard />;
  }
  
  // Check if current user is in the displayed entries
  const isUserInList = (entry: LeaderboardEntry) => {
    // Check both the me field and uuid comparison
    return entry.me === true || (currentUser && entry.player.uuid === currentUser.player.uuid);
  };

  const formatValue = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toLocaleString();
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <section className="relative mx-auto mb-16 w-full max-w-5xl px-4">
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden bg-[#0f1322] shadow-2xl ring-1 ring-[#526197]/20">
          {/* Top highlight */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#526197]/60 to-transparent z-20" />
          
          {/* Desktop Header */}
          <div className="hidden sm:grid sticky top-0 z-30 grid-cols-[50px_2fr_1.2fr_1.2fr] gap-4 py-3.5 px-5 bg-[#161b2e]/95 backdrop-blur-sm border-b border-[#526197]/20">
            <div className="text-[10px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest">#</div>
            <div className="text-[10px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest">Player</div>
            <div className="text-[10px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest text-right">Prize</div>
            <div className="text-[10px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest text-right">Wagered</div>
          </div>
          
          {/* Mobile Header */}
          <div className="sm:hidden flex items-center justify-between py-3.5 px-4 bg-[#161b2e]/95 border-b border-[#526197]/20">
            <span className="text-[11px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest">Rankings</span>
            <span className="text-[11px] font-bold text-[#E8E5FF]/60 uppercase tracking-widest">Prize</span>
          </div>
          
          {/* Entries */}
          <div className="flex flex-col relative">
            {entries.map((entry) => (
              <div key={entry.player.uuid} className={`group relative leaderboard-row ${isUserInList(entry) ? 'bg-[#85C7FF]/5' : ''}`}>
                {/* Desktop Row */}
                <div className="hidden sm:grid relative grid-cols-[50px_2fr_1.2fr_1.2fr] items-center gap-4 py-3.5 px-5 transition-all duration-200">
                  <div className="absolute inset-0 bg-[#526197]/0 group-hover:bg-[#526197]/5 transition-colors duration-200" />
                  
                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#85C7FF] group-hover:h-6 transition-all duration-200 shadow-[0_0_8px_#85C7FF]" />
                  
                  {/* Rank */}
                  <div className="flex items-center relative z-10">
                    <span className="text-sm font-bold tabular-nums transition-colors duration-200 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                      {entry.rank}
                    </span>
                  </div>
                  
                  {/* Player */}
                  <div className="flex items-center gap-3 overflow-hidden relative z-10">
                    <div className="relative h-8 w-8 flex-shrink-0 rounded-full overflow-hidden select-none">
                      <div className="absolute inset-0 bg-[#526197]/20" />
                      <div className="absolute inset-0 rounded-full border transition-colors duration-300 border-[#526197]/50 group-hover:border-[#85C7FF]/50" />
                      <div className="relative h-full w-full flex items-center justify-center">
                        <span className="text-[10px] font-bold uppercase transition-colors text-white">
                          {getInitials(entry.player.username)}
                        </span>
                      </div>
                    </div>
                    <span className="truncate font-semibold text-sm transition-colors text-white">
                      {entry.player.username}
                      {isUserInList(entry) && (
                        <span className="ml-2 text-xs text-[#85C7FF] font-bold">(You)</span>
                      )}
                    </span>
                  </div>
                  
                  {/* Prize */}
                  <div className="flex justify-end relative z-10">
                    <span className="text-sm font-bold tabular-nums transition-colors text-[#85C7FF] group-hover:text-[#A6D8FF] drop-shadow-[0_0_3px_rgba(133,199,255,0.2)]">
                      ${entry.prize.amount}
                    </span>
                  </div>
                  
                  {/* Wagered */}
                  <div className="text-right relative z-10">
                    <span className="text-sm font-medium text-[#E8E5FF]/50 group-hover:text-[#E8E5FF]/70 transition-colors tabular-nums">
                      ${formatValue(entry.value)}
                    </span>
                  </div>
                </div>
                
                {/* Mobile Row */}
                <div className="sm:hidden relative flex items-center gap-3 py-3.5 px-4 transition-all duration-200">
                  <div className="absolute inset-0 bg-[#526197]/0 group-hover:bg-[#526197]/5 transition-colors duration-200" />
                  
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center relative z-10 bg-[#526197]/20">
                    <span className="text-sm font-bold tabular-nums text-white">{entry.rank}</span>
                  </div>
                  
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border relative z-10 border-[#526197]/40 bg-[#526197]/15">
                    <span className="text-[10px] font-bold uppercase text-white">
                      {getInitials(entry.player.username)}
                    </span>
                  </div>
                  
                  {/* Player info */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <span className="block truncate font-semibold text-sm text-white">
                      {entry.player.username}
                      {isUserInList(entry) && (
                        <span className="ml-1 text-xs text-[#85C7FF] font-bold">(You)</span>
                      )}
                    </span>
                    <span className="text-[11px] text-[#E8E5FF]/50 font-medium tabular-nums">
                      ${formatValue(entry.value)} wagered
                    </span>
                  </div>
                  
                  {/* Prize */}
                  <div className="flex-shrink-0 text-right relative z-10">
                    <span className="text-base font-bold tabular-nums text-[#85C7FF]">
                      ${formatValue(entry.prize.amount)}
                    </span>
                  </div>
                </div>
                
                {/* Bottom border */}
                <div className="absolute bottom-0 left-3 sm:left-5 right-3 sm:right-5 h-[1px] bg-[#526197]/10 group-hover:bg-[#526197]/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
