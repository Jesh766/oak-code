'use client';

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-gold/10 bg-forest/30">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-center">
          <p className="text-xs text-cream/40 uppercase tracking-[0.2em]">
            Built for local businesses
          </p>

          <div className="hidden md:block w-px h-5 bg-gold/20" />

          <p className="text-sm text-cream/50">
            Websites • Web Apps • Mobile Apps • Custom Software
          </p>
        </div>
      </div>
    </section>
  );
}