'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'mask' | 'scale';
  delay?: number;
}

export default function ScrollReveal({ children, className = '', variant = 'fade-up', delay = 0 }: ScrollRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const ctx = gsap.context(() => {
      if (variant === 'mask') {
        gsap.set(outer, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set(inner, { scale: 1.15 });
        gsap.to(outer, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut', delay, scrollTrigger: { trigger: outer, start: 'top 85%', once: true } });
        gsap.to(inner, { scale: 1, duration: 1.4, ease: 'power3.out', delay, scrollTrigger: { trigger: outer, start: 'top 85%', once: true } });
      } else if (variant === 'scale') {
        gsap.fromTo(outer, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay, scrollTrigger: { trigger: outer, start: 'top 85%', once: true } });
      } else {
        gsap.fromTo(outer, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay, scrollTrigger: { trigger: outer, start: 'top 88%', once: true } });
      }
    }, outer);

    return () => ctx.revert();
  }, [variant, delay]);

  if (variant === 'mask') {
    return (
      <div ref={outerRef} className={`overflow-hidden ${className}`}>
        <div ref={innerRef}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}