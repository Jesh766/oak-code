'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface PricingPlan {
  id: string;
  name: string;
  slug: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular: boolean;
  cta: string;
}

const defaultPlans: PricingPlan[] = [
  {
    id: '1', name: 'Starter', slug: 'starter',
    monthlyPrice: 14999, yearlyPrice: 143990,
    features: [
      'Business Website (up to 5 pages)',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      '3 Months Support',
      'Delivery in 7 days',
    ],
    popular: false, cta: 'Get Started',
  },
  {
    id: '2', name: 'Professional', slug: 'professional',
    monthlyPrice: 34999, yearlyPrice: 335990,
    features: [
      'Everything in Starter',
      'Up to 15 pages',
      'CMS Integration',
      'Advanced SEO Package',
      'Google Analytics Setup',
      '6 Months Priority Support',
      'Priority Delivery in 14 days',
    ],
    popular: true, cta: 'Start My Project',
  },
  {
    id: '3', name: 'Enterprise', slug: 'enterprise',
    monthlyPrice: 0, yearlyPrice: 0,
    features: [
      'Custom Web/App Development',
      'Dedicated Development Team',
      'Full Branding Package',
      'API Integrations',
      '1 Year Premium Support',
      'SLA Agreement',
    ],
    popular: false, cta: 'Talk to Us',
  },
];

function formatPrice(amount: number): string {
  if (amount === 0) return 'Custom';
  return `₹${amount.toLocaleString('en-IN')}`;
}

interface PricingProps {
  plans?: PricingPlan[];
  countdownEndDate?: string;
}

export default function Pricing({
  plans = defaultPlans,
  countdownEndDate,
}: PricingProps) {
  const [yearly, setYearly] = useState(false);
  const endDate = countdownEndDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <section id="pricing" className="section-padding bg-primary-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-gold mb-4">Pricing</span>
          <h2 className="heading-lg text-white mb-4">Simple Pricing. No Surprises.</h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Free consultation. No contracts. Cancel anytime.
          </p>

          <div className="inline-flex items-center gap-3 bg-forest/50 rounded-full p-1 border border-gold/20">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !yearly ? 'bg-gold text-primary-dark' : 'text-cream/70'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                yearly ? 'bg-gold text-primary-dark' : 'text-cream/70'
              }`}
            >
              Yearly
              <span className="text-xs bg-primary-dark/20 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-gold text-primary-dark text-xs font-bold rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <Card
                className={`h-full ${plan.popular ? 'border-gold/40 shadow-gold' : ''}`}
                glow={plan.popular}
              >
                <h3 className="font-display text-xl font-bold text-cream mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-gold">
                    {formatPrice(yearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-cream/50 text-sm">/{yearly ? 'year' : 'mo'}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-cream/70">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  href="#contact"
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  pulse={plan.popular}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div>
            <p className="text-cream/70 mb-4">
              ⏰ Current pricing valid for only:
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-cream/70">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <span>
              🔒 <strong className="text-gold">100% Money Back Guarantee</strong> — Not happy? Full
              refund, no questions.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div key={badge.label} className="flex items-center gap-2 text-sm text-cream/50">
                <span className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-full text-gold text-xs">
                  ✓
                </span>
                {badge.label}
              </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
