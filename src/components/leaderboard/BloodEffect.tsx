import { useEffect, useState } from 'react';

interface BloodDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export function BloodEffect() {
  const [drops, setDrops] = useState<BloodDrop[]>([]);

  useEffect(() => {
    // Create blood drops
    const newDrops: BloodDrop[] = [];
    for (let i = 0; i < 30; i++) {
      newDrops.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 3 + Math.random() * 4, // 3-7 seconds
        size: 2 + Math.random() * 4, // 2-6px
      });
    }
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated blood drops */}
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 rounded-full"
          style={{
            left: `${drop.left}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 2}px`,
            background: 'radial-gradient(ellipse, rgba(220, 20, 60, 0.8) 0%, rgba(139, 0, 0, 0.6) 50%, transparent 100%)',
            animation: `bloodDrop ${drop.duration}s ${drop.delay}s infinite`,
            boxShadow: `0 0 ${drop.size * 2}px rgba(220, 20, 60, 0.5)`,
          }}
        />
      ))}

      {/* Blood splatters (static decorative elements) */}
      <div
        className="absolute top-[10%] left-[5%] w-16 h-16 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
          filter: 'blur(8px)',
          transform: 'rotate(-45deg)',
          animation: 'bloodPulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[30%] right-[8%] w-12 h-12 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(220, 20, 60, 0.3) 0%, transparent 70%)',
          filter: 'blur(6px)',
          transform: 'rotate(30deg)',
          animation: 'bloodPulse 5s ease-in-out infinite 1s',
        }}
      />
      <div
        className="absolute bottom-[20%] left-[12%] w-20 h-20 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(139, 0, 0, 0.5) 0%, transparent 70%)',
          filter: 'blur(10px)',
          transform: 'rotate(60deg)',
          animation: 'bloodPulse 6s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute bottom-[15%] right-[15%] w-14 h-14 opacity-18"
        style={{
          background: 'radial-gradient(circle, rgba(220, 20, 60, 0.4) 0%, transparent 70%)',
          filter: 'blur(7px)',
          transform: 'rotate(-30deg)',
          animation: 'bloodPulse 4.5s ease-in-out infinite 0.5s',
        }}
      />

      {/* Animated blood streaks */}
      <div
        className="absolute top-[5%] left-[20%] w-1 h-32 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(220, 20, 60, 0.6), transparent)',
          animation: 'bloodStreak 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[10%] right-[25%] w-1 h-24 opacity-25"
        style={{
          background: 'linear-gradient(to bottom, rgba(139, 0, 0, 0.5), transparent)',
          animation: 'bloodStreak 10s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute bottom-[25%] left-[30%] w-1 h-28 opacity-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(220, 20, 60, 0.4), transparent)',
          animation: 'bloodStreak 9s ease-in-out infinite 4s',
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes bloodDrop {
          0% {
            transform: translateY(-10px) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes bloodPulse {
          0%, 100% {
            transform: scale(1) rotate(var(--rotation, 0deg));
            opacity: 0.2;
          }
          50% {
            transform: scale(1.3) rotate(var(--rotation, 0deg));
            opacity: 0.4;
          }
        }

        @keyframes bloodStreak {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0) scaleY(1);
          }
          50% {
            opacity: 0.4;
            transform: translateY(20px) scaleY(1.2);
          }
        }
      `}</style>
    </div>
  );
}
