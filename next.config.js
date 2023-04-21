/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },

      {
        protocol: 'https',
        hostname: 'player-yt-spa.vercel.app',
        port: '',
        pathname: '/_next/**',
      }
    ],
  }
};


module.exports = nextConfig;
