/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
