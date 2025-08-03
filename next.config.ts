import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   // Disable type checking during builds for faster builds
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true, // For development with local uploads
  },
  // Fix for development cross-origin requests
  allowedDevOrigins: [
    "717da3c84431446e9f913e2545d311b8-b4b8e1a69b174f92a0831a2aa.fly.dev",
  ],
};

export default nextConfig;
