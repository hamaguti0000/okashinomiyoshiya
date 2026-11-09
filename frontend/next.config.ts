import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.okashinomiyoshiya.com",
          },
        ],
        destination: "https://okashinomiyoshiya.com/:path*",
        permanent: true,
      },
      // 旧サイト（Goope）のURLからのアクセス・検索エンジンの古いインデックスを新サイトへ誘導
      {
        source: "/category03/contact.html",
        destination: "/#access",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  images: {
    qualities: [72, 75, 78, 82],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stat.ameba.jp",
      },
    ],
  },
};

export default nextConfig;
