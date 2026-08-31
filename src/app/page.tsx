import { HeroNews } from "@/components/HeroNews";
import { SiteFooter } from "@/components/SiteFooter";
import { RosterSection } from "@/components/RosterSection";
import { GamesPanel } from "@/components/GamesPanel";
import { SiteHeader } from "@/components/SiteHeader";
import { NewsGrid } from "@/components/NewsGrid";
import { PlansSection } from "@/components/PlansSection";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { StandingsPanel } from "@/components/StandingsPanel";
import { TopCf } from "@/components/TopCf";
import { YoutubeSection } from "@/components/YoutubeSection";
import { getAllNews } from "@/data/news";
import { getPlayersByCategory } from "@/data/players";
import { ScrollReveal } from "@/components/ScrollReveal";

export const revalidate = 60;

const HOME_ROSTER_COUNT = 5;

export default async function Home() {
  const [allNews, futsalPlayers] = await Promise.all([getAllNews(), getPlayersByCategory("futsal")]);

  const rosterAthletes = futsalPlayers.slice(0, HOME_ROSTER_COUNT).map((player) => ({
    id: player.id,
    name: player.nickname,
    number: player.number,
  }));

  return (
    <main className="app-page-page">
      <TopCf />
      <SiteHeader active="home" />
      <HeroNews news={allNews} />
      <ScrollReveal>
        <section className="app-page-newsBand">
          <div className="app-page-contentRow">
            <NewsGrid />
            <aside className="app-page-sidebar">
              <GamesPanel />
              <StandingsPanel />
            </aside>
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal>
        <PlansSection />
      </ScrollReveal>
      <SponsorsStrip />
      <ScrollReveal>
        <RosterSection athletes={rosterAthletes} />
      </ScrollReveal>
      <ScrollReveal>
        <YoutubeSection />
      </ScrollReveal>
      <SiteFooter />
    </main>
  );
}
