'use client';

import { useUIStore } from '@/lib/store';
import Button from './Button';
import { Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const { cookieAccepted, setCookieAccepted } = useUIStore();

  if (cookieAccepted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[90] p-4"
      >
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-forest border border-gold/20 rounded-xl p-4 md:p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <Cookie className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-cream/80">
                We use cookies to improve your experience and analyze site traffic. By continuing,
                you agree to our use of cookies.{' '}
                <a href="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCookieAccepted(true)}
              >
                Decline
              </Button>
              <Button size="sm" onClick={() => setCookieAccepted(true)}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
