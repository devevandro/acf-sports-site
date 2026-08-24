import type { Metadata } from "next";
import { Montserrat, Outfit, Poppins, Rampart_One, Roboto, Rubik } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
  variable: "--font-outfit",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rubik",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-poppins",
});

const rampartOne = Rampart_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rampart-one",
});

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
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${outfit.variable} ${rubik.variable} ${roboto.variable} ${poppins.variable} ${rampartOne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

