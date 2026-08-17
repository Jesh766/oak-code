'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminTestimonialsPage() {
  return (
    <div className="min-h-screen bg-primary-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="font-display text-3xl font-bold text-cream mb-4">Testimonials</h1>
        <p className="text-cream/60 mb-8">
          Manage client testimonials. Use Prisma Studio (<code className="text-gold">npm run db:studio</code>) or update the seed file for bulk changes.
        </p>
        <div className="bg-forest/30 border border-gold/10 rounded-xl p-6">
          <p className="text-cream/70 text-sm">
            8 testimonials are seeded by default. To add/edit testimonials, run{' '}
            <code className="text-gold">npx prisma studio</code> and navigate to the Testimonial table.
          </p>
        </div>
      </div>
    </div>
  );
}
