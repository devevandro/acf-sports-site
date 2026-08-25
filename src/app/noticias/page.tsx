import type { Metadata } from "next";
import { MainMenu } from "@/components/MainMenu";
import { NewsArchive } from "@/components/NewsArchive";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Notícias | ACF Sports",
  description: "Fique por dentro das últimas notícias, partidas, novidades e cobertura completa do ACF Sports.",
  openGraph: {
    title: "Notícias | ACF Sports",
    description: "Fique por dentro das últimas notícias, partidas, novidades e cobertura completa do ACF Sports.",
    url: "https://acf-sports.com.br/noticias",
  },
};

export default function NewsPage() {
  return (
    <main className="app-noticias-page-page">
      <TopCf />
      <MainMenu active="news" />
      <header className="app-noticias-page-heading">
        <div>
          <p>atualidades</p>
          <h1>
            notícias<span>.</span>
          </h1>
        </div>
      </header>
      <NewsArchive />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
