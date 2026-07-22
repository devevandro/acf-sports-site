import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACF Sports",
  description: "ACF Sports site generated from Figma design context"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
