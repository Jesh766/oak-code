'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { whyUsPoints } from '@/lib/constants';

const comparison = [
  { feature: 'Delivery Time', us: '7–21 days', them: '2–6 months' },
  { feature: 'Pricing', us: 'Fixed, transparent', them: 'Hidden costs' },
  { feature: 'Support', us: '1 year free', them: 'Paid add-on' },
  { feature: 'Project Manager', us: 'Dedicated', them: 'Shared/None' },
  { feature: 'SEO Included', us: 'Yes, day one', them: 'Extra charge' },
  { feature: 'Money Back', us: '100% guarantee', them: 'No guarantee' },
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
              Why 200+ Businesses Choose Oak & Code Over Others
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
            className="bg-primary-dark border border-gold/20 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-3 bg-forest/50 border-b border-gold/10">
              <div className="p-4 text-sm font-semibold text-cream/60">Feature</div>
              <div className="p-4 text-sm font-semibold text-gold text-center border-x border-gold/10">
                Oak & Code
              </div>
              <div className="p-4 text-sm font-semibold text-cream/40 text-center">
                Other Agencies
              </div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-forest/20' : ''}`}
              >
                <div className="p-4 text-sm text-cream/70">{row.feature}</div>
                <div className="p-4 text-sm text-gold font-medium text-center border-x border-gold/10 flex items-center justify-center gap-1">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  {row.us}
                </div>
                <div className="p-4 text-sm text-cream/40 text-center flex items-center justify-center gap-1">
                  <X className="w-4 h-4 flex-shrink-0 text-red-400/60" />
                  {row.them}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
