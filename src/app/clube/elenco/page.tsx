import { SiteHeader } from "@/components/SiteHeader";
import { RosterPageContent } from "@/components/roster/RosterPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import type { RosterCategory, RosterPosition } from "@/data/roster";

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const categoryQueryParam = "modalidade";
const positionQueryParam = "posicao";
const validCategories = new Set(["todos", "campo", "futsal"]);
const validPositions = new Set(["todos", "goleiro", "defensor", "meio-campo", "atacante"]);

export default async function RosterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = parseCategory(params[categoryQueryParam]);
  const position = parsePosition(params[positionQueryParam]);

  return (
    <main className="app-clube-elenco-page-page">
      <TopCf />
      <SiteHeader active="club" activeClub="roster" />
      <header className="app-clube-elenco-page-heading">
        <div>
          <p>clube</p>
          <h1>
            nosso elenco<span>.</span>
          </h1>
        </div>
      </header>
      <RosterPageContent category={category} position={position} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}

function parseCategory(value: string | undefined): RosterCategory | "todos" {
  return validCategories.has(value ?? "") ? (value as RosterCategory | "todos") : "campo";
}

function parsePosition(value: string | undefined): RosterPosition {
  return validPositions.has(value ?? "") ? (value as RosterPosition) : "todos";
}
