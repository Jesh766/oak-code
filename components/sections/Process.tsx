'use client';

import { motion } from 'framer-motion';
import { processSteps } from '@/lib/constants';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

export default function Process() {
  return (
    <section className="section-padding bg-forest/20 relative overflow-hidden">
      <AmbientOrbs variant="subtle" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4">Our Process</span>
          <h2 className="heading-lg text-white mb-4">
            How We Work — Simple, Transparent, Fast
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            No black boxes, no endless revisions — a clear process from first call to launch.
          </p>
        </motion.div>

        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gold/20" />
          <div className="grid grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gold text-primary-dark font-display font-bold text-xl rounded-full relative z-10 border-4 border-primary-dark">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-cream mb-1">{step.title}</h3>
                <p className="text-xs text-gold mb-2">{step.day}</p>
                <p className="text-sm text-cream/60 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gold text-primary-dark font-display font-bold rounded-full">
                {step.step}
              </div>
              <div>
                <h3 className="font-display font-bold text-cream">{step.title}</h3>
                <p className="text-xs text-gold mb-1">{step.day}</p>
                <p className="text-sm text-cream/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}