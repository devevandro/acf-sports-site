import { MainMenu } from "@/components/MainMenu";
import { NewsArchive } from "@/components/NewsArchive";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function NoticiasPage() {
  return (
    <main className="app-noticias-page-page">
      <TopCf />
      <MainMenu active="noticias" />
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
