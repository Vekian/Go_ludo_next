import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'go-ludo-backend.cda4.garage404.com',
        pathname: '/images/**',
      },
    ],
  },
};

// Ajouter la ligne pour ignorer les erreurs SSL auto-signées (en dev uniquement)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default nextConfig;
