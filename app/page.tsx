import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import ScrollProgress from '@/components/ui/ScrollProgress';
import StickyCTA, { WhatsAppFloat } from '@/components/ui/StickyCTA';
import CookieBanner from '@/components/ui/CookieBanner';
import BackToTop from '@/components/ui/BackToTop';
import AmbientOrbs from '@/components/ui/AmbientOrbs';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <section className="section-padding relative overflow-hidden text-center">
          <AmbientOrbs variant="subtle" />
          <div className="container-custom relative z-10 max-w-2xl mx-auto">
            <h2 className="heading-lg text-white mb-4">Ready to see what we&apos;d build for you?</h2>
            <p className="text-body mb-8">Look through some concept builds, or tell us about your project directly.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/work" size="lg">See our work</Button>
              <Button href="/contact" variant="outline" size="lg">Get a quote →</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppFloat />
      <CookieBanner />
      <BackToTop />
    </>
  );
}