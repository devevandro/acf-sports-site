import { SiteHeader } from "@/components/SiteHeader";
import { RosterPageContent } from "@/components/roster/RosterPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import type { RosterCategory } from "@/data/players";

type PageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const categoryQueryParam = "modalidade";
const validCategories = new Set(["campo", "futsal"]);

export default async function RosterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = parseCategory(params[categoryQueryParam]);

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
      <RosterPageContent category={category} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}

function parseCategory(value: string | undefined): RosterCategory {
  return validCategories.has(value ?? "") ? (value as RosterCategory) : "futsal";
}
