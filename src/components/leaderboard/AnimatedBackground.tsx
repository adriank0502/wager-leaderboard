import { SnowEffect } from './SnowEffect';

export function AnimatedBackground() {
  return (
    <>
      {/* Main gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0e1a] via-[#0d1220] to-[#0a0e1a]" />
      
      {/* Snow Effect */}
      <SnowEffect />
      
      {/* Animated gradient blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Top right blob */}
        <div 
          className="absolute -top-[300px] -right-[200px] w-[900px] h-[900px] rounded-full animate-blob1"
          style={{
            background: 'radial-gradient(circle, rgba(133, 199, 255, 0.12) 0%, rgba(82, 97, 151, 0.06) 40%, transparent 70%)',
          }}
        />
        
        {/* Bottom left blob */}
        <div 
          className="absolute -bottom-[400px] -left-[300px] w-[800px] h-[800px] rounded-full animate-blob2"
          style={{
            background: 'radial-gradient(circle, rgba(60, 166, 255, 0.1) 0%, rgba(82, 97, 151, 0.05) 40%, transparent 70%)',
          }}
        />
        
        {/* Center blob */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-blob3"
          style={{
            background: 'radial-gradient(circle, rgba(133, 199, 255, 0.06) 0%, transparent 60%)',
          }}
        />
        
        {/* Small floating blob */}
        <div 
          className="absolute top-[20%] left-[15%] w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>
      
      {/* Radial overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 14, 26, 0.4) 50%, #0a0e1a 100%)',
        }}
      />
      
      {/* Noise texture */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Top gradient line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#85C7FF]/20 to-transparent -z-10 pointer-events-none" />
    </>
  );
}
