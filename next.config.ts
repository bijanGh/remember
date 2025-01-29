import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify", "glslify-loader"],
    });
    return config;
  },
  reactStrictMode: true,
};

export default nextConfig;
