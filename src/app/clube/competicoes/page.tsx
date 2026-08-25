import { CompetitionsContent, type PreviousMatchData } from "@/components/CompetitionsContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getAllCompetitions } from "@/data/competitions";
import { formatGameDate, formatGameTime, getNextUpcomingGame, getPreviousGames } from "@/data/games";

export const revalidate = 60;

const fallbackOpponentLogo = "/header/symbol.png";

export default async function CompetitionsPage() {
  const [upcomingGame, competitions, previousGames] = await Promise.all([
    getNextUpcomingGame(),
    getAllCompetitions(),
    getPreviousGames(),
  ]);
  const nextGame = upcomingGame
    ? {
        competition: upcomingGame.competitionTitle ?? "Competição a definir",
        date: formatGameDate(upcomingGame),
        time: formatGameTime(upcomingGame),
        location: upcomingGame.location,
        opponentName: upcomingGame.opponent,
        opponentLogo: upcomingGame.opponentLogo ?? fallbackOpponentLogo,
      }
    : null;

  const previousMatches: PreviousMatchData = previousGames.map((game) => ({
    id: game.id,
    competition: game.competitionTitle ?? "Competição a definir",
    date: formatGameDate(game),
    time: formatGameTime(game),
    location: game.location,
    opponentName: game.opponent,
    opponentLogo: game.opponentLogo ?? fallbackOpponentLogo,
    result: game.result,
  }));

  return (
    <main className="app-clube-competicoes-page-page">
      <TopCf />
      <MainMenu active="club" activeClub="competitions" />
      <header className="app-clube-competicoes-page-heading">
        <div>
          <p>clube</p>
          <h1>
            tabelas & jogos<span>.</span>
          </h1>
        </div>
      </header>
      <CompetitionsContent nextGame={nextGame} competitions={competitions} previousMatches={previousMatches} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
