/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'otelmavideniz.com',
      },
    ],
  },
};

module.exports = nextConfig;
