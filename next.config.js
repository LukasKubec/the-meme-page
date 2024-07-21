/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  output: "standalone",
  swcMinify: true
};

module.exports = nextConfig;
