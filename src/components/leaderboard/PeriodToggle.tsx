import { useState } from 'react';
import { BRANDING } from '@/config/branding';

interface PeriodToggleProps {
  onChange?: (period: 'monthly' | 'weekly') => void;
}

export function PeriodToggle({ onChange }: PeriodToggleProps) {
  const [selected, setSelected] = useState<'monthly' | 'weekly'>('monthly');
  const isButcherTheme = BRANDING.streamerCode === 'butcher';
  const primaryColor = isButcherTheme ? BRANDING.theme.secondaryColor : '#85C7FF';
  const accentColor = isButcherTheme ? BRANDING.theme.accentColor : '#99D0FF';
  const bgColor = isButcherTheme ? '#1a0000' : '#0f1322';
  const borderColor = isButcherTheme ? `${primaryColor}30` : 'rgba(255, 255, 255, 0.1)';

  const handleToggle = (period: 'monthly' | 'weekly') => {
    setSelected(period);
    onChange?.(period);
  };

  return (
    <div className="flex justify-center mb-10">
      <div 
        className="relative inline-flex p-1 rounded-full toggle-switch"
        style={{
          background: bgColor,
          border: `1px solid ${borderColor}`,
          boxShadow: isButcherTheme
            ? `0 4px 20px rgba(139, 0, 0, 0.4), 0 0 0 1px ${primaryColor}20, inset 0 0 20px ${primaryColor}10`
            : '0 4px 20px rgba(0,0,0,0.25)',
        }}
      >
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] toggle-indicator ${
            selected === 'monthly' ? 'left-1' : 'left-[calc(50%+2px)]'
          }`}
          style={{
            background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`,
            boxShadow: isButcherTheme
              ? `0 0 25px ${primaryColor}60, 0 0 50px ${primaryColor}30`
              : '0 0 16px rgba(133,199,255,0.25)',
          }}
        />
        <button 
          onClick={() => handleToggle('monthly')}
          className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-black transition-all duration-300 ${
            selected === 'monthly' ? 'text-white' : isButcherTheme ? 'text-white/60 hover:text-white/80' : 'text-white/50 hover:text-white/70'
          }`}
          style={{
            textShadow: isButcherTheme && selected === 'monthly' ? `0 0 10px ${primaryColor}60` : undefined,
          }}
        >
          Monthly
        </button>
        <button 
          onClick={() => handleToggle('weekly')}
          className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-black transition-all duration-300 ${
            selected === 'weekly' ? 'text-white' : isButcherTheme ? 'text-white/60 hover:text-white/80' : 'text-white/50 hover:text-white/70'
          }`}
          style={{
            textShadow: isButcherTheme && selected === 'weekly' ? `0 0 10px ${primaryColor}60` : undefined,
          }}
        >
          Weekly
        </button>
      </div>
    </div>
  );
}
