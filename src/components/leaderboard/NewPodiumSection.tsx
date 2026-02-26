import { LeaderboardEntry } from '@/types/leaderboard';
import { BRANDING } from '@/config/branding';

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
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const accentColor = isButcherTheme ? BRANDING.theme.accentColor : '#99D0FF';
  const bgColor = isButcherTheme ? '#1a0000' : '#0f1322';
  const firstBg = isButcherTheme 
    ? 'linear-gradient(to bottom, #2d0000, #1a0000, #0f0000)'
    : 'linear-gradient(to bottom, #151b32, #111628, #0e1220)';
  const otherBg = isButcherTheme
    ? 'linear-gradient(to bottom, #1f0000, #140000, #0f0000)'
    : 'linear-gradient(to bottom, #1a1d2e, #141829, #0e1220)';

  const config = {
    first: { width: 'w-[245px]', height: 'h-[305px]', avatarSize: 'w-[76px] h-[76px]', prizeSize: 'text-[28px]', rank: '1' },
    second: { width: 'w-[210px]', height: 'h-[270px]', avatarSize: 'w-[64px] h-[64px]', prizeSize: 'text-[22px]', rank: '2' },
    third: { width: 'w-[210px]', height: 'h-[270px]', avatarSize: 'w-[64px] h-[64px]', prizeSize: 'text-[22px]', rank: '3' },
  };

  const c = config[position];
  const isFirst = position === 'first';

  return (
    <div className={`group relative ${c.width} ${c.height} ${position === 'second' || position === 'third' ? 'mt-8' : ''} ${isFirst ? 'z-10' : 'z-0'}`}>
      {/* Outer glow for first place - blood red for butcher */}
      {isFirst && (
        <div 
          className="absolute -inset-[1px] rounded-2xl blur-sm"
          style={{
            background: isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}40, ${primaryColor}10, transparent)`
              : 'linear-gradient(to bottom, rgba(133, 199, 255, 0.3), rgba(133, 199, 255, 0.05), transparent)',
            boxShadow: isButcherTheme ? `0 0 30px ${primaryColor}30` : undefined,
          }}
        />
      )}
      
      {/* Border gradient - blood red for butcher */}
      <div 
        className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background: isFirst
            ? isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}60, ${primaryColor}25, ${primaryColor}10)`
              : 'linear-gradient(to bottom, rgba(133, 199, 255, 0.4), rgba(133, 199, 255, 0.15), rgba(133, 199, 255, 0.05))'
            : isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}40, ${primaryColor}15, transparent)`
              : 'linear-gradient(to bottom, rgba(82, 97, 151, 0.5), rgba(82, 97, 151, 0.2), transparent)',
          boxShadow: isButcherTheme && isFirst ? `0 0 20px ${primaryColor}30` : undefined,
        }}
      >
        <div 
          className="w-full h-full rounded-[15px]"
          style={{ background: bgColor }}
        />
      </div>
      
      {/* Card content */}
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: isFirst ? firstBg : otherBg,
          }}
        />
        
        {/* Top highlight - blood red */}
        <div 
          className="absolute top-0 left-[15%] right-[15%] h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}60` : 'rgba(82, 97, 151, 0.4)'}, transparent)`,
            boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}40` : undefined,
          }}
        />
        
        <div className="relative h-full flex flex-col items-center px-5 pt-6 pb-5">
          {/* Rank badge - blood red */}
          <div 
            className="absolute top-4 right-4 w-7 h-7 rounded-md flex items-center justify-center"
            style={{
              background: isFirst
                ? isButcherTheme ? `${primaryColor}20` : 'rgba(133, 199, 255, 0.1)'
                : isButcherTheme ? `${primaryColor}15` : 'rgba(82, 97, 151, 0.15)',
              border: `1px solid ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}40` : 'rgba(82, 97, 151, 0.25)'}`,
              boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}30` : undefined,
            }}
          >
            <span 
              className="text-[11px] font-black"
              style={{
                color: isFirst ? primaryColor : isButcherTheme ? `${primaryColor}90` : 'rgba(232, 229, 255, 0.7)',
                textShadow: isButcherTheme ? `0 0 8px ${primaryColor}60` : undefined,
              }}
            >
              {c.rank}
            </span>
          </div>
          
          {/* Avatar - blood red glow */}
          <div className="relative">
            {isFirst && (
              <div 
                className="absolute inset-0 rounded-full blur-xl scale-[1.8]"
                style={{
                  background: isButcherTheme ? `${primaryColor}25` : 'rgba(133, 199, 255, 0.15)',
                  boxShadow: isButcherTheme ? `0 0 40px ${primaryColor}40` : undefined,
                }}
              />
            )}
            <div 
              className="relative rounded-full p-[2px]"
              style={{
                background: isFirst
                  ? isButcherTheme
                    ? `linear-gradient(to bottom, ${primaryColor}, ${primaryColor}99, ${primaryColor}40)`
                    : 'linear-gradient(to bottom, #85C7FF, rgba(133, 199, 255, 0.6), rgba(133, 199, 255, 0.25))'
                  : isButcherTheme
                    ? `linear-gradient(to bottom, ${primaryColor}80, ${primaryColor}60, ${primaryColor}30)`
                    : 'linear-gradient(to bottom, rgba(232, 229, 255, 0.6), rgba(82, 97, 151, 0.5), rgba(82, 97, 151, 0.2))',
                boxShadow: isButcherTheme ? `0 0 20px ${primaryColor}50` : undefined,
              }}
            >
              <div 
                className={`${c.avatarSize} rounded-full flex items-center justify-center`}
                style={{
                  background: isButcherTheme ? '#0f0000' : '#0c0f18',
                }}
              >
                <span 
                  className={`${isFirst ? 'text-xl' : 'text-lg'} font-black uppercase`}
                  style={{
                    color: isFirst ? '#FFFFFF' : isButcherTheme ? `${primaryColor}90` : 'rgba(232, 229, 255, 0.9)',
                    textShadow: isButcherTheme ? `0 0 10px ${primaryColor}60` : undefined,
                  }}
                >
                  {getInitials(entry.player.username)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Username */}
          <h3 className={`mt-4 text-sm font-black ${isFirst ? 'text-[15px] text-white' : 'text-[#E8E5FF]'} truncate max-w-[95%]`}>
            {entry.player.username}
          </h3>
          
          {/* Prize and wagered amount - blood red */}
          <div className="mt-auto w-full">
            <div 
              className="relative rounded-xl py-4 px-4"
              style={{
                background: isFirst
                  ? isButcherTheme ? `${primaryColor}15` : 'rgba(133, 199, 255, 0.06)'
                  : isButcherTheme ? `${primaryColor}10` : 'rgba(82, 97, 151, 0.1)',
                border: `1px solid ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}30` : 'rgba(82, 97, 151, 0.2)'}`,
                boxShadow: isButcherTheme ? `0 0 15px ${primaryColor}20, inset 0 0 20px ${primaryColor}10` : undefined,
              }}
            >
              <div className="text-center">
                <span 
                  className={`${c.prizeSize} font-black tabular-nums tracking-tight leading-none`}
                  style={{
                    color: isFirst ? primaryColor : isButcherTheme ? primaryColor : '#E8E5FF',
                    background: isFirst && isButcherTheme
                      ? `linear-gradient(to bottom, ${primaryColor}, ${accentColor}, ${primaryColor})`
                      : isFirst
                        ? 'linear-gradient(to bottom, #FFFFFF, rgba(133, 199, 255, 0.9))'
                        : undefined,
                    WebkitBackgroundClip: isFirst ? 'text' : undefined,
                    WebkitTextFillColor: isFirst ? 'transparent' : undefined,
                    backgroundClip: isFirst ? 'text' : undefined,
                    textShadow: isButcherTheme ? `0 0 20px ${primaryColor}80, 0 0 40px ${primaryColor}40` : undefined,
                  }}
                >
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
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const accentColor = isButcherTheme ? BRANDING.theme.accentColor : '#99D0FF';
  const bgColor = isButcherTheme ? '#1a0000' : '#0f1322';
  const firstBg = isButcherTheme 
    ? 'linear-gradient(to bottom, #2d0000, #1a0000, #0f0000)'
    : 'linear-gradient(to bottom, #151b32, #111628, #0e1220)';
  const otherBg = isButcherTheme
    ? 'linear-gradient(to bottom, #1f0000, #140000, #0f0000)'
    : 'linear-gradient(to bottom, #1a1d2e, #141829, #0e1220)';

  const isFirst = position === 'first';
  const height = isFirst ? 'h-[210px]' : 'h-[185px] mt-5';

  return (
    <div className={`group relative flex-1 ${height} ${isFirst ? 'z-10' : 'z-0'}`}>
      {isFirst && (
        <div 
          className="absolute -inset-[1px] rounded-2xl blur-sm"
          style={{
            background: isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}40, ${primaryColor}10, transparent)`
              : 'linear-gradient(to bottom, rgba(133, 199, 255, 0.3), rgba(133, 199, 255, 0.05), transparent)',
            boxShadow: isButcherTheme ? `0 0 30px ${primaryColor}30` : undefined,
          }}
        />
      )}
      
      <div 
        className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background: isFirst
            ? isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}60, ${primaryColor}25, ${primaryColor}10)`
              : 'linear-gradient(to bottom, rgba(133, 199, 255, 0.4), rgba(133, 199, 255, 0.15), rgba(133, 199, 255, 0.05))'
            : isButcherTheme
              ? `linear-gradient(to bottom, ${primaryColor}40, ${primaryColor}15, transparent)`
              : 'linear-gradient(to bottom, rgba(82, 97, 151, 0.5), rgba(82, 97, 151, 0.2), transparent)',
          boxShadow: isButcherTheme && isFirst ? `0 0 20px ${primaryColor}30` : undefined,
        }}
      >
        <div 
          className="w-full h-full rounded-[15px]"
          style={{ background: bgColor }}
        />
      </div>
      
      <div className="relative h-full w-full rounded-2xl overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: isFirst ? firstBg : otherBg,
          }}
        />
        
        <div 
          className="absolute top-0 left-[15%] right-[15%] h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}60` : 'rgba(82, 97, 151, 0.4)'}, transparent)`,
            boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}40` : undefined,
          }}
        />
        
        <div className="relative h-full flex flex-col items-center px-2.5 pt-4 pb-3">
          <div 
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md flex items-center justify-center"
            style={{
              background: isFirst
                ? isButcherTheme ? `${primaryColor}20` : 'rgba(133, 199, 255, 0.1)'
                : isButcherTheme ? `${primaryColor}15` : 'rgba(82, 97, 151, 0.15)',
              border: `1px solid ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}40` : 'rgba(82, 97, 151, 0.25)'}`,
              boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}30` : undefined,
            }}
          >
            <span 
              className="text-[10px] font-black"
              style={{
                color: isFirst ? primaryColor : isButcherTheme ? `${primaryColor}90` : 'rgba(232, 229, 255, 0.7)',
                textShadow: isButcherTheme ? `0 0 8px ${primaryColor}60` : undefined,
              }}
            >
              {entry.rank}
            </span>
          </div>
          
          <div className="relative">
            <div 
              className="relative rounded-full p-[2px]"
              style={{
                background: isFirst
                  ? isButcherTheme
                    ? `linear-gradient(to bottom, ${primaryColor}, ${primaryColor}99, ${primaryColor}40)`
                    : 'linear-gradient(to bottom, #85C7FF, rgba(133, 199, 255, 0.6), rgba(133, 199, 255, 0.25))'
                  : isButcherTheme
                    ? `linear-gradient(to bottom, ${primaryColor}80, ${primaryColor}60, ${primaryColor}30)`
                    : 'linear-gradient(to bottom, rgba(232, 229, 255, 0.6), rgba(82, 97, 151, 0.5), rgba(82, 97, 151, 0.2))',
                boxShadow: isButcherTheme ? `0 0 20px ${primaryColor}50` : undefined,
              }}
            >
              <div 
                className={`${isFirst ? 'w-14 h-14' : 'w-12 h-12'} rounded-full flex items-center justify-center`}
                style={{
                  background: isButcherTheme ? '#0f0000' : '#0c0f18',
                }}
              >
                <span 
                  className={`${isFirst ? 'text-base' : 'text-sm'} font-black uppercase`}
                  style={{
                    color: isFirst ? '#FFFFFF' : isButcherTheme ? `${primaryColor}90` : 'rgba(232, 229, 255, 0.9)',
                    textShadow: isButcherTheme ? `0 0 10px ${primaryColor}60` : undefined,
                  }}
                >
                  {getInitials(entry.player.username)}
                </span>
              </div>
            </div>
          </div>
          
          <h3 
            className={`mt-2.5 text-[13px] font-black ${isFirst ? 'text-[14px]' : ''} truncate max-w-[95%]`}
            style={{
              color: isFirst ? '#FFFFFF' : isButcherTheme ? primaryColor : '#E8E5FF',
              textShadow: isButcherTheme ? `0 0 8px ${primaryColor}40` : undefined,
            }}
          >
            {entry.player.username}
          </h3>
          
          <div className="mt-auto w-full px-1">
            <div 
              className="relative rounded-xl py-2.5 px-2"
              style={{
                background: isFirst
                  ? isButcherTheme ? `${primaryColor}15` : 'rgba(133, 199, 255, 0.06)'
                  : isButcherTheme ? `${primaryColor}10` : 'rgba(82, 97, 151, 0.1)',
                border: `1px solid ${isFirst ? primaryColor : isButcherTheme ? `${primaryColor}30` : 'rgba(82, 97, 151, 0.2)'}`,
                boxShadow: isButcherTheme ? `0 0 15px ${primaryColor}20, inset 0 0 20px ${primaryColor}10` : undefined,
              }}
            >
              <div className="text-center">
                <span 
                  className={`${isFirst ? 'text-lg' : 'text-base'} font-black tabular-nums tracking-tight leading-none`}
                  style={{
                    color: isFirst ? primaryColor : isButcherTheme ? primaryColor : '#E8E5FF',
                    background: isFirst && isButcherTheme
                      ? `linear-gradient(to bottom, ${primaryColor}, ${accentColor}, ${primaryColor})`
                      : isFirst
                        ? 'linear-gradient(to bottom, #FFFFFF, rgba(133, 199, 255, 0.9))'
                        : undefined,
                    WebkitBackgroundClip: isFirst ? 'text' : undefined,
                    WebkitTextFillColor: isFirst ? 'transparent' : undefined,
                    backgroundClip: isFirst ? 'text' : undefined,
                    textShadow: isButcherTheme ? `0 0 20px ${primaryColor}80, 0 0 40px ${primaryColor}40` : undefined,
                  }}
                >
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
