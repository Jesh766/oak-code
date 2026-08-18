'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Users, Clock, Monitor } from 'lucide-react';

interface AnalyticsData {
  totalSessions: number;
  totalPageViews: number;
  avgDurationMs: number;
  topPages: { path: string; views: number }[];
  deviceBreakdown: { device: string; count: number }[];
  recentSessions: {
    id: string;
    visitorId: string;
    entryPage: string | null;
    exitPage: string | null;
    pageCount: number;
    deviceType: string;
    browser: string;
    referrer: string | null;
    startedAt: string;
    lastSeenAt: string;
  }[];
}

function formatDuration(ms: number) {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setData)
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center text-cream/60">
        Loading...
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-primary-dark p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-cream/60 hover:text-gold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>

        <h1 className="font-display text-3xl text-white font-bold mb-8">Visitor Analytics</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-forest/30 border border-gold/10 rounded-xl p-5">
            <Users className="w-5 h-5 text-gold mb-2" />
            <p className="text-2xl font-display font-bold text-white">{data.totalSessions}</p>
            <p className="text-xs text-cream/50">Total visitor sessions</p>
          </div>
          <div className="bg-forest/30 border border-gold/10 rounded-xl p-5">
            <Eye className="w-5 h-5 text-gold mb-2" />
            <p className="text-2xl font-display font-bold text-white">{data.totalPageViews}</p>
            <p className="text-xs text-cream/50">Total page views</p>
          </div>
          <div className="bg-forest/30 border border-gold/10 rounded-xl p-5">
            <Clock className="w-5 h-5 text-gold mb-2" />
            <p className="text-2xl font-display font-bold text-white">
              {formatDuration(data.avgDurationMs)}
            </p>
            <p className="text-xs text-cream/50">Avg. time on site</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-forest/30 border border-gold/10 rounded-xl p-5">
            <h3 className="font-display font-bold text-cream mb-4">Top pages</h3>
            <div className="space-y-2">
              {data.topPages.length === 0 && (
                <p className="text-sm text-cream/40">No page views yet.</p>
              )}
              {data.topPages.map((p) => (
                <div key={p.path} className="flex justify-between text-sm">
                  <span className="text-cream/70 font-mono">{p.path}</span>
                  <span className="text-gold">{p.views}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-forest/30 border border-gold/10 rounded-xl p-5">
            <h3 className="font-display font-bold text-cream mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4" /> Devices
            </h3>
            <div className="space-y-2">
              {data.deviceBreakdown.length === 0 && (
                <p className="text-sm text-cream/40">No sessions yet.</p>
              )}
              {data.deviceBreakdown.map((d) => (
                <div key={d.device} className="flex justify-between text-sm">
                  <span className="text-cream/70 capitalize">{d.device}</span>
                  <span className="text-gold">{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-forest/30 border border-gold/10 rounded-xl p-5 overflow-x-auto">
          <h3 className="font-display font-bold text-cream mb-4">Recent sessions</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-cream/40 border-b border-gold/10">
                <th className="pb-2 pr-4">Entry page</th>
                <th className="pb-2 pr-4">Pages viewed</th>
                <th className="pb-2 pr-4">Device</th>
                <th className="pb-2 pr-4">Referrer</th>
                <th className="pb-2">Started</th>
              </tr>
            </thead>
            <tbody>
              {data.recentSessions.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-cream/40">
                    No sessions recorded yet.
                  </td>
                </tr>
              )}
              {data.recentSessions.map((s) => (
                <tr key={s.id} className="border-b border-gold/5">
                  <td className="py-2 pr-4 text-cream/80 font-mono">{s.entryPage}</td>
                  <td className="py-2 pr-4 text-cream/60">{s.pageCount}</td>
                  <td className="py-2 pr-4 text-cream/60 capitalize">
                    {s.deviceType} · {s.browser}
                  </td>
                  <td className="py-2 pr-4 text-cream/60">{s.referrer || 'Direct'}</td>
                  <td className="py-2 text-cream/60">{new Date(s.startedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}