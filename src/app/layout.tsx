import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACF Sports | Site Oficial — Clube de Futebol & Futsal",
  description: "Site Oficial do ACF Sports. Acompanhe as notícias, jogos, tabelas, elenco de campo e futsal, planos de patrocínio e história do clube de Cornélio Procópio.",
  openGraph: {
    title: "ACF Sports | Site Oficial",
    description: "Acompanhe as notícias, jogos, tabelas, elenco e novidades do ACF Sports.",
    url: "https://acf-sports.com.br",
    siteName: "ACF Sports",
    locale: "pt_BR",
    type: "website",
  },
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

