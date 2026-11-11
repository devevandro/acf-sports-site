import type { NextConfig } from "next";

// Hosts whose every page is temporarily redirected to /comunicado (pre-season notice).
const NOTICE_HOSTS = ["stage.acfsports.com.br", "acfsports.com.br"];

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; 'unsafe-eval' is only needed by the dev server.
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
