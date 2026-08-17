'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Oak & Code assistant. Ask me about our services, pricing, or process — or let me know if you'd like to talk to the team directly.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [handoffNotice, setHandoffNotice] = useState(false);
  const [handoffActive, setHandoffActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: 'user' as const, content: input.trim() }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, handoffActive }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
      if (data.handoff) {
        setHandoffNotice(true);
        setHandoffActive(true);
      }
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try the contact form below.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gold text-primary-dark flex items-center justify-center shadow-gold-lg"
        aria-label="Open chat"
        data-cursor-hover
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] max-w-sm h-[70vh] max-h-[520px] bg-primary-dark border border-gold/20 rounded-2xl shadow-card flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gold/10 bg-forest/30">
              <p className="font-display font-bold text-cream">Oak &amp; Code Assistant</p>
              <p className="text-xs text-cream/50 font-mono">Usually replies in seconds</p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gold text-primary-dark rounded-br-sm'
                        : 'bg-forest/50 text-cream rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-forest/50 text-cream/60 px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm">
                    Typing…
                  </div>
                </div>
              )}
              {handoffNotice && (
                <div className="text-center text-xs text-gold font-mono px-3 py-2 bg-gold/10 rounded-lg border border-gold/20">
                  We&apos;ve notified the team — expect to hear from us shortly.
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gold/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about services, pricing..."
                className="flex-1 bg-forest/30 border border-gold/10 rounded-full px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/40"
              />
              <button
                onClick={send}
                disabled={loading}
                className="w-10 h-10 flex-shrink-0 rounded-full bg-gold text-primary-dark flex items-center justify-center disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}