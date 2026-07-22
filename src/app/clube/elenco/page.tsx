import { MainMenu } from "@/components/MainMenu";
import { RosterPageContent } from "@/components/roster/RosterPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import type { RosterCategory, RosterPosition } from "@/data/roster";
import styles from "./page.module.css";

type PageProps = {
  searchParams: Promise<{
    modalidade?: string;
    posicao?: string;
  }>;
};

const validCategories = new Set(["todos", "campo", "futsal"]);
const validPositions = new Set(["todos", "goleiro", "defensor", "meio-campo", "atacante"]);

export default async function ElencoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = parseCategory(params.modalidade);
  const position = parsePosition(params.posicao);

  return (
    <main className={styles.page}>
      <TopCf />
      <MainMenu active="clube" activeClub="elenco" />
      <header className={styles.heading}>
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
