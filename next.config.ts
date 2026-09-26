import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The contact page became a dialog. Send old links and bookmarks to it
  // rather than a 404. Temporary (307) so the route can come back without
  // browsers having cached the redirect for good.
  async redirects() {
    return [{ source: "/contact", destination: "/#contact", permanent: false }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
