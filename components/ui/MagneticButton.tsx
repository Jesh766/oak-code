'use client';

import { useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className = '', strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
  };

  const handleLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}