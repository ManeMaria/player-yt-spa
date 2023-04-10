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
      },

      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      }
    ],
  },
   redirects: async ()=> {
    return [
      {
        source: '/',
        destination: '/sptf',
        permanent: false,
      },
     
    ]
  },
};


module.exports = nextConfig;
