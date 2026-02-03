import { LeaderboardEntry } from '@/types/leaderboard';

interface NewPodiumSectionProps {
  topThree: LeaderboardEntry[];
}

export function NewPodiumSection({ topThree }: NewPodiumSectionProps) {
  const first = topThree.find((e) => e.rank === 1);
  const second = topThree.find((e) => e.rank === 2);
  const third = topThree.find((e) => e.rank === 3);

  if (!first || !second || !third) return null;

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
    <div className="w-full my-14 px-4 min-h-[350px] md:min-h-[380px]">
      {/* Desktop Podium */}
      <div className="hidden md:flex items-end justify-center gap-3 sm:gap-4 max-w-4xl mx-auto h-[305px]">
        {/* Second Place */}
        <PodiumCard entry={second} position="second" getInitials={getInitials} formatValue={formatValue} />
        
        {/* First Place */}
        <PodiumCard entry={first} position="first" getInitials={getInitials} formatValue={formatValue} />
        
        {/* Third Place */}
        <PodiumCard entry={third} position="third" getInitials={getInitials} formatValue={formatValue} />
      </div>
      
      {/* Mobile Podium */}
      <div className="md:hidden flex items-end justify-center gap-2 max-w-lg mx-auto h-[210px]">
        <PodiumCardMobile entry={second} position="second" getInitials={getInitials} formatValue={formatValue} />
        <PodiumCardMobile entry={first} position="first" getInitials={getInitials} formatValue={formatValue} />
        <PodiumCardMobile entry={third} position="third" getInitials={getInitials} formatValue={formatValue} />
      </div>
    </div>
  );
}

interface PodiumCardProps {
  entry: LeaderboardEntry;
  position: 'first' | 'second' | 'third';
  getInitials: (username: string) => string;
  formatValue: (value: string) => string;
}

