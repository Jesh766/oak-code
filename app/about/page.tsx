import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Contact from '@/components/sections/Contact';
import SplitText from '@/components/ui/SplitText';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'About — Oak & Code', description: 'A small studio building for local businesses.' };

const timeline = [
  { year: '2026', title: 'The idea', text: 'Two developers, tired of watching local businesses get overcharged for templated websites.' },
  { year: '2026', title: 'Oak & Code founded', text: 'Started in Vadodara with one rule: you always talk to the person actually writing your code.' },
  { year: 'Now', title: 'First builds', text: 'Taking on our first client projects — direct, fixed-price, no account managers.' },
  { year: 'Next', title: "Where we're headed", text: 'Growing slowly, on purpose — one well-built site at a time.' },
];

const team = [
  { name: '[Founder 1 Name]', role: 'Developer & Co-founder', img: 'https://picsum.photos/seed/oakfounder1/500/600' },
  { name: '[Founder 2 Name]', role: 'Developer & Co-founder', img: 'https://picsum.photos/seed/oakfounder2/500/600' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative section-padding overflow-hidden">
          <div className="ambient-orbs">
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
          </div>
          <div className="container-custom max-w-4xl relative z-10">
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-6">About</p>
            <SplitText as="h1" trigger="mount" className="font-display text-4xl md:text-6xl text-white font-medium mb-10 leading-[1.05]">
              Two people, one studio, no middlemen.
            </SplitText>

            <ScrollReveal variant="fade-up" className="space-y-5 text-body max-w-2xl">
              <p>Oak &amp; Code is a small web studio based in Vadodara, Gujarat — [Founder 1] and [Founder 2] building websites and web apps for local businesses.</p>
              <p>We started this because small businesses usually get stuck between overpriced agencies pushing templated work, or a freelancer who disappears after launch. We wanted to do it differently: you talk directly to the person writing your code, get a fixed price up front, and a site you actually own when it&apos;s done.</p>
              <p>[Replace this paragraph with your real story — how you two met, what you were doing before this, why &quot;Oak &amp; Code.&quot;]</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-padding bg-forest/20 border-y border-gold/10">
          <div className="container-custom max-w-3xl">
            <ScrollReveal variant="fade-up">
              <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-4">How we got here</p>
            </ScrollReveal>
            <div className="mt-8 space-y-10">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.title} variant="fade-up" delay={i * 0.05}>
                  <div className="flex gap-6 border-l-2 border-gold/20 pl-6">
                    <span className="font-mono text-sm text-gold w-14 flex-shrink-0">{item.year}</span>
                    <div>
                      <h3 className="font-display text-xl text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-cream/60 max-w-md">{item.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <ScrollReveal variant="fade-up" className="text-center mb-14">
              <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase mb-4">The team</p>
              <h2 className="heading-lg text-white">Who you'll actually talk to</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 max-w-2xl mx-auto gap-8">
              {team.map((person, i) => (
                <ScrollReveal key={person.name} variant="mask" delay={i * 0.1}>
                  <div className="group relative rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/40 transition-colors" data-cursor-hover>
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
                    </div>
                    <div className="p-5 bg-forest/30">
                      <h3 className="font-display font-bold text-cream">{person.name}</h3>
                      <p className="text-xs font-mono text-gold/80 mt-1">{person.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}