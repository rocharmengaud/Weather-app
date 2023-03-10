/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  images: {
    domains: ['openweathermap.org'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
