import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import wagerLogo from '@/assets/wager-logo.png';

export function Navbar() {
  return (
    <header className="relative px-2 sm:px-3 py-0">
      <nav className="max-w-6xl mx-auto rounded-2xl px-2 sm:px-3 py-0 flex items-center justify-between bg-transparent">
        {/* Logo with hover effect */}
        <a 
          href="#" 
          className="flex items-center cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_hsl(25_100%_50%/0.7)]"
        >
          <img 
            src={wagerLogo} 
            alt="Wager Logo" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
          />
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">
            Leaderboard
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button className="btn-primary rounded-full px-3 sm:px-5 py-1.5 sm:py-2 gap-1.5 sm:gap-2 text-sm sm:text-base">
            PLAY NOW
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
