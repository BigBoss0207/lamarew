import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages (next-on-pages): /_next/image 최적화가 비ASCII public 경로에서 자주 실패함
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
