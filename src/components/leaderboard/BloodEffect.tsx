import { useEffect, useState } from 'react';
import { BRANDING } from '@/config/branding';

interface BloodParticle {
  id: number;
  x: number; // % from left
  y: number; // % from top
  size: number;
  delay: number;
  duration: number;
  pathX: number; // horizontal movement variation
  pathY: number; // vertical movement (flowing down)
  opacity: number;
}

interface BloodSplash {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function BloodEffect() {
  const [particles, setParticles] = useState<BloodParticle[]>([]);
  const [splashes, setSplashes] = useState<BloodSplash[]>([]);
  const isButcherTheme = BRANDING.streamerCode === 'butcher';

  useEffect(() => {
    if (!isButcherTheme) return;

    // Create blood particles flowing down (like Vercel particles)
    const newParticles: BloodParticle[] = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -5 - Math.random() * 10, // Start above viewport
        size: 2 + Math.random() * 4, // 2-6px (small particles like Vercel)
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 25, // 15-40s (slow, smooth movement)
        pathX: (Math.random() - 0.5) * 8, // -4 to 4% horizontal drift
        pathY: 100 + Math.random() * 20, // 100-120% vertical flow (down)
        opacity: 0.4 + Math.random() * 0.5, // 0.4-0.9
      });
    }
    setParticles(newParticles);

    // Create blood splashes (appear randomly)
    const newSplashes: BloodSplash[] = [];
    for (let i = 0; i < 12; i++) {
      newSplashes.push({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 60, // 20-80% from top
        size: 15 + Math.random() * 25, // 15-40px
        delay: Math.random() * 10,
        duration: 2 + Math.random() * 3, // 2-5s
      });
    }
    setSplashes(newSplashes);
  }, [isButcherTheme]);

  if (!isButcherTheme) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Blood particles flowing down (Vercel-style) */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `bloodParticleFlow ${particle.duration}s ${particle.delay}s infinite ease-in-out`,
            '--path-x': `${particle.pathX}%`,
            '--path-y': `${particle.pathY}%`,
            opacity: particle.opacity,
          } as React.CSSProperties}
        >
          {/* Blood particle - glowing red dot */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(
                circle at 50% 50%,
                rgba(255, 60, 60, 0.9) 0%,
                rgba(220, 20, 20, 0.8) 40%,
                rgba(160, 10, 10, 0.7) 70%,
                rgba(100, 0, 0, 0.5) 100%
              )`,
              boxShadow: `
                0 0 ${particle.size * 1.5}px rgba(220, 20, 60, 0.8),
                0 0 ${particle.size * 3}px rgba(200, 0, 0, 0.5)
              `,
              filter: 'blur(0.5px)',
            }}
          />
        </div>
      ))}

      {/* Blood splashes */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="absolute"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
            width: `${splash.size}px`,
            height: `${splash.size}px`,
            animation: `bloodSplash ${splash.duration}s ${splash.delay}s infinite ease-out`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Main splash */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(
                circle at 50% 50%,
                rgba(255, 80, 80, 0.7) 0%,
                rgba(200, 20, 20, 0.6) 30%,
                rgba(140, 10, 10, 0.4) 60%,
                transparent 100%
              )`,
              boxShadow: `
                0 0 ${splash.size * 0.5}px rgba(220, 20, 60, 0.6),
                0 0 ${splash.size}px rgba(200, 0, 0, 0.4)
              `,
              filter: 'blur(1px)',
            }}
          />

          {/* Splash particles - radiating outward */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60); // 0, 60, 120, 180, 240, 300 degrees
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${splash.size * 0.15}px`,
                  height: `${splash.size * 0.15}px`,
                  background: `rgba(220, 20, 60, 0.6)`,
                  boxShadow: `0 0 ${splash.size * 0.1}px rgba(200, 0, 0, 0.7)`,
                  animation: `bloodSplashParticle${i} ${splash.duration}s ${splash.delay}s infinite ease-out`,
                  filter: 'blur(0.5px)',
                }}
              />
            );
          })}
        </div>
      ))}

      <style>{`
        /* Blood particles flowing down with smooth movement (Vercel-style) */
        @keyframes bloodParticleFlow {
          0% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0;
          }
          5% {
            opacity: 0.4;
            transform: translate(calc(var(--path-x, 0%) * 0.1), 5vh) scale(0.9);
          }
          25% {
            opacity: 0.7;
            transform: translate(calc(var(--path-x, 0%) * 0.3), 25vh) scale(1);
          }
          50% {
            opacity: 0.7;
            transform: translate(calc(var(--path-x, 0%) * 0.6), 50vh) scale(1.1);
          }
          75% {
            opacity: 0.7;
            transform: translate(calc(var(--path-x, 0%) * 0.9), 75vh) scale(1);
          }
          95% {
            opacity: 0.35;
            transform: translate(var(--path-x, 0%), calc(var(--path-y, 100%) * 0.95)) scale(0.9);
          }
          100% {
            opacity: 0;
            transform: translate(var(--path-x, 0%), var(--path-y, 100%)) scale(0.8);
          }
        }

        /* Blood splash effect */
        @keyframes bloodSplash {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }
          30% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1);
          }
          60% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
        }

        /* Splash particles radiating outward - each particle at different angle */
        @keyframes bloodSplashParticle0 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(0, -30px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(0, -45px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(0, -60px) scale(0.5); }
        }
        @keyframes bloodSplashParticle1 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(26px, -15px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(39px, -22px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(52px, -30px) scale(0.5); }
        }
        @keyframes bloodSplashParticle2 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(26px, 15px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(39px, 22px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(52px, 30px) scale(0.5); }
        }
        @keyframes bloodSplashParticle3 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(0, 30px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(0, 45px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(0, 60px) scale(0.5); }
        }
        @keyframes bloodSplashParticle4 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(-26px, 15px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(-39px, 22px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(-52px, 30px) scale(0.5); }
        }
        @keyframes bloodSplashParticle5 {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0); opacity: 0; }
          15% { opacity: 0.8; transform: translate(-50%, -50%) translate(-26px, -15px) scale(1.2); }
          40% { opacity: 0.6; transform: translate(-50%, -50%) translate(-39px, -22px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(-52px, -30px) scale(0.5); }
        }
      `}</style>
    </div>
  );
}
