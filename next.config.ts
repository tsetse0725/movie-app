/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  srcDir: "src",
  reactStrictMode: true,
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
  },
  images: {
    domains: ["image.tmdb.org"], // ⬅️ энэ мөрийг нэмэх хэрэгтэй
  },
};

export default nextConfig;
