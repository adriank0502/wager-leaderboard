import { LeaderboardEntry } from '@/types/leaderboard';
import { cn } from '@/lib/utils';
import wagerCrown from '@/assets/wager-crown.png';
import { Medal, Award } from 'lucide-react';

interface PodiumSectionProps {
  topThree: LeaderboardEntry[];
}

export function PodiumSection({ topThree }: PodiumSectionProps) {
  const first = topThree.find((e) => e.rank === 1);
  const second = topThree.find((e) => e.rank === 2);
  const third = topThree.find((e) => e.rank === 3);

  if (!first || !second || !third) return null;

  return (
    <div className="relative px-2 sm:px-4 py-6 sm:py-12">
      {/* Light rays behind first place - moved down */}
      <div className="absolute top-24 sm:top-32 left-1/2 -translate-x-1/2 w-[250px] sm:w-[400px] h-[200px] sm:h-[300px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-transparent to-transparent" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-0.5 sm:w-1 h-20 sm:h-32 bg-gradient-to-t from-transparent via-primary/8 to-transparent origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${i * 22.5 - 78.75}deg)`,
            }}
          />
        ))}
      </div>

      {/* Podium Container */}
      <div className="relative flex items-end justify-center gap-1.5 sm:gap-3 md:gap-6">
        <PodiumBlock entry={second} position="second" />
        <PodiumBlock entry={first} position="first" />
        <PodiumBlock entry={third} position="third" />
      </div>
    </div>
  );
}

interface PodiumBlockProps {
  entry: LeaderboardEntry;
  position: 'first' | 'second' | 'third';
}

function PodiumBlock({ entry, position }: PodiumBlockProps) {
  const config = {
    first: {
      blockHeight: 'h-28 sm:h-32 md:h-40',
      blockWidth: 'w-28 sm:w-36 md:w-48',
      order: 'order-2',
      rankText: '1st',
      rankSize: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
      accentColor: 'border-primary/60',
      glowColor: 'shadow-[0_0_30px_hsl(var(--primary)/0.4)]',
      isFirst: true,
    },
    second: {
      blockHeight: 'h-24 sm:h-28 md:h-32',
      blockWidth: 'w-24 sm:w-32 md:w-44',
      order: 'order-1',
      rankText: '2nd',
      rankSize: 'text-3xl sm:text-4xl md:text-5xl',
      accentColor: 'border-muted-foreground/40',
      glowColor: '',
      isFirst: false,
    },
    third: {
      blockHeight: 'h-20 sm:h-24 md:h-28',
      blockWidth: 'w-24 sm:w-28 md:w-40',
      order: 'order-3',
      rankText: '3rd',
      rankSize: 'text-xl sm:text-3xl md:text-4xl',
      accentColor: 'border-muted-foreground/40',
      glowColor: '',
      isFirst: false,
    },
  };

  const c = config[position];

  const formatValue = (value: string) => {
    const num = parseFloat(value.replace(/,/g, ''));
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <div className={cn('flex flex-col items-center relative', c.order)}>
      {/* Large bloom behind 1st place - positioned to hide behind card */}
      {c.isFirst && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-64 bg-primary/10 blur-3xl rounded-full pointer-events-none -z-10" />
      )}
      
      {/* Crown/Medal Icon */}
      <div className="mb-2 sm:mb-3 flex items-center justify-center">
        {c.isFirst ? (
          <div className={cn(
            'relative p-2 sm:p-3 rounded-full',
            'bg-gradient-to-br from-primary/20 to-transparent',
            'border-2 border-primary/40',
          )}>
            <img 
              src={wagerCrown} 
              alt="1st Place" 
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
            />
          </div>
        ) : position === 'second' ? (
          <Medal className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground" />
        ) : (
          <Award className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-primary/80" />
        )}
      </div>

      {/* 3D Podium Block */}
      <div className={cn('relative', c.blockWidth)}>
        {/* Pulsing neon border for 1st place */}
        {c.isFirst && (
          <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60 animate-pulse-glow pointer-events-none" />
        )}
        {/* Top face - Username */}
        <div className={cn(
          "relative z-10 py-1.5 sm:py-2.5 md:py-3 rounded-t-lg border-t border-l border-r flex flex-col items-center justify-center",
          c.isFirst 
            ? "bg-gradient-to-b from-[hsl(222_35%_20%)] to-[hsl(222_30%_18%)] border-primary/40"
            : "bg-gradient-to-b from-[hsl(222_30%_24%)] to-[hsl(222_30%_20%)] border-muted-foreground/20"
        )}>
          <span className={cn(
            "font-semibold text-foreground truncate px-1 sm:px-2 max-w-full",
            c.isFirst ? "text-[11px] sm:text-xs md:text-sm" : "text-[10px] sm:text-xs md:text-sm"
          )}>
            {entry.player.username}
          </span>
        </div>
        
        {/* Score row */}
        <div className={cn(
          "relative z-10 py-1.5 sm:py-2 md:py-3 border-l border-r flex items-center justify-center",
          c.isFirst
            ? "bg-gradient-to-b from-[hsl(222_30%_18%)] to-[hsl(222_30%_15%)] border-primary/30"
            : "bg-gradient-to-b from-[hsl(222_30%_20%)] to-[hsl(222_30%_17%)] border-muted-foreground/15"
        )}>
          <span className={cn(
            'text-xs sm:text-sm md:text-lg font-bold',
            c.isFirst ? 'text-primary' : 'text-foreground'
          )}>
            ${formatValue(entry.value)}
          </span>
        </div>

        {/* Front face with rank watermark */}
        <div className={cn(
          'relative overflow-hidden rounded-b-lg border-l border-r border-b',
          c.isFirst
            ? 'bg-gradient-to-b from-[hsl(222_30%_14%)] to-[hsl(222_30%_8%)] border-primary/30'
            : 'bg-gradient-to-b from-[hsl(222_30%_14%)] to-[hsl(222_30%_8%)] border-muted-foreground/10',
          c.blockHeight
        )}>
          {/* Large watermark rank text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className={cn(
              'font-black tracking-tighter select-none',
              c.rankSize,
              c.isFirst 
                ? 'text-primary/20' 
                : 'text-muted-foreground/15'
            )}>
              {c.rankText}
            </span>
          </div>

          {/* Prize amount */}
          <div className="absolute bottom-1.5 sm:bottom-3 md:bottom-4 left-0 right-0 flex items-center justify-center gap-0.5 sm:gap-1">
            <span className="text-[9px] sm:text-xs md:text-sm font-medium text-muted-foreground">
              ${entry.prize?.amount || '0'}
            </span>
            <span className="text-[10px] sm:text-sm md:text-base">🏆</span>
          </div>

          {/* 3D edge effects */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-black/20 to-transparent" />
        </div>

        {/* Ground shadow */}
        <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/30 blur-md rounded-full" />
      </div>
    </div>
  );
}
