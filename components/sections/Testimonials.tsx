'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  content: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1', name: 'Rahul Mehta', role: 'Restaurant Owner', city: 'Vadodara',
    avatar: 'https://picsum.photos/seed/rahul/100/100', rating: 5,
    content: 'Oak & Code transformed our café completely. Online orders tripled within the first month, and the WhatsApp integration saves our staff hours every day. Best investment we made for our business.',
  },
  {
    id: '2', name: 'Priya Shah', role: 'Boutique Owner', city: 'Surat',
    avatar: 'https://picsum.photos/seed/priya/100/100', rating: 5,
    content: 'My Instagram traffic finally converts! The e-commerce site they built is gorgeous and loads in under 2 seconds. Sales went up 60% and customers constantly compliment our online store.',
  },
  {
    id: '3', name: 'Dr. Anjali Patel', role: 'Dentist', city: 'Ahmedabad',
    avatar: 'https://picsum.photos/seed/anjali/100/100', rating: 5,
    content: 'Appointment bookings doubled after launching our new website. The online booking system is seamless, and patients love being able to schedule visits at midnight. Professional team, delivered on time.',
  },
  {
    id: '4', name: 'Rohan Desai', role: 'Startup Founder', city: 'Mumbai',
    avatar: 'https://picsum.photos/seed/rohan/100/100', rating: 5,
    content: 'We needed an investor-ready website in 2 weeks. Oak & Code delivered a stunning product that helped us close our seed round. The team understood our vision perfectly and executed flawlessly.',
  },
  {
    id: '5', name: 'Neha Joshi', role: 'Yoga Studio Owner', city: 'Baroda',
    avatar: 'https://picsum.photos/seed/neha/100/100', rating: 5,
    content: 'WhatsApp inquiries increased 5x after our new website launched. The class booking system and beautiful design attract exactly the clientele we wanted. Could not recommend them more highly.',
  },
  {
    id: '6', name: 'Karan Singh', role: 'Real Estate Developer', city: 'Rajkot',
    avatar: 'https://picsum.photos/seed/karan/100/100', rating: 5,
    content: 'Our property showcase website with virtual tours generated ₹3Cr in leads within 3 months. Oak & Code understood luxury real estate marketing better than agencies charging 3x their price.',
  },
  {
    id: '7', name: 'Meera Desai', role: 'CA Firm Partner', city: 'Gandhinagar',
    avatar: 'https://picsum.photos/seed/meera/100/100', rating: 5,
    content: 'Professional, secure, and exactly what our firm needed. Client portal integration saved us 15 hours per week. Fixed pricing with no surprises — refreshing in this industry.',
  },
  {
    id: '8', name: 'Vikram Thakkar', role: 'Manufacturing CEO', city: 'Anand',
    avatar: 'https://picsum.photos/seed/vikram/100/100', rating: 5,
    content: 'B2B website that actually generates leads. Our export inquiries increased 180% after launch. The SEO work they did ranks us #1 for our key product terms in Gujarat.',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-forest/40 border border-gold/10 rounded-2xl p-6 mx-3">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>
      <p className="text-sm text-cream/80 leading-relaxed mb-4 line-clamp-4">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-cream text-sm">{testimonial.name}</p>
          <p className="text-xs text-cream/50">
            {testimonial.role}, {testimonial.city}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <section className="section-padding bg-forest/20 overflow-hidden">
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="badge-gold mb-4">Testimonials</span>
          <h2 className="heading-lg text-white mb-4">Real Clients. Real Results.</h2>
          <p className="text-body max-w-2xl mx-auto">
            Don&apos;t take our word for it — hear from businesses we&apos;ve helped grow.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <div className="flex animate-marquee">
          {doubled1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
        <div className="flex animate-marquee-reverse">
          {doubled2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
