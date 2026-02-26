import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { BRANDING } from '@/config/branding';

export function NewNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const bgGradient = isButcherTheme
    ? `linear-gradient(135deg, ${BRANDING.theme.secondaryColor}15 0%, rgba(26, 0, 0, 0.5) 50%, ${BRANDING.theme.primaryColor}10 100%)`
    : 'linear-gradient(135deg, rgba(133, 199, 255, 0.05) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(153, 208, 255, 0.05) 100%)';
  const borderColor = isButcherTheme ? `${primaryColor}30` : 'rgba(255, 255, 255, 0.1)';
  const highlightColor = isButcherTheme ? `${primaryColor}60` : 'rgba(255, 255, 255, 0.3)';

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none">
        <nav 
          className="pointer-events-auto relative mt-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[92%] max-w-5xl rounded-2xl backdrop-blur-2xl flex items-center justify-between p-2.5 pl-4"
          style={{
            background: bgGradient,
            border: `1px solid ${borderColor}`,
            boxShadow: isButcherTheme
              ? `0 8px 32px rgba(139, 0, 0, 0.4), 0 0 0 1px ${primaryColor}20 inset, 0 0 40px ${primaryColor}10`
              : '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset',
          }}
        >
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-50"
            style={{
              background: isButcherTheme
                ? `linear-gradient(to bottom right, ${primaryColor}20, transparent, transparent)`
                : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent, transparent)',
            }}
          />
          
          {/* Top highlight - blood effect */}
          <div 
            className="absolute top-0 left-[10%] right-[10%] h-[2px]"
            style={{
              background: `linear-gradient(to right, transparent, ${highlightColor}, transparent)`,
              boxShadow: isButcherTheme ? `0 0 10px ${primaryColor}40` : undefined,
            }}
          />
          
          {/* Logo and nav links */}
          <div className="flex items-center gap-2 relative z-10">
            <a className="flex items-center gap-3 pr-3 group/logo" href="/">
              <div 
                className="relative w-11 h-11 rounded-full p-[2px] transition-all duration-300"
                style={{
                  background: isButcherTheme
                    ? `linear-gradient(to bottom right, ${primaryColor}60, ${BRANDING.theme.accentColor}60)`
                    : 'linear-gradient(to bottom right, rgba(133, 199, 255, 0.4), rgba(153, 208, 255, 0.4))',
                  boxShadow: isButcherTheme ? `0 0 20px ${primaryColor}40` : undefined,
                }}
                onMouseEnter={(e) => {
                  if (isButcherTheme) {
                    e.currentTarget.style.boxShadow = `0 0 30px ${primaryColor}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (isButcherTheme) {
                    e.currentTarget.style.boxShadow = `0 0 20px ${primaryColor}40`;
                  }
                }}
              >
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: isButcherTheme
                      ? 'linear-gradient(to bottom right, #1a0000, #2d0000)'
                      : 'linear-gradient(to bottom right, #1e2642, #1a1f3a)',
                  }}
                >
                  <img 
                    src="/favicon.png" 
                    alt={`${BRANDING.streamerName} Logo`}
                    className="object-cover opacity-90 group-hover/logo:opacity-100 group-hover/logo:scale-110 transition-all duration-300 w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-24 opacity-100">
                <span 
                  className="font-black text-base leading-none tracking-tight"
                  style={{
                    color: isButcherTheme ? primaryColor : '#FFFFFF',
                    textShadow: isButcherTheme ? `0 0 10px ${primaryColor}60` : undefined,
                  }}
                >
                  {BRANDING.streamerName}
                </span>
              </div>
            </a>
            
            <div 
              className="h-8 w-[1px] mx-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 scale-y-100"
              style={{
                background: `linear-gradient(to bottom, transparent, ${isButcherTheme ? primaryColor : 'rgba(255, 255, 255, 0.2)'}, transparent)`,
              }}
            />
            
            <div className="flex items-center gap-1">
              <a 
                className="relative px-5 py-2.5 text-sm font-black transition-all duration-300 group/link rounded-xl"
                style={{
                  color: isButcherTheme ? primaryColor : '#FFFFFF',
                  textShadow: isButcherTheme ? `0 0 8px ${primaryColor}40` : undefined,
                }}
                href="/leaderboard"
              >
                Leaderboard
                <span 
                  className="absolute left-1/2 bottom-1 w-0 h-[3px] rounded-full -translate-x-1/2 group-hover/link:w-8 transition-all duration-300"
                  style={{
                    background: isButcherTheme
                      ? `linear-gradient(to right, ${primaryColor}, ${BRANDING.theme.accentColor})`
                      : 'linear-gradient(to right, #85C7FF, #99D0FF)',
                    boxShadow: isButcherTheme
                      ? `0 0 15px ${primaryColor}`
                      : '0 0 8px #85C7FF',
                  }}
                />
              </a>
              
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="relative z-10 pl-4 flex items-center gap-3">
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/cta relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300"
              style={{
                background: isButcherTheme
                  ? `linear-gradient(to right, ${primaryColor}, ${BRANDING.theme.accentColor})`
                  : 'linear-gradient(to right, #85C7FF, #99D0FF)',
                boxShadow: isButcherTheme
                  ? `0 0 20px ${primaryColor}50, 0 4px 15px rgba(139, 0, 0, 0.3)`
                  : '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (isButcherTheme) {
                  e.currentTarget.style.boxShadow = `0 0 35px ${primaryColor}80, 0 6px 20px rgba(139, 0, 0, 0.5)`;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (isButcherTheme) {
                  e.currentTarget.style.boxShadow = `0 0 20px ${primaryColor}50, 0 4px 15px rgba(139, 0, 0, 0.3)`;
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              href="https://wager.com"
            >
              <span className="text-xs font-black uppercase tracking-widest text-white z-10">Play Now</span>
              <svg className="w-3.5 h-3.5 text-white transition-transform group-hover/cta:translate-x-0.5 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div 
              className="p-2 backdrop-blur-md border rounded-full shadow-lg"
              style={{
                background: isButcherTheme ? 'rgba(26, 0, 0, 0.8)' : 'rgba(11, 16, 27, 0.8)',
                borderColor: isButcherTheme ? `${primaryColor}30` : 'rgba(255, 255, 255, 0.1)',
                boxShadow: isButcherTheme ? `0 4px 15px rgba(139, 0, 0, 0.3), 0 0 20px ${primaryColor}20` : undefined,
              }}
            >
              <a className="block w-8 h-8 rounded-full overflow-hidden" href="/">
                <img 
                  src="/favicon.png" 
                  alt={`${BRANDING.streamerName} Logo`}
                  className="object-cover w-full h-full" 
                />
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
