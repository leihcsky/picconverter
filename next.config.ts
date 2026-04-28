import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Windows EPERM on ".next/trace" by using a fresh build directory.
  distDir: "next-dev",
};

export default nextConfig;
