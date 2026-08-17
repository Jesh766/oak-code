'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = true,
  glow = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -8, transition: { duration: 0.3 } }
          : undefined
      }
      className={`bg-forest/50 border border-gold/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
        glow ? 'hover:border-gold/40 hover:shadow-gold' : 'hover:border-gold/20'
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
