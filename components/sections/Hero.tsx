'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-dark-gradient" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(243,239,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,239,230,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <AmbientOrbs />

      <div className="container-custom relative z-10 px-4 md:px-8 py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-8"
        >
          Web &amp; App Studio — Vadodara, Gujarat
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-white font-medium leading-[0.98] mb-8"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)' }}
        >
          We build the web
          <br />
          your business <span className="text-gold">deserves.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-body max-w-xl mb-10"
        >
          Oak &amp; Code is a small studio building fast, clean websites and web apps for
          local businesses — designed properly, built by hand, no templates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <Button href="#contact" size="lg">Start a project →</Button>
          <Button href="#portfolio" variant="outline" size="lg">See our work</Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="block w-px h-8 bg-cream/30"
        />
      </motion.div>
    </section>
  );
}