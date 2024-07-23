/** @type {NodeJS.ProcessEnv} */
const env = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  output: "standalone",
  swcMinify: true,
  ignoreDuringBuilds: env.IGNORE_BUILD_LINT === "true",
};

module.exports = nextConfig;
