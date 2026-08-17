'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date | string;
  className?: string;
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(endDate).getTime();

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-primary-dark border border-gold/30 rounded-xl">
            <span className="font-mono text-xl md:text-2xl font-bold text-gold">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-cream/60 mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
