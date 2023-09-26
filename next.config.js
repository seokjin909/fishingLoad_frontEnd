/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: { export: true },
  images: {
    domains: ["d1i9vzfmlotmwr.cloudfront.net"],
  },
};
module.exports = nextConfig;
