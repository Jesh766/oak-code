'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  trigger?: 'mount' | 'scroll';
  delay?: number;
}

export default function SplitText({ children, as: Tag = 'h2', className = '', trigger = 'scroll', delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = children.split(' ');
    el.innerHTML = words
      .map((w) => `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="split-piece" style="display:inline-block;">${w}&nbsp;</span></span>`)
      .join('');

    const items = el.querySelectorAll<HTMLElement>('.split-piece');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.035,
          delay,
          scrollTrigger: trigger === 'scroll' ? { trigger: el, start: 'top 85%', once: true } : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [children, trigger, delay]);

  return <Tag ref={ref as any} className={className}>{children}</Tag>;
}