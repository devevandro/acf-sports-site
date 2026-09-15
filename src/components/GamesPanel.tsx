import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatGameDate, getLatestFinishedGame, getUpcomingGames } from "@/data/games";
import { getTeamInfo } from "@/data/teamInfo";
import { GamesUpcomingCarousel } from "@/components/GamesUpcomingCarousel";

const CLUB_NAME = "ACF Sports/Vila Mercado";
const fallbackOpponentLogo = "/header/symbol.png";

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
  location?: string;
};

function MatchCard({ date, home, away, score, upcoming = false, location }: MatchCardProps) {
  return (
    <article className={`components-games-panel-matchCard ${upcoming ? "components-games-panel-upcomingCard" : ""}`}>
      <div
        className={`components-games-panel-matchDate ${upcoming ? "components-games-panel-upcomingDate" : ""}`}
        title={date}
      >
        {date}
      </div>
      <div className="components-games-panel-matchBody">
        <div className="components-games-panel-matchTeams">
          <div className="components-games-panel-team">
            <img src={home.logo} alt={home.name} className="w-8 h-8 object-contain" />
            <span title={home.name}>{home.name}</span>
          </div>
          <div className="components-games-panel-score">{score ?? "x"}</div>
          <div className="components-games-panel-team">
            <img src={away.logo} alt={away.name} className="w-8 h-8 object-contain" />
            <span title={away.name}>{away.name}</span>
          </div>
        </div>
        {location && (
          <div className="components-games-panel-matchLocation" title={location}>
            {location}
          </div>
        )}
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

export async function GamesPanel() {
  const [finishedGame, upcomingGames, teamInfo] = await Promise.all([
    getLatestFinishedGame(),
    getUpcomingGames(2),
    getTeamInfo(),
  ]);
  const acfLogo = teamInfo.symbol;

  return (
    <aside className="components-games-panel-panel" data-node-id="1888:10650" aria-labelledby="games-title">
      <header className="components-games-panel-header">
        <h2 id="games-title">
          jogos<span>.</span>
        </h2>
      </header>

      <div className="components-games-panel-blocks">
        {finishedGame && (
          <section className="components-games-panel-block" aria-label="Partida finalizada">
            <DividerTitle>partida finalizada</DividerTitle>
            <MatchCard
              date={formatGameDate(finishedGame)}
              home={{ name: CLUB_NAME, logo: acfLogo }}
              away={{ name: finishedGame.opponent, logo: finishedGame.opponentLogo ?? fallbackOpponentLogo }}
              score={finishedGame.result}
              location={finishedGame.location}
            />
          </section>
        )}

        {upcomingGames.length > 0 && (
          <section className="components-games-panel-block" aria-label="Próxima partida">
            <DividerTitle accent>próxima partida</DividerTitle>
            <GamesUpcomingCarousel
              acfLogo={acfLogo}
              games={upcomingGames.map((game) => ({
                id: game.id,
                opponent: game.opponent,
                opponentLogo: game.opponentLogo,
                location: game.location,
                formattedDate: formatGameDate(game),
              }))}
            />
          </section>
        )}
      </div>

      <Link href="/clube/competicoes" className="components-games-panel-more">
        ver mais
        <ArrowUpRight size={16} />
      </Link>
    </aside>
  );
}
