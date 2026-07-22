
const londrinaLogo =
  "https://www.figma.com/api/mcp/asset/3bf7c2c8-e2b2-4c18-81fc-280303db0fa3";

const acfLogo =
  "https://www.figma.com/api/mcp/asset/db437d20-ef90-4f43-a8cd-fb349257e839";

const acfNextLogo =
  "https://www.figma.com/api/mcp/asset/4982cab4-1352-4912-990f-763aa9451c10";

const vilaRealLogo =
  "https://www.figma.com/api/mcp/asset/9b6413e3-a308-4ae5-bff8-19a76eb8983f";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/aa4b587e-0ea8-4bae-b758-e2e6b18fb7f4";

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
          <img src={home.logo} alt="" />
          <span>{home.name}</span>
        </div>
        <div className="components-games-panel-score">{score ?? "x"}</div>
        <div className="components-games-panel-team">
          <img src={away.logo} alt="" />
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
        <a href="#jogos">
          ver mais
          <img src={arrowAsset} alt="" />
        </a>
      </header>

      <div className="components-games-panel-blocks">
        <section className="components-games-panel-block" aria-label="Partida finalizada">
          <DividerTitle>partida finalizada</DividerTitle>
          <MatchCard
            date="04/02/2026 - segunda divisão / CP"
            home={{ name: "londrina s.j", logo: londrinaLogo }}
            away={{ name: "ACF Sport Club", logo: acfLogo }}
            score="1 x 5"
          />
        </section>

        <section className="components-games-panel-block" aria-label="Proxima partida">
          <DividerTitle accent>próxima partida</DividerTitle>
          <MatchCard
            date="11/02/2026 - copa Cornélio futsal"
            home={{ name: "ACF Sport Club", logo: acfNextLogo }}
            away={{ name: "Vila Real futsal", logo: vilaRealLogo }}
            upcoming
          />
        </section>
      </div>
    </aside>
  );
}
