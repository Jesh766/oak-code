import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oak & Code',
    short_name: 'Oak & Code',
    description: 'Web & App Development Agency in Vadodara, Gujarat',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1F0D',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
  };
}
