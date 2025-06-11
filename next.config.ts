/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true, // 👉 app/ фолдерийг зөвшөөрнө
  },
  srcDir: "src", // 👉 src/ фолдерыг root гэж үзнэ
  reactStrictMode: true,
  env: {
    TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN, // 👉 Bearer Token-ийг client болон server-д дамжуулна
  },
  images: {
    domains: ["image.tmdb.org"], // 👉 TMDB зураг ачаалуулахыг зөвшөөрнө
  },
};

export default nextConfig;
