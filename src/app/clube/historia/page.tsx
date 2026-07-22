import { HistoryContent } from "@/components/HistoryContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import styles from "./page.module.css";

export default function HistoriaPage() {
  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="clube" activeClub="historia" />
      <header className={styles.heading}>
        <div>
          <p>clube</p>
          <h1>
            nossa historia<span>.</span>
          </h1>
        </div>
      </header>
      <HistoryContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
