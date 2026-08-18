'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { whyUsPoints } from '@/lib/constants';

const included = [
  'A fixed price, agreed before any work starts',
  'Direct contact with the person actually building your site',
  'Real cross-device testing before launch',
  'Support after launch, on agreed terms',
];

export default function WhyUs() {
  return (
    <section id="about" className="section-padding bg-forest/20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-gold mb-4">Why Choose Us</span>
            <h2 className="heading-lg text-white mb-6">
              Why local businesses work with us directly
            </h2>
            <ul className="space-y-4">
              {whyUsPoints.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gold/10 rounded-full mt-0.5">
                    <Check className="w-4 h-4 text-gold" />
                  </span>
                  <span className="text-cream/80">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-dark border border-gold/20 rounded-2xl overflow-hidden p-8"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">
              What's included
            </p>
            <ul className="space-y-5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-cream/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}