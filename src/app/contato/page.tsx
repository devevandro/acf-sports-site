import { ContactContent } from "@/components/ContactContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import styles from "./page.module.css";

export default function ContatoPage() {
  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="contato" />
      <header className={styles.heading}>
        <div>
          <p>social</p>
          <h1>
            contato<span>.</span>
          </h1>
        </div>
      </header>
      <ContactContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
