
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const acfLogo = "/header/symbol.png";

type Team = {
  name: string;
  logo: string;
};

type MatchCardProps = {
  date: string;
  home: Team;
  away: Team;
  score?: string;
  upcoming?: boolean;
};

function MatchCard({ date, home, away, score, upcoming = false }: MatchCardProps) {
  return (
    <article className={`components-games-panel-matchCard ${upcoming ? "components-games-panel-upcomingCard" : ""}`}>
      <div className={`components-games-panel-matchDate ${upcoming ? "components-games-panel-upcomingDate" : ""}`}>{date}</div>
      <div className="components-games-panel-matchBody">
        <div className="components-games-panel-team">
          <img src={home.logo} alt={home.name} className="w-8 h-8 object-contain" />
          <span>{home.name}</span>
        </div>
        <div className="components-games-panel-score">{score ?? "x"}</div>
        <div className="components-games-panel-team">
          <img src={away.logo} alt={away.name} className="w-8 h-8 object-contain" />
          <span>{away.name}</span>
        </div>
      </div>
    </article>
  );
}

function DividerTitle({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="components-games-panel-dividerTitle">
      <span />
      <h3 className={accent ? "components-games-panel-accentTitle" : ""}>{children}</h3>
      <span />
    </div>
  );
}

export function GamesPanel() {
  return (
    <aside className="components-games-panel-panel" data-node-id="1888:10650" aria-labelledby="games-title">
      <header className="components-games-panel-header">
        <h2 id="games-title">
          jogos<span>.</span>
        </h2>
        <Link href="/clube/competicoes" className="inline-flex items-center gap-1">
          ver mais
          <ArrowUpRight size={16} />
        </Link>
      </header>

      <div className="components-games-panel-blocks">
        <section className="components-games-panel-block" aria-label="Partida finalizada">
          <DividerTitle>partida finalizada</DividerTitle>
          <MatchCard
            date="04/02/2026 - segunda divisão / CP"
            home={{ name: "londrina s.j", logo: "/header/symbol.png" }}
            away={{ name: "ACF Sport Club", logo: acfLogo }}
            score="1 x 5"
          />
        </section>

        <section className="components-games-panel-block" aria-label="Próxima partida">
          <DividerTitle accent>próxima partida</DividerTitle>
          <MatchCard
            date="11/02/2026 - copa Cornélio futsal"
            home={{ name: "ACF Sport Club", logo: acfLogo }}
            away={{ name: "Vila Real futsal", logo: "/header/symbol.png" }}
            upcoming
          />
        </section>
      </div>
    </aside>
  );
}

