import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.minute-call.com",
      },
      {
        protocol: "https",
        hostname: "minute-call.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      // Old locale-prefixed routes
      {
        source: "/en/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/:path*",
        destination: "/",
        permanent: true,
      },
      // Old articles, insights, case-studies
      {
        source: "/articles/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/insights/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/case-studies/:path*",
        destination: "/",
        permanent: true,
      },
      // Old standalone pages
      {
        source: "/book-a-call",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-minute-call",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ai-automation-agency",
        destination: "/",
        permanent: true,
      },
      {
        source: "/automation-marketing-agencies",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
