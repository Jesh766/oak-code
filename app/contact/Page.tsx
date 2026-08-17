import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contact from '@/components/sections/Contact';
import SplitText from '@/components/ui/SplitText';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

export const metadata = {
  title: 'Contact — Oak & Code',
  description: 'Tell us about your project.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative pt-8 pb-4 overflow-hidden">
          <AmbientOrbs variant="subtle" />
          <div className="container-custom max-w-3xl relative z-10 text-center">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">Contact</p>
            <SplitText
              as="h1"
              trigger="mount"
              className="font-display text-4xl md:text-5xl text-white font-medium leading-[1.05]"
            >
              Let&apos;s build something worth talking about.
            </SplitText>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}