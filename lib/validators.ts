import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  city: z.string().min(2, 'City is required').max(100),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  budget: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  description: z.string().min(20, 'Please describe your project (min 20 characters)').max(2000),
  source: z.string().min(1, 'Please tell us how you found us'),
  fileUrl: z.string().optional(),
});

export const auditSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  website: z.string().url('Please enter a valid website URL'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const projectSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  category: z.string().min(1),
  description: z.string().min(10),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  results: z.string().min(10),
  techStack: z.array(z.string()),
  imageUrl: z.string().url(),
  mobileUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  city: z.string().min(2),
  avatar: z.string().url(),
  rating: z.number().min(1).max(5),
  content: z.string().min(20),
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(5),
  slug: z.string().min(5),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  category: z.string().min(1),
  author: z.string().min(2),
  authorAvatar: z.string().url(),
  readTime: z.number().min(1),
  imageUrl: z.string().url(),
  published: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type AuditFormData = z.infer<typeof auditSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
