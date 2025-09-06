import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
outputFileTracingRoot: __dirname,
  

  experimental: {
  
  }
};

module.exports = {
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
