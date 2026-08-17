'use client';
import AmbientOrbs from '@/components/ui/AmbientOrbs';
import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Palette,
  ShoppingCart,
  Code2,
  TrendingUp,
  Sparkles,
  Shield,
  ArrowRight,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { services } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Palette,
  ShoppingCart,
  Code2,
  TrendingUp,
  Sparkles,
  Shield,
};

export default function Services() {
  return (
<section id="services" className="section-padding bg-primary-dark relative overflow-hidden">
  <AmbientOrbs variant="subtle" />      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge-gold mb-4">Our Services</span>
          <h2 className="heading-lg text-white mb-4">What We Build For You</h2>
          <p className="text-body max-w-2xl mx-auto">
            From concept to launch, we deliver end-to-end digital solutions that drive
            real business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card glow className="h-full group cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-xl mb-4 group-hover:bg-gold/20 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-cream mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-cream/60 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href={service.href}
                    className="inline-flex items-center gap-1 text-sm text-gold hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
