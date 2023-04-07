/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['https://*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
   redirects: async ()=> {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
     
    ]
  },
};


module.exports = nextConfig;
