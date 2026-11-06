import type { NextConfig } from "next";

// Hosts whose every page is temporarily redirected to /comunicado (pre-season notice).
const NOTICE_HOSTS = ["stage.acfsports.com.br", "acfsports.com.br"];

const nextConfig: NextConfig = {
  async redirects() {
    return NOTICE_HOSTS.map((host) => ({
      // Everything except /comunicado itself, Next internals, API routes (e.g. the media-kit cron)
      // and files with an extension (public assets used by the notice page).
      source: "/((?!comunicado(?:/|$)|_next/|api/|.*\\..*).*)",
      has: [{ type: "host" as const, value: host }],
      destination: "/comunicado",
      permanent: false,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com"
      }
    ]
  }
};

export default nextConfig;
