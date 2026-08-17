'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminBlogPage() {
  return (
    <div className="min-h-screen bg-primary-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="font-display text-3xl font-bold text-cream mb-4">Blog Posts</h1>
        <p className="text-cream/60 mb-8">
          Manage blog content. Use Prisma Studio for editing posts or update via the seed file.
        </p>
        <div className="bg-forest/30 border border-gold/10 rounded-xl p-6">
          <p className="text-cream/70 text-sm">
            3 blog posts are seeded by default. To add/edit posts, run{' '}
            <code className="text-gold">npx prisma studio</code> and navigate to the BlogPost table.
          </p>
        </div>
      </div>
    </div>
  );
}
