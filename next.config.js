/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
