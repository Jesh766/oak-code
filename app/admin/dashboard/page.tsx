'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoWithText } from '@/components/Logo';
import {
  Users,
  MessageSquare,
  FolderOpen,
  Mail,
  Settings,
  LogOut,
  BookOpen,
  Star,
} from 'lucide-react';
import Button from '@/components/ui/Button';

interface Stats {
  totalContacts: number;
  newContacts: number;
  totalProjects: number;
  totalSubscribers: number;
  recentContacts: Array<{
    id: string;
    name: string;
    email: string;
    city: string;
    status: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setStats)
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="text-gold animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Leads', value: stats?.totalContacts || 0, icon: Users, color: 'text-gold' },
    { label: 'New Messages', value: stats?.newContacts || 0, icon: MessageSquare, color: 'text-red-400' },
    { label: 'Projects', value: stats?.totalProjects || 0, icon: FolderOpen, color: 'text-green-400' },
    { label: 'Subscribers', value: stats?.totalSubscribers || 0, icon: Mail, color: 'text-blue-400' },
  ];

const navItems = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: Users,
  },
  {
    href: '/admin/contacts',
    label: 'Contacts',
    icon: MessageSquare,
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: FolderOpen,
  },
  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    icon: Star,
  },
  {
    href: '/admin/blog',
    label: 'Blog',
    icon: BookOpen,
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
];

  return (
    <div className="min-h-screen bg-primary-dark flex">
      <aside className="w-64 bg-forest/30 border-r border-gold/10 p-6 flex flex-col">
        <LogoWithText className="mb-8" />
        <nav className="space-y-2 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/70 hover:text-gold hover:bg-gold/10 transition-all"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-cream/50 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="font-display text-3xl font-bold text-cream mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-forest/30 border border-gold/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-cream/60">{label}</span>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="font-display text-3xl font-bold text-cream">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-forest/30 border border-gold/10 rounded-xl p-6">
          <h2 className="font-display text-xl font-bold text-cream mb-4">Recent Leads</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-cream/50 border-b border-gold/10">
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">City</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gold/5 text-cream/80">
                    <td className="py-3 px-2">{contact.name}</td>
                    <td className="py-3 px-2">{contact.email}</td>
                    <td className="py-3 px-2">{contact.city}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          contact.status === 'NEW'
                            ? 'bg-red-500/20 text-red-400'
                            : contact.status === 'READ'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {new Date(contact.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
