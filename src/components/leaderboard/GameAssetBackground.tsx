import { BRANDING } from '@/config/branding';
import { BloodEffect } from './BloodEffect';

// No Limit City game-inspired background for ButcherX
// Uses dark, gritty aesthetics from games like DEAD DEAD DEADER, SERIAL, Mental 2
// Enhanced with blood effects for the butcher theme

export function GameAssetBackground() {
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  
  if (!isButcherTheme) {
    return null; // Use default background for other streamers
  }

  const gameImages = BRANDING.gameAssets.backgroundImages || [];

  return (
    <>
      {/* Main dark red gradient background (butcher theme) */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, ${BRANDING.theme.backgroundGradient.join(', ')})`,
        }}
      />
      
      
      {/* Additional red overlay for more blood-like appearance */}
      <div 
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
        }}
      />
      
      {/* Blood Effect Animation */}
      <BloodEffect />
      
      {/* No Limit City inspired dark patterns */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Dark red/blood-like blobs (inspired by DEAD DEAD DEADER) */}
        <div 
          className="absolute -top-[300px] -right-[200px] w-[900px] h-[900px] rounded-full animate-blob1 opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(139, 0, 0, 0.25) 0%, rgba(220, 20, 60, 0.15) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        <div 
          className="absolute -bottom-[400px] -left-[300px] w-[800px] h-[800px] rounded-full animate-blob2 opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.2) 0%, rgba(139, 0, 0, 0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Center dark spot (Mental 2 inspired) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-blob3 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 99, 71, 0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Small floating red accent (SERIAL inspired) */}
        <div 
          className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full animate-float opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(220, 20, 60, 0.2) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>
      
      {/* Dark overlay with texture (No Limit City gritty style) */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(26, 0, 0, 0.6) 50%, #1a0000 100%)',
        }}
      />
      
      {/* Gritty noise texture (inspired by SERIAL/DEAD DEAD DEADER aesthetics) */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Dark red accent line (butcher theme) */}
      <div 
        className="fixed top-0 left-0 right-0 h-[1px] -z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${BRANDING.theme.secondaryColor}40, transparent)`,
        }}
      />
      
      {/* Additional dark patterns for depth (NO limit inspired) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Diagonal dark lines pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(220, 20, 60, 0.1) 2px,
              rgba(220, 20, 60, 0.1) 4px
            )`,
          }}
        />
      </div>
    </>
  );
}
