import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "admin-al-asr.centers.pk",
      "localhost",
      "127.0.0.1",
      "al-asr.centers.pk",
    ],
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin-al-asr.centers.pk",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.centers.pk",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack(config) {
    // ✅ Add SVG loader for Webpack builds
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
