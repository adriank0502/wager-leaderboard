import { useState } from 'react';

interface PeriodToggleProps {
  onChange?: (period: 'monthly' | 'weekly') => void;
}

export function PeriodToggle({ onChange }: PeriodToggleProps) {
  const [selected, setSelected] = useState<'monthly' | 'weekly'>('monthly');

  const handleToggle = (period: 'monthly' | 'weekly') => {
    setSelected(period);
    onChange?.(period);
  };

  return (
    <div className="flex justify-center mb-10">
      <div className="relative inline-flex p-1 rounded-full bg-[#0f1322] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)] toggle-switch">
        <div 
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#85C7FF] to-[#99D0FF] shadow-[0_0_16px_rgba(133,199,255,0.25)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] toggle-indicator ${
            selected === 'monthly' ? 'left-1' : 'left-[calc(50%+2px)]'
          }`}
        />
        <button 
          onClick={() => handleToggle('monthly')}
          className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
            selected === 'monthly' ? 'text-black' : 'text-white/50 hover:text-white/70'
          }`}
        >
          Monthly
        </button>
        <button 
          onClick={() => handleToggle('weekly')}
          className={`relative z-10 px-7 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
            selected === 'weekly' ? 'text-black' : 'text-white/50 hover:text-white/70'
          }`}
        >
          Weekly
        </button>
      </div>
    </div>
  );
}
