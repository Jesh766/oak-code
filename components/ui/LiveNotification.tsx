'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { liveNotifications } from '@/lib/constants';

export default function LiveNotification() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
      setCurrent((prev) => (prev + 1) % liveNotifications.length);
    };

    const initialDelay = setTimeout(showNotification, 8000);
    const interval = setInterval(showNotification, 35000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const notification = liveNotifications[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 left-4 z-50 max-w-xs"
        >
          <div className="bg-forest border border-gold/20 rounded-xl p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="text-lg">🔔</span>
              <div>
                <p className="text-sm text-cream leading-snug">
                  <strong className="text-gold">{notification.name}</strong> from{' '}
                  <strong>{notification.city}</strong> {notification.action}
                </p>
                <p className="text-xs text-cream/50 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
