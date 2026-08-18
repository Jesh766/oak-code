import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import { siteConfig, faqSchema } from '@/lib/constants';
import ChatWidget from '@/components/ChatWidget';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oak & Code — Web & App Development Agency in Vadodara, Gujarat',
  description: siteConfig.description,
  keywords: [
    'web development',
    'app development',
    'Vadodara',
    'Gujarat',
    'website design',
    'mobile app',
    'e-commerce',
    'SEO',
  ],
  authors: [{ name: 'Oak & Code' }],
  creator: 'Oak & Code',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    title: 'Oak & Code — Web & App Development Agency',
    description: siteConfig.description,
    siteName: 'Oak & Code',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Oak & Code',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oak & Code — Web & App Development Agency',
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.url}/#business`,
      name: 'Oak & Code',
      description: siteConfig.description,
      url: siteConfig.url,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
      priceRange: '₹₹',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'Oak & Code',
      publisher: {
        '@id': `${siteConfig.url}/#business`,
      },
    },
    {
      '@type': 'Service',
      name: 'Web & App Development',
      provider: {
        '@id': `${siteConfig.url}/#business`,
      },
      areaServed: 'India',
      description: 'Professional web and mobile app development services',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqSchema.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body>
        {/* Anonymous visitor analytics */}
        <AnalyticsTracker />

        <div className="grain-overlay" />

        <SmoothScroll>
          <Providers>{children}</Providers>
        </SmoothScroll>

        <CustomCursor />

        <ChatWidget />
      </body>
    </html>
  );
}