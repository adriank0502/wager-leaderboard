import wagerLogo from '@/assets/wager-logo.png';

interface PrizeHeroProps {
  prizeAmount?: string;
  period?: string;
  description?: string;
  streamerName?: string;
}

export function PrizeHero({ 
  prizeAmount = "$40,000", 
  period = "MONTHLY",
  description = "Sign up using referral code and start wagering to compete for prizes",
  streamerName = "WAGER"
}: PrizeHeroProps) {
  return (
    <section className="pt-4 md:pt-8 pb-8 md:pb-12 text-center">
      <div className="container mx-auto px-4">
        {/* Large Prize Amount */}
        <h1 className="prize-amount text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-2 md:mb-4">
          {prizeAmount}
        </h1>
        
        {/* Period Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-wider text-foreground mb-4 md:mb-6">
          {period} LEADERBOARD
        </h2>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8 px-2">
          {description.split(streamerName).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-primary font-semibold">{streamerName}</span>}
            </span>
          ))}
        </p>

        {/* Partner Badge with Glow */}
        <div className="inline-flex items-center gap-3 sm:gap-5 relative">
          <span className="text-foreground font-semibold text-lg sm:text-xl md:text-2xl">Wager.com</span>
          <span className="text-primary text-xl sm:text-2xl font-bold">×</span>
          <a 
            href="#" 
            className="group relative transition-all duration-300 hover:scale-125 hover:animate-pulse"
          >
            <img 
              src={wagerLogo} 
              alt="Wager Logo" 
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_8px_hsl(25_100%_50%/0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_hsl(25_100%_50%/0.6)]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
