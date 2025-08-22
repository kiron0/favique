import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "export",
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
