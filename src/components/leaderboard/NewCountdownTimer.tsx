import { useState, useEffect } from 'react';
import { BRANDING } from '@/config/branding';

interface NewCountdownTimerProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function NewCountdownTimer({ 
  days = 25,
  hours = 6, 
  minutes = 45, 
  seconds = 1 
}: NewCountdownTimerProps) {
  const [time, setTime] = useState({ days, hours, minutes, seconds });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 30;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const bgColor = isButcherTheme ? '#1a0000' : '#1B1F38';
  const borderGradient = isButcherTheme 
    ? `linear-gradient(to bottom, ${BRANDING.theme.secondaryColor}50, ${BRANDING.theme.primaryColor}30)`
    : 'linear-gradient(to bottom, rgba(133, 199, 255, 0.3), rgba(133, 199, 255, 0.1))';

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center min-w-[60px] sm:min-w-[80px] md:min-w-[90px] flex-shrink-0">
      <div className="relative mb-2 sm:mb-3">
        <div 
          className="relative rounded-lg sm:rounded-xl p-[1px]"
          style={{
            background: borderGradient,
            boxShadow: isButcherTheme 
              ? `0 0 20px ${primaryColor}30, inset 0 0 20px ${primaryColor}10`
              : undefined,
          }}
        >
          <div 
            className="rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4"
            style={{
              background: bgColor,
              border: isButcherTheme ? `1px solid ${primaryColor}20` : undefined,
            }}
          >
            <div className="relative min-h-[36px] h-[36px] sm:min-h-[44px] sm:h-[44px] md:min-h-[52px] md:h-[52px] flex items-center justify-center overflow-hidden">
              <div 
                className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-black leading-none"
                style={{
                  opacity: 1,
                  transform: 'none',
                  color: isButcherTheme ? primaryColor : '#FFFFFF',
                  textShadow: isButcherTheme
                    ? `0 0 20px ${primaryColor}80, 0 0 40px ${primaryColor}40, 0 0 60px ${primaryColor}20`
                    : undefined,
                  background: isButcherTheme 
                    ? `linear-gradient(to bottom, ${primaryColor}, #FF6347, ${primaryColor})`
                    : 'linear-gradient(to bottom, #FFFFFF, rgba(133, 199, 255, 0.9))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  wordBreak: 'keep-all',
                  whiteSpace: 'nowrap',
                }}
              >
                {formatNumber(value)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className="text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider"
        style={{
          color: isButcherTheme ? 'rgba(220, 20, 60, 0.8)' : '#7D7E97',
          textShadow: isButcherTheme ? `0 0 5px ${primaryColor}40` : undefined,
        }}
      >
        {label}
      </div>
    </div>
  );

  const Separator = () => (
    <div 
      className="text-xl sm:text-2xl md:text-3xl font-black -mt-4 sm:-mt-5 md:-mt-6 flex-shrink-0"
      style={{
        color: isButcherTheme ? `${primaryColor}60` : 'rgba(133, 199, 255, 0.3)',
        textShadow: isButcherTheme ? `0 0 10px ${primaryColor}40` : undefined,
        animation: isButcherTheme ? 'bloodPulse 2s ease-in-out infinite' : undefined,
      }}
    >
      :
    </div>
  );

  return (
    <div className="relative mx-auto mb-8 sm:mb-10 max-w-4xl px-2 sm:px-4">
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <TimeBox value={time.days} label="Days" />
          <Separator />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <TimeBox value={time.hours} label="Hours" />
          <Separator />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <TimeBox value={time.minutes} label="Minutes" />
          <Separator />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <TimeBox value={time.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
