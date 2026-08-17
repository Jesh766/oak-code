'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);

    let x = 0, y = 0, curX = 0, curY = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener('pointermove', move);

    let raf: number;
    const tick = () => {
      curX += (x - curX) * 0.18;
      curY += (y - curY) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e: Event) => (e.target as HTMLElement).closest('a, button, [data-cursor-hover]') && setHovering(true);
    const onOut = (e: Event) => (e.target as HTMLElement).closest('a, button, [data-cursor-hover]') && setHovering(false);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference bg-cream transition-[width,height] duration-200 ease-out"
      style={{ width: hovering ? 48 : 10, height: hovering ? 48 : 10 }}
    />
  );
}