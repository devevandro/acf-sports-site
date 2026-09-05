import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, News_Cycle, Oleo_Script, Outfit, Poppins, Rampart_One, Roboto, Rubik } from "next/font/google";
import { SponsorFloatButton } from "@/components/SponsorFloatButton";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;
const isProduction = process.env.NODE_ENV  === "production";

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

const newsCycle = News_Cycle({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-news-cycle",
});

const oleoScript = Oleo_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oleo-script",
});

export const metadata: Metadata = {
  title: "ACF Sports | Site Oficial",
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
      className={`${montserrat.variable} ${outfit.variable} ${rubik.variable} ${roboto.variable} ${poppins.variable} ${rampartOne.variable} ${newsCycle.variable} ${oleoScript.variable}`}
    >
      <body>
        {children}
        <SponsorFloatButton />
        {isProduction && GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

