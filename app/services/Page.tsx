import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';
import SplitText from '@/components/ui/SplitText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

export const metadata = {
  title: 'Services — Oak & Code',
  description: 'Websites, apps, and ongoing care for local businesses.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative section-padding overflow-hidden">
          <AmbientOrbs />
          <div className="container-custom max-w-4xl relative z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">Services</p>
            <SplitText
              as="h1"
              trigger="mount"
              className="font-display text-4xl md:text-6xl text-white font-medium mb-10 leading-[1.05]"
            >
              Everything you need to get online, done properly.
            </SplitText>
            <ScrollReveal variant="fade-up" className="max-w-2xl">
              <p className="text-body">
                Whether it&apos;s a first website, a working app, or keeping an existing site
                running — here&apos;s exactly what we build and how the process works.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}