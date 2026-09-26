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
import { getPlayersByCategory, numberFor, positionLabelFor, type RosterCategory, type RosterPlayer } from "@/data/players";
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
  const [allNews, futsalPlayers, fieldPlayers] = await Promise.all([
    getAllNews(),
    getPlayersByCategory("futsal"),
    getPlayersByCategory("campo"),
  ]);

  const uniquePlayers = new Map<string, { player: RosterPlayer; categories: RosterCategory[] }>();
  for (const [category, players] of [["futsal", futsalPlayers], ["campo", fieldPlayers]] as const) {
    for (const player of players) {
      const entry = uniquePlayers.get(player.id);
      if (entry) entry.categories.push(category);
      else uniquePlayers.set(player.id, { player, categories: [category] });
    }
  }

  const rosterAthletes = pickRandom([...uniquePlayers.values()], HOME_ROSTER_COUNT).map(({ player, categories }) => {
    const category = pickRandom(categories, 1)[0];
    const position = category === "campo" ? player.positionCampo : player.positionFutsal;
    return {
      id: player.id,
      slug: player.slug,
      name: player.nickname,
      number: numberFor(player, category),
      image: player.image,
      isGoalkeeper: positionLabelFor(position, category) === "Goleiro",
    };
  });

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
