import { MainMenu } from "@/components/MainMenu";
import { SponsorsPageContent } from "@/components/SponsorsPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import styles from "./page.module.css";

export default function PatrocinadoresPage() {
  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="clube" activeClub="patrocinadores" />
      <header className={styles.heading}>
        <div>
          <p>nossos parceiros</p>
          <h1>
            patrocinadores<span>.</span>
          </h1>
        </div>
      </header>
      <SponsorsPageContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
