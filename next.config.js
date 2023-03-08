/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  images: {
    domains: ['openweathermap.org'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
