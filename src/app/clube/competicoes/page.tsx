import { CompetitionsContent } from "@/components/CompetitionsContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import styles from "./page.module.css";

export default function CompeticoesPage() {
  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="clube" activeClub="competicoes" />
      <header className={styles.heading}>
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
