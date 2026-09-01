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

function pickRandom<T>(items: T[], count: number): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default async function Home() {
  const [allNews, futsalPlayers] = await Promise.all([getAllNews(), getPlayersByCategory("futsal")]);

  const rosterAthletes = pickRandom(futsalPlayers, HOME_ROSTER_COUNT).map((player) => ({
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
