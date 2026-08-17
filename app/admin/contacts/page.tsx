'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoWithText } from '@/components/Logo';
import { ArrowLeft } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  source: string;
  status: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setContacts)
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false));
  }, [router]);

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/contacts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const filtered = filter
    ? contacts.filter((c) => c.status === filter)
    : contacts;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="text-gold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-cream">
            Contacts ({filtered.length})
          </h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-forest/50 border border-gold/20 rounded-lg text-cream text-sm"
          >
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="READ">Read</option>
            <option value="REPLIED">Replied</option>
          </select>
        </div>

        <div className="space-y-4">
          {filtered.map((contact) => (
            <div
              key={contact.id}
              className="bg-forest/30 border border-gold/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-cream text-lg">{contact.name}</h3>
                  <p className="text-sm text-cream/60">
                    {contact.email} · {contact.phone} · {contact.city}
                  </p>
                </div>
                <select
                  value={contact.status}
                  onChange={(e) => updateStatus(contact.id, e.target.value)}
                  className="px-3 py-1 bg-primary-dark border border-gold/20 rounded-lg text-sm text-cream"
                >
                  <option value="NEW">New</option>
                  <option value="READ">Read</option>
                  <option value="REPLIED">Replied</option>
                </select>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <span className="text-cream/50">Services:</span>{' '}
                  <span className="text-cream/80">{contact.services.join(', ')}</span>
                </div>
                <div>
                  <span className="text-cream/50">Budget:</span>{' '}
                  <span className="text-cream/80">{contact.budget}</span>
                </div>
                <div>
                  <span className="text-cream/50">Timeline:</span>{' '}
                  <span className="text-cream/80">{contact.timeline}</span>
                </div>
              </div>
              <p className="text-sm text-cream/70 bg-primary-dark/50 rounded-lg p-3">
                {contact.description}
              </p>
              <p className="text-xs text-cream/40 mt-2">
                {new Date(contact.createdAt).toLocaleString('en-IN')} · via {contact.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
