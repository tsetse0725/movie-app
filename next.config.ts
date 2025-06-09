/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true, // `app/` directory-г зөвшөөрнө
  },
  srcDir: "src", // `src/` фолдерыг root гэж үзнэ
  reactStrictMode: true,
};

export default nextConfig;
