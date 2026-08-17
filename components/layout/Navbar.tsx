'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LogoWithText } from '@/components/Logo';
import Button from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 glass shadow-lg border-b border-gold/10' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex-shrink-0">
            <LogoWithText />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  pathname === link.href ? 'text-gold' : 'text-cream/70 hover:text-cream'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" size="md">Get a quote</Button>
          </div>

          <button className="lg:hidden p-2 text-cream" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="absolute top-0 left-0 right-0 bg-primary-dark border-b border-gold/20 pt-24 pb-8 px-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-cream hover:text-gold py-2 border-b border-gold/10 block">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <Button href="/contact" className="mt-4 w-full" onClick={() => setMobileOpen(false)}>Get a quote</Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}