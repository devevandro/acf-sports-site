import { HeroNews } from "@/components/HeroNews";
import { SiteFooter } from "@/components/SiteFooter";
import { RosterSection } from "@/components/RosterSection";
import { GamesPanel } from "@/components/GamesPanel";
import { MainMenu } from "@/components/MainMenu";
import { NewsGrid } from "@/components/NewsGrid";
import { PlansSection } from "@/components/PlansSection";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { StandingsPanel } from "@/components/StandingsPanel";
import { TopCf } from "@/components/TopCf";
import { YoutubeSection } from "@/components/YoutubeSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="home" />
      <HeroNews />
      <section className={styles.newsBand}>
        <div className={styles.contentRow}>
          <NewsGrid />
          <aside className={styles.sidebar}>
            <GamesPanel />
            <StandingsPanel />
          </aside>
        </div>
      </section>
      <PlansSection />
      <SponsorsStrip />
      <RosterSection />
      <YoutubeSection />
      <SiteFooter />
    </main>
  );
}
