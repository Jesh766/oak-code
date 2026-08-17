'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validators';
import { LogoWithText } from '@/components/Logo';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Welcome back!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <LogoWithText className="justify-center mb-4" />
          <h1 className="font-display text-2xl font-bold text-cream">Admin Login</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-forest/30 border border-gold/20 rounded-2xl p-8 space-y-4"
        >
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-primary-dark border border-gold/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-primary-dark border border-gold/20 rounded-lg text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
