import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

export function NewNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none">
        <nav className="pointer-events-auto relative mt-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[92%] max-w-5xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.05)_inset] backdrop-blur-2xl border border-white/10 flex items-center justify-between p-2.5 pl-4 nav-bar">
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
          
          {/* Top highlight */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Logo and nav links */}
          <div className="flex items-center gap-2 relative z-10">
            <a className="flex items-center gap-3 pr-3 group/logo" href="/">
              <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-br from-[#85C7FF]/40 to-[#99D0FF]/40 group-hover/logo:from-[#85C7FF]/60 group-hover/logo:to-[#99D0FF]/60 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1e2642] to-[#1a1f3a] flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn-cms.wager.com/Logo/wager-logged.png" 
                    alt="Wager Logo" 
                    className="object-cover opacity-90 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300 w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-24 opacity-100">
                <span className="font-black text-base text-white leading-none tracking-tight">WAGER</span>
              </div>
            </a>
            
            <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 scale-y-100" />
            
            <div className="flex items-center gap-1">
              <a className="relative px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 group/link rounded-xl" href="/leaderboard">
                Leaderboard
                <span className="absolute left-1/2 bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#85C7FF] to-[#99D0FF] rounded-full -translate-x-1/2 group-hover/link:w-8 shadow-[0_0_8px_#85C7FF] transition-all duration-300" />
              </a>
              
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="relative z-10 pl-4 flex items-center gap-3">
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/cta relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full overflow-hidden bg-gradient-to-r from-[#85C7FF] to-[#99D0FF] hover:from-[#99D0FF] hover:to-[#85C7FF] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(133,199,255,0.4)]"
              href="https://wager.com"
            >
              <span className="text-xs font-black uppercase tracking-widest text-black z-10">Play Now</span>
              <svg className="w-3.5 h-3.5 text-black transition-transform group-hover/cta:translate-x-0.5 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </a>
            <Button className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-white transition-all duration-300">
              Sign In
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <nav className="fixed md:hidden top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="p-4 flex justify-between items-start">
          <div className="pointer-events-auto transition-all duration-500 opacity-100 scale-100 blur-0">
            <div className="p-2 bg-[#0b101b]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
              <a className="block w-8 h-8 rounded-full overflow-hidden" href="/">
                <img src="https://cdn-cms.wager.com/Logo/wager-logged.png" alt="Wager Logo" className="object-cover w-full h-full" />
              </a>
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto relative group w-12 h-12 flex flex-col justify-center items-center gap-[5px] rounded-full backdrop-blur-md transition-all duration-300 bg-[#0b101b]/80 border border-white/10 shadow-lg"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <>
                <span className="h-[2px] bg-white rounded-full transition-all duration-300 w-5 group-hover:w-6" />
                <span className="h-[2px] bg-white rounded-full transition-all duration-300 w-3 opacity-60 group-hover:w-6 group-hover:opacity-100" />
                <span className="h-[2px] bg-white rounded-full transition-all duration-300 w-4 group-hover:w-6" />
              </>
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020305]/95 backdrop-blur-[20px] transition-all duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] md:hidden">
          <div className="h-full flex flex-col justify-center items-center relative z-10 px-6">
            <div className="flex flex-col items-center gap-8">
              <a
                className="relative group text-4xl font-black uppercase tracking-tight text-white transition-all duration-500"
                href="/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Leaderboard</span>
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#85C7FF] opacity-30 -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
              <a
                className="relative group text-4xl font-black uppercase tracking-tight text-white transition-all duration-500"
                href="/bonuses"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Bonuses</span>
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#85C7FF] opacity-30 -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
              <button className="relative group text-4xl font-black uppercase tracking-tight text-[#85C7FF] transition-all duration-500">
                Sign In
              </button>
            </div>
            
            <div className="mt-16 w-full max-w-[280px] h-[1px] bg-white/10" />
            
            <div className="mt-8">
              <a 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#85C7FF] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#85C7FF] text-black font-black uppercase tracking-wide shadow-[0_0_20px_rgba(133,199,255,0.3)] transition-all duration-300 hover:scale-105"
                href="https://wager.com"
              >
                Play Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
