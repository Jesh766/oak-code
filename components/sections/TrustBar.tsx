'use client';

import { clientLogos } from '@/lib/constants';

export default function TrustBar() {
  const doubledLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-8 border-y border-gold/10 bg-forest/30 overflow-hidden">
      <div className="mb-6 text-center">
        <p className="text-xs text-cream/40 uppercase tracking-widest mb-4">
          Trusted by leading businesses
        </p>
      </div>

      <div className="relative overflow-hidden mb-8">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubledLogos.map((logo, i) => (
            <span
              key={i}
              className="mx-8 text-lg font-display font-semibold text-cream/30 hover:text-gold/50 transition-colors"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <p className="text-sm text-cream/40 uppercase tracking-widest whitespace-nowrap">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { name: 'Gujarat Samachar', color: '#E63946' },
              { name: 'StartupIndia', color: '#FF6B35' },
              { name: 'YourStory', color: '#D4AF37' },
            ].map((pub) => (
              <div key={pub.name} className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill={pub.color}>
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.08 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
                </svg>
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: pub.color }}
                >
                  {pub.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
