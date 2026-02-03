import { useState, useEffect } from 'react';

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

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center min-w-[70px] sm:min-w-[90px]">
      <div className="relative mb-3">
        <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-[#85C7FF]/30 to-[#85C7FF]/10">
          <div className="bg-[#1B1F38] rounded-xl px-4 py-3 sm:px-5 sm:py-4 timer-box">
            <div className="relative h-[40px] sm:h-[52px]">
              <div 
                className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-black text-gradient-white-blue"
                style={{ opacity: 1, transform: 'none' }}
              >
                {formatNumber(value)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[10px] sm:text-xs font-black text-[#7D7E97] uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  const Separator = () => (
    <div className="text-2xl sm:text-3xl font-black text-[#85C7FF]/30 -mt-6">:</div>
  );

  return (
    <div className="relative mx-auto mb-10 max-w-4xl px-4">
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-4 sm:gap-8">
          <TimeBox value={time.days} label="Days" />
          <Separator />
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <TimeBox value={time.hours} label="Hours" />
          <Separator />
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <TimeBox value={time.minutes} label="Minutes" />
          <Separator />
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <TimeBox value={time.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
