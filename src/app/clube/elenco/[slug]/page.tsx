import { SiteHeader } from "@/components/SiteHeader";
import { PlayerDetailContent } from "@/components/roster/PlayerDetailContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getPlayerBySlug } from "@/data/players";
import { notFound } from "next/navigation";

export default async function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const player = await getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  return (
    <main className="app-clube-elenco-slug-page-page">
      <TopCf />
      <SiteHeader active="club" activeClub="roster" />
      <header className="app-clube-elenco-slug-page-heading">
        <div>
          <p>clube</p>
          <h1>
            jogador<span>.</span>
          </h1>
        </div>
      </header>
      <PlayerDetailContent player={player} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
