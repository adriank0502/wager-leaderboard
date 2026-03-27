import { useEffect, useMemo, useState } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { EmptyLeaderboard } from './EmptyLeaderboard';
import { BRANDING } from '@/config/branding';
import { getHardcodedPrize } from '@/utils/prizes';

interface NewLeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUser?: LeaderboardEntry | null;
}

export function NewLeaderboardTable({ entries, currentUser }: NewLeaderboardTableProps) {
  if (entries.length === 0) {
    return <EmptyLeaderboard />;
  }

  const pageSize = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(entries.length / pageSize));

  useEffect(() => {
    setCurrentPage(1);
  }, [entries.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return entries.slice(start, start + pageSize);
  }, [entries, currentPage]);
  
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const bgColor = isButcherTheme ? '#1a0000' : '#0f1322';
  const borderColor = isButcherTheme ? 'rgba(220, 20, 60, 0.2)' : 'rgba(82, 97, 151, 0.2)';
  const headerBg = isButcherTheme ? 'rgba(26, 0, 0, 0.95)' : 'rgba(22, 27, 46, 0.95)';
  const hoverBg = isButcherTheme ? 'rgba(220, 20, 60, 0.1)' : 'rgba(82, 97, 151, 0.05)';
  
  // Check if current user is in the displayed entries
  const isUserInList = (entry: LeaderboardEntry) => {
    // Check both the me field and uuid comparison
    return entry.me === true || (currentUser && entry.player.uuid === currentUser.player.uuid);
  };

  const formatValue = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    if (Number.isNaN(num)) {
      return value;
    }
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const maskUsername = (username: string, short = false) => {
    if (!username) return '***';
    if (username.length <= 4) return username;
    if (short) {
      return `${username.slice(0, 2)}***${username.slice(-2)}`;
    }
    return `${username.slice(0, 2)}*****${username.slice(-3)}`;
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <section className="relative mx-auto mb-16 w-full max-w-5xl px-4">
      <div className="relative">
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl ring-1"
          style={{
            background: bgColor,
            boxShadow: isButcherTheme 
              ? '0 20px 60px rgba(139, 0, 0, 0.4), 0 0 0 1px rgba(220, 20, 60, 0.2), inset 0 0 40px rgba(220, 20, 60, 0.05)'
              : '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(82, 97, 151, 0.2)',
            border: isButcherTheme ? '1px solid rgba(220, 20, 60, 0.3)' : undefined,
          }}
        >
          {/* Top highlight - blood dripping effect for butcher */}
          <div 
            className="absolute top-0 left-[10%] right-[10%] h-[2px] z-20"
            style={{
              background: isButcherTheme
                ? `linear-gradient(to right, transparent, ${primaryColor}80, ${primaryColor}40, ${primaryColor}80, transparent)`
                : 'linear-gradient(to right, transparent, rgba(82, 97, 151, 0.6), transparent)',
              boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}40` : undefined,
            }}
          />
          
          {/* Desktop Header */}
          <div 
            className="hidden sm:grid sticky top-0 z-30 grid-cols-[50px_2fr_1.2fr_1.2fr] gap-4 py-3.5 px-5 backdrop-blur-sm border-b"
            style={{
              background: headerBg,
              borderColor: borderColor,
            }}
          >
            <div 
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              #
            </div>
            <div 
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              Player
            </div>
            <div 
              className="text-[10px] font-black uppercase tracking-widest text-right"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              Prize
            </div>
            <div 
              className="text-[10px] font-black uppercase tracking-widest text-right"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              Wagered
            </div>
          </div>
          
          {/* Mobile Header */}
          <div 
            className="sm:hidden flex items-center justify-between py-2.5 px-3 border-b"
            style={{
              background: headerBg,
              borderColor: borderColor,
            }}
          >
            <span 
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              Rankings
            </span>
            <span 
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: isButcherTheme ? 'rgba(220, 20, 60, 0.9)' : 'rgba(232, 229, 255, 0.6)' }}
            >
              Prize
            </span>
          </div>
          
          {/* Entries */}
          <div className="flex flex-col relative">
            {paginatedEntries.map((entry) => (
              <div 
                key={entry.player.uuid} 
                className={`group relative leaderboard-row ${isButcherTheme ? 'butcher-theme' : ''} ${isUserInList(entry) ? isButcherTheme ? 'bg-[rgba(220,20,60,0.1)]' : 'bg-[#85C7FF]/5' : ''}`}
              >
                {/* Desktop Row */}
                <div className="hidden sm:grid relative grid-cols-[50px_2fr_1.2fr_1.2fr] items-center gap-4 py-3.5 px-5 transition-all duration-200 group">
                  <div 
                    className="absolute inset-0 transition-all duration-200 row-bg"
                    style={{
                      background: 'transparent',
                    }}
                  />
                  
                  {/* Hover indicator - blood red glow for butcher */}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 transition-all duration-200 group-hover:h-8"
                    style={{
                      background: primaryColor,
                      boxShadow: isButcherTheme 
                        ? `0 0 15px ${primaryColor}, 0 0 30px ${primaryColor}40`
                        : `0 0 8px ${primaryColor}`,
                    }}
                  />
                  
                  {/* Rank */}
                  <div className="flex items-center relative z-10">
                    <span className="text-sm font-bold tabular-nums transition-colors duration-200 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.15)]">
                      {entry.rank}
                    </span>
                  </div>
                  
                  {/* Player */}
                  <div className="flex items-center overflow-hidden relative z-10">
                    <span className="truncate font-semibold text-sm transition-colors text-white">
                      {maskUsername(entry.player.username)}
                      {isUserInList(entry) && (
                        <span 
                          className="ml-2 text-xs font-black"
                          style={{
                            color: primaryColor,
                            textShadow: isButcherTheme ? `0 0 8px ${primaryColor}` : undefined,
                          }}
                        >
                          (You)
                        </span>
                      )}
                    </span>
                  </div>
                  
                  {/* Prize */}
                  <div className="flex justify-end relative z-10">
                    <span 
                      className="text-sm font-black tabular-nums transition-all duration-200"
                      style={{
                        color: primaryColor,
                        textShadow: isButcherTheme 
                          ? `0 0 10px ${primaryColor}60, 0 0 20px ${primaryColor}40`
                          : `0 0 3px rgba(133,199,255,0.2)`,
                      }}
                      onMouseEnter={(e) => {
                        if (isButcherTheme) {
                          e.currentTarget.style.textShadow = `0 0 15px ${primaryColor}, 0 0 30px ${primaryColor}80`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isButcherTheme) {
                          e.currentTarget.style.textShadow = `0 0 10px ${primaryColor}60, 0 0 20px ${primaryColor}40`;
                        }
                      }}
                    >
                      ${getHardcodedPrize(entry.rank)}
                    </span>
                  </div>
                  
                  {/* Wagered */}
                  <div className="text-right relative z-10">
                    <span 
                      className="text-sm font-semibold transition-colors tabular-nums"
                      style={{
                        color: isButcherTheme ? 'rgba(255, 255, 255, 0.7)' : 'rgba(232, 229, 255, 0.5)',
                      }}
                    >
                      ${formatValue(entry.value)}
                    </span>
                  </div>
                </div>
                
                {/* Mobile Row */}
                <div className="sm:hidden relative flex items-center gap-2 py-2.5 px-3 transition-all duration-200 group">
                  <div 
                    className="absolute inset-0 transition-colors duration-200"
                    style={{
                      background: 'transparent',
                    }}
                  />
                  
                  {/* Rank */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center relative z-10 bg-[#526197]/20">
                    <span className="text-xs font-bold tabular-nums text-white">{entry.rank}</span>
                  </div>
                  
                  {/* Player info */}
                  <div className="flex-1 min-w-0 relative z-10">
                    <span className="block truncate font-semibold text-xs text-white">
                      {maskUsername(entry.player.username, true)}
                      {isUserInList(entry) && (
                        <span 
                          className="ml-1 text-[10px] font-bold"
                          style={{
                            color: primaryColor,
                            textShadow: isButcherTheme ? `0 0 8px ${primaryColor}60` : undefined,
                          }}
                        >
                          (You)
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-[#E8E5FF]/50 font-medium tabular-nums">
                      ${formatValue(entry.value)}
                    </span>
                  </div>
                  
                  {/* Prize */}
                  <div className="flex-shrink-0 text-right relative z-10">
                    <span 
                      className="text-sm font-bold tabular-nums"
                      style={{
                        color: primaryColor,
                        textShadow: isButcherTheme ? `0 0 8px ${primaryColor}60` : undefined,
                      }}
                    >
                      ${getHardcodedPrize(entry.rank)}
                    </span>
                  </div>
                </div>
                
                {/* Bottom border - blood effect for butcher */}
                <div 
                  className="absolute bottom-0 left-2 sm:left-5 right-2 sm:right-5 h-[1px] transition-colors"
                  style={{
                    background: isButcherTheme 
                      ? 'linear-gradient(to right, transparent, rgba(220, 20, 60, 0.2), transparent)'
                      : 'rgba(82, 97, 151, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    if (isButcherTheme) {
                      e.currentTarget.style.background = 'linear-gradient(to right, transparent, rgba(220, 20, 60, 0.4), transparent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isButcherTheme) {
                      e.currentTarget.style.background = 'linear-gradient(to right, transparent, rgba(220, 20, 60, 0.2), transparent)';
                    }
                  }}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-between gap-2 px-3 py-3 sm:px-5 sm:py-4 border-t"
              style={{ borderColor }}
            >
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{
                  color: primaryColor,
                  border: `1px solid ${borderColor}`,
                  background: isButcherTheme ? 'rgba(220, 20, 60, 0.08)' : 'rgba(82, 97, 151, 0.08)',
                }}
              >
                Prev
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    return Math.abs(page - currentPage) <= 1;
                  })
                  .map((page, idx, arr) => {
                    const previous = arr[idx - 1];
                    const showGap = previous && page - previous > 1;

                    return (
                      <div key={page} className="flex items-center gap-1.5 sm:gap-2">
                        {showGap && (
                          <span className="text-xs text-white/40">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className="min-w-7 rounded-md px-2 py-1 text-xs sm:text-sm font-semibold transition-colors"
                          style={{
                            color: page === currentPage ? '#ffffff' : primaryColor,
                            background: page === currentPage
                              ? (isButcherTheme ? 'rgba(220, 20, 60, 0.45)' : 'rgba(82, 97, 151, 0.45)')
                              : 'transparent',
                            border: `1px solid ${page === currentPage ? primaryColor : borderColor}`,
                          }}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                style={{
                  color: primaryColor,
                  border: `1px solid ${borderColor}`,
                  background: isButcherTheme ? 'rgba(220, 20, 60, 0.08)' : 'rgba(82, 97, 151, 0.08)',
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
