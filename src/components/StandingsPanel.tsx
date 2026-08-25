import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getHomeCompetitions } from "@/data/competitions";
import { StandingsPanelClient } from "./StandingsPanelClient";

export async function StandingsPanel() {
  const competitions = await getHomeCompetitions();

  return (
    <aside className="components-standings-panel-panel" data-node-id="1888:10656" aria-labelledby="standings-title">
      <header className="components-standings-panel-header">
        <h2 id="standings-title">
          tabelas<span>.</span>
        </h2>
        <Link href="/clube/competicoes" className="inline-flex items-center gap-1">
          ver mais
          <ArrowUpRight size={16} />
        </Link>
      </header>

      <StandingsPanelClient competitions={competitions} />
    </aside>
  );
}
