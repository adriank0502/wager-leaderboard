interface NewPrizeHeroProps {
  prizeAmount?: string;
  period?: string;
  description?: string;
  streamerName?: string;
}

export function NewPrizeHero({ 
  prizeAmount = "$40,000", 
  period = "Monthly",
  description = "Sign up using referral code WAGER and start wagering to compete for prizes",
  streamerName = "WAGER"
}: NewPrizeHeroProps) {
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
        
        {/* Partner badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <a 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-all hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(133,199,255,0.4)]"
            href="https://wager.com"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white">Wager.com</span>
            </div>
          </a>
          
          <div className="text-2xl sm:text-3xl font-black text-[#85C7FF]/40">×</div>
          
          <a 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-all hover:scale-110"
            href="https://wager.com"
          >
            <img 
              src="https://cdn-cms.wager.com/Logo/wager-logged.png" 
              alt="Wager Logo" 
              className="h-16 sm:h-20 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(133,199,255,0.6)]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
