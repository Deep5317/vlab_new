import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    // Add any external domains you fetch images from
  },
  webpack: (config) => {
    // Support importing glsl files for Three.js shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source'
    });
    return config;
  },
  // Transpile modules that aren’t ES modules if needed
  transpilePackages: ["three"],
};

export default nextConfig;
