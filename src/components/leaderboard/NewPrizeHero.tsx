import { BRANDING } from '@/config/branding';

interface NewPrizeHeroProps {
  prizeAmount?: string;
  period?: string;
  description?: string;
  streamerName?: string;
}

export function NewPrizeHero({ 
  prizeAmount = "$5,000", 
  period = "Monthly",
  description = "Sign up using referral code WAGER and start wagering to compete for prizes",
  streamerName = "WAGER"
}: NewPrizeHeroProps) {
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const bloodRed = isButcherTheme ? BRANDING.theme.secondaryColor : '#DC143C';
  const bloodAccent = isButcherTheme ? BRANDING.theme.accentColor : '#FF6347';
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-16 sm:pt-36 sm:pb-20 text-center">
      <div className="relative space-y-8">
        {/* Large prize amount */}
        <div className="relative px-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter relative min-h-[1.1em]">
            <span className="prize-amount inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[360px]">
              {prizeAmount}
            </span>
          </h1>
          <div className="absolute inset-0 blur-[100px] opacity-30 bg-gradient-to-br from-[#85C7FF] via-[#99D0FF] to-[#85C7FF]" />
        </div>
        
        {/* Period title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider min-h-[1.2em]">
          {period} Leaderboard
        </h2>
        
        {/* Description */}
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/60 font-semibold leading-relaxed">
          {description.split(streamerName).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className="font-black text-gradient-blue">{streamerName}</span>
              )}
            </span>
          ))}
        </p>
        
        {/* ButcherX branding */}
        {isButcherTheme && (
          <div className="flex items-center justify-center pt-6">
            <div className="relative">
              <h2 
                className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight relative"
                style={{
                  background: `linear-gradient(to bottom right, ${bloodRed}, ${bloodAccent}, ${bloodRed})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 30px ${bloodRed}99)`,
                  textShadow: `0 0 40px ${bloodRed}CC, 0 0 80px ${bloodRed}66`,
                  letterSpacing: '0.05em',
                }}
              >
                ButcherX
              </h2>
              {/* Glowing effect behind text */}
              <div 
                className="absolute inset-0 blur-[40px] opacity-50 -z-10"
                style={{
                  background: `radial-gradient(circle, ${bloodRed}99 0%, transparent 70%)`,
                }}
              />
              {/* Animated pulse effect */}
              <div 
                className="absolute inset-0 blur-[60px] opacity-30 -z-10 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${bloodAccent}99 0%, transparent 70%)`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
