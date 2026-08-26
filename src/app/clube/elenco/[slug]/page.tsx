import { SiteHeader } from "@/components/SiteHeader";
import { PlayerDetailContent } from "@/components/roster/PlayerDetailContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { athletes, getAthleteBySlug } from "@/data/roster";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return athletes.map((athlete) => ({
    slug: athlete.slug,
  }));
}

export default async function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const athlete = getAthleteBySlug(slug);

  if (!athlete) {
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
      <PlayerDetailContent athlete={athlete} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
