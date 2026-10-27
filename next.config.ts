import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The dev server is reached as 127.0.0.1 while it listens on all interfaces.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    qualities: [75, 82],
  },
  async redirects() {
    return [
      { source: "/corporate-cultural-events", destination: "/corporate-cultural", permanent: true },
      { source: "/contact/thank-you", destination: "/thank-you", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
