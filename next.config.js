/** @type {NodeJS.ProcessEnv} */
const env = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: env.IGNORE_BUILD_LINT === "true",
  },
};

module.exports = nextConfig;
