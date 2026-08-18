'use client';

import Link from 'next/link';
import { LogoWithText } from '@/components/Logo';
import { siteConfig } from '@/lib/constants';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const footerLinks = {
  Services: [
    { label: 'Website Development', href: '/services' },
    { label: 'Mobile Apps', href: '/services' },
    { label: 'E-Commerce', href: '/services' },
    { label: 'UI/UX Design', href: '/services' },
  ],
  Work: [{ label: 'All Projects', href: '/work' }],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/services' },
    { label: 'Pricing', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-gold/10">
      <div className="container-custom section-padding pb-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand / Contact */}
          <div className="lg:col-span-2">
            <LogoWithText className="mb-4" />

            <p className="text-cream/60 text-sm mb-6 max-w-xs">
              {siteConfig.tagline}
            </p>

            <div className="space-y-2 text-sm text-cream/60">

              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.email}
              </a>

              {/* Phone */}
            <a
  href={`tel:${siteConfig.phone}`}
  onClick={() => {
    const sessionId = localStorage.getItem('oak_session_id');

    if (sessionId) {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          name: 'phone_click',
          path: window.location.pathname,
        }),
      }).catch((error) => {
        console.error(
          '[Analytics] Failed to track phone click:',
          error
        );
      });
    }
  }}
  className="flex items-center gap-2 hover:text-gold transition-colors"
>
  <Phone className="w-4 h-4" />
  {siteConfig.phone}
</a>

              {/* Address */}
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {siteConfig.address}
              </span>

            </div>
          </div>

          {/* Footer Link Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-cream mb-4">
                {title}
              </h4>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gold/10">

          {/* Copyright */}
          <p className="text-sm text-cream/50">
            © 2026 Oak & Code. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">

            {/* Instagram + LinkedIn */}
            {[
              {
                icon: Instagram,
                href: siteConfig.social.instagram,
                label: 'Instagram',
              },
              {
                icon: Linkedin,
                href: siteConfig.social.linkedin,
                label: 'LinkedIn',
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-forest/50 text-cream/60 hover:text-gold hover:bg-gold/10 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            {/* WhatsApp */}
          <a
  href={siteConfig.social.whatsapp}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp"
  onClick={() => {
    const sessionId = localStorage.getItem('oak_session_id');

    if (sessionId) {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          name: 'whatsapp_click',
          path: window.location.pathname,
        }),
      }).catch((error) => {
        console.error(
          '[Analytics] Failed to track WhatsApp click:',
          error
        );
      });
    }
  }}
  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-all"
>
  <FaWhatsapp className="w-4 h-4" />
</a>

          </div>

          {/* Location */}
          <p className="text-sm text-cream/50">
            Made with ❤️ in Vadodara, India
          </p>

        </div>

      </div>
    </footer>
  );
}