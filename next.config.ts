import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  // Silence Prisma edge runtime warning
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
