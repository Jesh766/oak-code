'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import AmbientOrbs from '@/components/ui/AmbientOrbs';

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  techStack: string[];
  imageUrl: string;
  mobileUrl?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
}

const fallbackProjects: Project[] = [
  {
    id: '1', name: 'Corner Café — concept', slug: 'corner-cafe', category: 'Websites',
    description: 'A restaurant site concept with menu, hours, and online ordering.',
    challenge: 'Small restaurants losing orders to third-party delivery apps taking a cut.',
    solution: 'Direct online ordering with WhatsApp order notifications, no commission.',
    results: 'Demonstrates a full ordering flow from menu to confirmation, mobile-first.',
    techStack: ['Next.js', 'WhatsApp API'],
    imageUrl: 'https://picsum.photos/seed/oakcafe/800/600',
    demoUrl: '#',
  },
  {
    id: '2', name: 'FitBook — concept', slug: 'fitbook', category: 'Mobile Apps',
    description: 'A booking app concept for gyms and studios.',
    challenge: 'Small fitness studios managing class bookings through spreadsheets and DMs.',
    solution: 'A simple booking flow with class schedules and waitlists.',
    results: 'Demonstrates account creation, booking, and reminder notifications.',
    techStack: ['React Native', 'Firebase'],
    imageUrl: 'https://picsum.photos/seed/oakfit/800/600',
    mobileUrl: 'https://picsum.photos/seed/oakfit-mobile/400/800',
  },
  {
    id: '3', name: 'StyleRow — concept', slug: 'stylerow', category: 'E-Commerce',
    description: 'A boutique storefront concept with a lookbook-style layout.',
    challenge: "Small retailers needing an online store that doesn't feel like a generic template.",
    solution: 'A custom storefront with a gallery-first layout and simple checkout.',
    results: 'Demonstrates product browsing, filtering, and a streamlined checkout.',
    techStack: ['Next.js', 'Stripe'],
    imageUrl: 'https://picsum.photos/seed/oakstyle/800/600',
    demoUrl: '#',
  },
  {
    id: '4', name: 'Oak & Code', slug: 'oak-and-code', category: 'Websites',
    description: "This site — our own studio's homepage, built the same way we'd build yours.",
    challenge: 'A new studio needing a site that shows craft, not just claims.',
    solution: 'A working, hand-built site with a real contact flow and no filler content.',
    results: "What you're looking at right now.",
    techStack: ['Next.js', 'Tailwind', 'Prisma'],
    imageUrl: 'https://picsum.photos/seed/oakhome/800/600',
    demoUrl: '#',
  },
];

const filters = ['All', 'Websites', 'Mobile Apps', 'E-Commerce'];

interface PortfolioProps {
  projects?: Project[];
}

export default function Portfolio({ projects = fallbackProjects }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
<section id="portfolio" className="section-padding bg-primary-dark relative overflow-hidden">
  <AmbientOrbs variant="subtle" />      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-gold mb-4">Work</span>
          <h2 className="heading-lg text-white mb-4">A few concept builds</h2>
          <p className="text-body max-w-2xl mx-auto">
            We&apos;re a new studio — these are concept pieces showing how we build. Real client work will replace these as projects ship.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gold text-primary-dark'
                  : 'bg-forest/50 text-cream/70 hover:text-gold border border-gold/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/30 transition-all"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
                <div className="absolute inset-0 bg-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm">View Details</Button>
                </div>
              </div>
              <div className="p-5 bg-forest/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-cream">{project.name}</h3>
                  <span className="badge-gold text-xs">{project.category}</span>
                </div>
                <p className="text-sm text-cream/60 mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-primary-dark/50 rounded text-xs font-mono text-gold/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="badge-gold">{selectedProject.category}</span>
              <p className="text-cream/80 mt-4">{selectedProject.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-forest/30 rounded-xl p-4">
                <h4 className="text-gold font-semibold mb-2 text-sm">Challenge</h4>
                <p className="text-sm text-cream/70">{selectedProject.challenge}</p>
              </div>
              <div className="bg-forest/30 rounded-xl p-4">
                <h4 className="text-gold font-semibold mb-2 text-sm">Solution</h4>
                <p className="text-sm text-cream/70">{selectedProject.solution}</p>
              </div>
              <div className="bg-gold/10 border border-gold/20 rounded-xl p-4">
                <h4 className="text-gold font-semibold mb-2 text-sm">Highlights</h4>
                <p className="text-sm text-cream/70">{selectedProject.results}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary-dark rounded-full text-xs font-mono text-gold">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {selectedProject.demoUrl && (
                <Button href={selectedProject.demoUrl} size="sm">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </Button>
              )}
              {selectedProject.githubUrl && (
                <Button href={selectedProject.githubUrl} variant="outline" size="sm">
                  <Github className="w-4 h-4" /> GitHub
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}