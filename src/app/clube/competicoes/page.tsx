import { CompetitionsContent } from "@/components/CompetitionsContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function CompetitionsPage() {
  return (
    <main className="app-clube-competicoes-page-page">
      <TopCf />
      <MainMenu active="club" activeClub="competitions" />
      <header className="app-clube-competicoes-page-heading">
        <div>
          <p>clube</p>
          <h1>
            tabelas & jogos<span>.</span>
          </h1>
        </div>
      </header>
      <CompetitionsContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
