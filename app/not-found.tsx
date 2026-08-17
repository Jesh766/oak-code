import Link from 'next/link';
import { LogoWithText } from '@/components/Logo';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-dark px-4 text-center">
      <LogoWithText className="mb-8" />
      <h1 className="font-display text-6xl font-bold text-gold mb-4">404</h1>
      <p className="text-cream/70 mb-8 max-w-md">
        This page doesn&apos;t exist — but great websites do. Let us build yours.
      </p>
      <Button href="/">Back to Home</Button>
    </div>
  );
}