function PodiumCard({ entry, position, getInitials, formatValue }: PodiumCardProps) {
  const config = {
    first: { width: 'w-[245px]', height: 'h-[305px]', avatarSize: 'w-[76px] h-[76px]', prizeSize: 'text-[28px]', rank: '1' },
    second: { width: 'w-[210px]', height: 'h-[270px]', avatarSize: 'w-[64px] h-[64px]', prizeSize: 'text-[22px]', rank: '2' },
    third: { width: 'w-[210px]', height: 'h-[270px]', avatarSize: 'w-[64px] h-[64px]', prizeSize: 'text-[22px]', rank: '3' },
  };

  const c = config[position];
  const isFirst = position === 'first';

  return (
    <div className={`group relative ${c.width} ${c.height} ${position === 'second' || position === 'third' ? 'mt-8' : ''} ${isFirst ? 'z-10' : 'z-0'}`}>
      {/* Outer glow for first place */}
      {isFirst && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#85C7FF]/30 via-[#85C7FF]/5 to-transparent blur-sm" />
      )}
      
      {/* Border gradient */}
      <div className={`absolute inset-0 rounded-2xl p-[1px] ${
        isFirst 
          ? 'bg-gradient-to-b from-[#85C7FF]/40 via-[#85C7FF]/15 to-[#85C7FF]/5' 
          : 'bg-gradient-to-b from-[#526197]/50 via-[#526197]/20 to-transparent'
      }`}>
        <div className="w-full h-full rounded-[15px] bg-[#0f1322]" />
      </div>
      
      {/* Card content */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        <div className={`absolute inset-0 ${
          isFirst 
            ? 'bg-gradient-to-b from-[#151b32] via-[#111628] to-[#0e1220]' 
            : 'bg-gradient-to-b from-[#1a1d2e] via-[#141829] to-[#0e1220]'
        }`} />
        
        {/* Top highlight */}
        <div className={`absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent ${
          isFirst ? 'via-[#85C7FF]/50' : 'via-[#526197]/40'
        } to-transparent`} />
        
        <div className="relative h-full flex flex-col items-center px-5 pt-6 pb-5">
          {/* Rank badge */}
          <div className={`absolute top-4 right-4 w-7 h-7 rounded-md flex items-center justify-center ${
            isFirst 
              ? 'bg-[#85C7FF]/10 border border-[#85C7FF]/20' 
              : 'bg-[#526197]/15 border border-[#526197]/25'
          }`}>
            <span className={`text-[11px] font-black ${
              isFirst ? 'text-[#85C7FF]' : 'text-[#E8E5FF]/70'
            }`}>{c.rank}</span>
          </div>
          
          {/* Avatar */}
          <div className="relative">
            {isFirst && (
              <div className="absolute inset-0 rounded-full bg-[#85C7FF]/15 blur-xl scale-[1.8]" />
            )}
            <div className={`relative rounded-full p-[2px] ${
              isFirst 
                ? 'bg-gradient-to-b from-[#85C7FF] via-[#85C7FF]/60 to-[#85C7FF]/25' 
                : 'bg-gradient-to-b from-[#E8E5FF]/60 via-[#526197]/50 to-[#526197]/20'
            }`}>
              <div className={`${c.avatarSize} rounded-full flex items-center justify-center bg-[#0c0f18]`}>
                <span className={`${isFirst ? 'text-xl text-white' : 'text-lg text-[#E8E5FF]/90'} font-black uppercase`}>
                  {getInitials(entry.player.username)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Username */}
          <h3 className={`mt-4 text-sm font-black ${isFirst ? 'text-[15px] text-white' : 'text-[#E8E5FF]'} truncate max-w-[95%]`}>
            {entry.player.username}
          </h3>
          
          {/* Prize and wagered amount */}
          <div className="mt-auto w-full">
            <div className={`relative rounded-xl py-4 px-4 ${
              isFirst 
                ? 'bg-[#85C7FF]/[0.06] border border-[#85C7FF]/15' 
                : 'bg-[#526197]/10 border border-[#526197]/20'
            }`}>
              <div className="text-center">
                <span className={`${c.prizeSize} font-black tabular-nums tracking-tight leading-none ${
                  isFirst 
                    ? 'text-gradient-white-blue' 
                    : 'text-[#E8E5FF]'
                }`}>
                  ${entry.prize.amount}
                </span>
              </div>
            </div>
            <div className="mt-3.5 px-1 flex flex-col items-center text-center">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                isFirst ? 'text-white/40' : 'text-[#E8E5FF]/45'
              }`}>Wagered</span>
              <span className={`text-[13px] font-bold tabular-nums ${
                isFirst ? 'text-white/55' : 'text-[#E8E5FF]/55'
              }`}>${formatValue(entry.value)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumCardMobile({ entry, position, getInitials, formatValue }: PodiumCardProps) {
  const isFirst = position === 'first';
  const height = isFirst ? 'h-[210px]' : 'h-[185px] mt-5';

  return (
    <div className={`group relative flex-1 ${height} ${isFirst ? 'z-10' : 'z-0'}`}>
      {isFirst && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#85C7FF]/30 via-[#85C7FF]/5 to-transparent blur-sm" />
      )}
      
      <div className={`absolute inset-0 rounded-2xl p-[1px] ${
        isFirst 
          ? 'bg-gradient-to-b from-[#85C7FF]/40 via-[#85C7FF]/15 to-[#85C7FF]/5' 
          : 'bg-gradient-to-b from-[#526197]/50 via-[#526197]/20 to-transparent'
      }`}>
        <div className="w-full h-full rounded-[15px] bg-[#0f1322]" />
      </div>
      
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        <div className={`absolute inset-0 ${
          isFirst 
            ? 'bg-gradient-to-b from-[#151b32] via-[#111628] to-[#0e1220]' 
            : 'bg-gradient-to-b from-[#1a1d2e] via-[#141829] to-[#0e1220]'
        }`} />
        
        <div className={`absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent ${
          isFirst ? 'via-[#85C7FF]/50' : 'via-[#526197]/40'
        } to-transparent`} />
        
        <div className="relative h-full flex flex-col items-center px-2.5 pt-4 pb-3">
          <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-md flex items-center justify-center ${
            isFirst 
              ? 'bg-[#85C7FF]/10 border border-[#85C7FF]/20' 
              : 'bg-[#526197]/15 border border-[#526197]/25'
          }`}>
            <span className={`text-[10px] font-black ${
              isFirst ? 'text-[#85C7FF]' : 'text-[#E8E5FF]/70'
            }`}>{entry.rank}</span>
          </div>
          
          <div className="relative">
            <div className={`relative rounded-full p-[2px] ${
              isFirst 
                ? 'bg-gradient-to-b from-[#85C7FF] via-[#85C7FF]/60 to-[#85C7FF]/25' 
                : 'bg-gradient-to-b from-[#E8E5FF]/60 via-[#526197]/50 to-[#526197]/20'
            }`}>
              <div className={`${isFirst ? 'w-14 h-14' : 'w-12 h-12'} rounded-full flex items-center justify-center bg-[#0c0f18]`}>
                <span className={`${isFirst ? 'text-base text-white' : 'text-sm text-[#E8E5FF]/90'} font-black uppercase`}>
                  {getInitials(entry.player.username)}
                </span>
              </div>
            </div>
          </div>
          
          <h3 className={`mt-2.5 text-[13px] font-black ${isFirst ? 'text-[14px] text-white' : 'text-[#E8E5FF]'} truncate max-w-[95%]`}>
            {entry.player.username}
          </h3>
          
          <div className="mt-auto w-full px-1">
            <div className={`relative rounded-xl py-2.5 px-2 ${
              isFirst 
                ? 'bg-[#85C7FF]/[0.06] border border-[#85C7FF]/15' 
                : 'bg-[#526197]/10 border border-[#526197]/20'
            }`}>
              <div className="text-center">
                <span className={`${isFirst ? 'text-lg' : 'text-base'} font-black tabular-nums tracking-tight leading-none ${
                  isFirst 
                    ? 'text-gradient-white-blue' 
                    : 'text-[#E8E5FF]'
                }`}>
                  {formatValue(entry.prize.amount)}K
                </span>
              </div>
            </div>
            <div className="mt-2 px-0.5 flex flex-col items-center text-center">
              <span className={`text-[9px] font-bold uppercase tracking-wider ${
                isFirst ? 'text-white/40' : 'text-[#E8E5FF]/45'
              }`}>Wagered</span>
              <span className={`text-[11px] font-bold tabular-nums ${
                isFirst ? 'text-white/55' : 'text-[#E8E5FF]/55'
              }`}>{formatValue(entry.value)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
