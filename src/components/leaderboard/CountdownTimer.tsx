import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function CountdownTimer({ 
  days = 25,
  hours = 16, 
  minutes = 29, 
  seconds = 22 
}: CountdownTimerProps) {
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
    <div className="flex flex-col items-center">
      <div className="timer-box w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <span className="timer-number text-2xl md:text-3xl">{formatNumber(value)}</span>
      </div>
      <span className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{label}</span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col gap-1.5 pb-6">
      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      <TimeBox value={time.days} label="Days" />
      <Separator />
      <TimeBox value={time.hours} label="Hours" />
      <Separator />
      <TimeBox value={time.minutes} label="Minutes" />
      <Separator />
      <TimeBox value={time.seconds} label="Seconds" />
    </div>
  );
}
