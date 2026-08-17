'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { auditSchema, AuditFormData } from '@/lib/validators';
import { useUIStore } from '@/lib/store';
import Button from './Button';
import toast from 'react-hot-toast';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { exitIntentShown, setExitIntentShown } = useUIStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
  });

  useEffect(() => {
    if (exitIntentShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown) {
        setIsOpen(true);
        setExitIntentShown(true);
      }
    };

    let inactivityTimer: NodeJS.Timeout;
    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!exitIntentShown) {
          setIsOpen(true);
          setExitIntentShown(true);
        }
      }, 40000);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchstart', resetInactivity);
    document.addEventListener('scroll', resetInactivity);
    resetInactivity();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchstart', resetInactivity);
      document.removeEventListener('scroll', resetInactivity);
      clearTimeout(inactivityTimer);
    };
  }, [exitIntentShown, setExitIntentShown]);

  const onSubmit = async (data: AuditFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Your free audit request has been submitted!');
        reset();
        setIsOpen(false);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-primary-dark border-2 border-gold/30 rounded-2xl p-8 shadow-gold-lg"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gold/10 text-cream/60 hover:text-gold"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-4">
                <Gift className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-bold text-cream mb-2">
                Wait! Before you go…
              </h2>
              <p className="text-cream/70">
                Get a <span className="text-gold font-semibold">FREE Website Audit</span> worth{' '}
                <span className="text-gold font-semibold">₹5,000</span>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('name')}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-forest/50 border border-gold/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-forest/50 border border-gold/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register('website')}
                  placeholder="Your Website URL"
                  className="w-full px-4 py-3 bg-forest/50 border border-gold/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
                />
                {errors.website && (
                  <p className="text-red-400 text-xs mt-1">{errors.website.message}</p>
                )}
              </div>
              <Button type="submit" loading={loading} className="w-full" pulse>
                Send My Free Audit
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
