'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  techStack: string[];
  featured: boolean;
}

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(setProjects)
      .catch(() => router.push('/admin'))
      .finally(() => setLoading(false));
  }, [router]);

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Project deleted');
    }
  };

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
            Projects ({projects.length})
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-forest/30 border border-gold/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-cream">{project.name}</h3>
                  <span className="badge-gold text-xs mt-1 inline-block">
                    {project.category}
                  </span>
                </div>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-cream/60 mt-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-primary-dark rounded text-xs font-mono text-gold/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
