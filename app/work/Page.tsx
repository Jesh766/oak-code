import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import SplitText from '@/components/ui/SplitText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

export const metadata = {
  title: 'Work — Oak & Code',
  description: 'A look at what we build.',
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative section-padding overflow-hidden">
          <AmbientOrbs />
          <div className="container-custom max-w-4xl relative z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">Work</p>
            <SplitText
              as="h1"
              trigger="mount"
              className="font-display text-4xl md:text-6xl text-white font-medium mb-10 leading-[1.05]"
            >
              A few builds, and the thinking behind them.
            </SplitText>
            <ScrollReveal variant="fade-up" className="max-w-2xl">
              <p className="text-body">
                We&apos;re a new studio, so what&apos;s below is concept work — a preview of how
                we approach real problems for real businesses. Real client projects join this page
                as they ship.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}