'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  readTime: number;
  imageUrl: string;
  createdAt: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    title: '7 Reasons Your Business Needs a Website in 2025',
    slug: '7-reasons-business-needs-website-2025',
    excerpt: 'Still relying on Instagram DMs and WhatsApp? Here is why a professional website is non-negotiable for Indian businesses in 2025.',
    category: 'Business',
    author: 'Arjun Oak',
    authorAvatar: 'https://picsum.photos/seed/arjun/100/100',
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/blog1/800/450',
    createdAt: '2025-07-15',
  },
  {
    id: '2',
    title: 'How We Built a Grocery App in 21 Days for ₹49,000',
    slug: 'grocery-app-21-days-case-study',
    excerpt: 'A behind-the-scenes look at how Oak & Code delivered FreshMart — from discovery call to App Store launch in just 3 weeks.',
    category: 'Case Study',
    author: 'Priya Code',
    authorAvatar: 'https://picsum.photos/seed/priyacode/100/100',
    readTime: 12,
    imageUrl: 'https://picsum.photos/seed/blog2/800/450',
    createdAt: '2025-07-01',
  },
  {
    id: '3',
    title: 'Next.js vs WordPress: Which is Right for Your Business?',
    slug: 'nextjs-vs-wordpress-comparison',
    excerpt: 'The definitive guide for Indian business owners choosing between modern frameworks and traditional CMS platforms.',
    category: 'Tech',
    author: 'Arjun Oak',
    authorAvatar: 'https://picsum.photos/seed/arjun/100/100',
    readTime: 10,
    imageUrl: 'https://picsum.photos/seed/blog3/800/450',
    createdAt: '2025-06-20',
  },
];

interface BlogProps {
  posts?: BlogPost[];
}

export default function Blog({ posts = defaultPosts }: BlogProps) {
  return (
    <section id="blog" className="section-padding bg-primary-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="badge-gold mb-4">Blog</span>
          <h2 className="heading-lg text-white mb-4">Insights & Ideas</h2>
          <p className="text-body max-w-2xl mx-auto">
            Practical advice for business owners who want to win online.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-forest/30 border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 badge-gold">{post.category}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-cream mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-cream/60 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-xs text-cream/70">{post.author}</p>
                      <p className="text-xs text-cream/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-cream/40">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-gold mt-4 hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
