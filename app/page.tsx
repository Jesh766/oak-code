import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import Contact from '@/components/sections/Contact';
import ScrollProgress from '@/components/ui/ScrollProgress';
import StickyCTA, { WhatsAppFloat } from '@/components/ui/StickyCTA';
import CookieBanner from '@/components/ui/CookieBanner';
import BackToTop from '@/components/ui/BackToTop';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <WhatsAppFloat />
      <CookieBanner />
      <BackToTop />
    </>
  );
}