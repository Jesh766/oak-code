'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1B3A1B',
            color: '#F5EFE0',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
          success: {
            iconTheme: { primary: '#D4AF37', secondary: '#0D1F0D' },
          },
        }}
      />
    </ThemeProvider>
  );
}
