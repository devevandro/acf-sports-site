import { CompetitionsContent, type NextGameData, type PreviousMatchData } from "@/components/CompetitionsContent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getAllCompetitions } from "@/data/competitions";
import { formatGameDate, formatGameTime, getUpcomingGames, getPreviousGames } from "@/data/games";
import { getTeamInfo } from "@/data/teamInfo";

export const revalidate = 60;

const fallbackOpponentLogo = "/header/symbol.png";

export default async function CompetitionsPage() {
  const [upcomingGames, competitions, previousGames, teamInfo] = await Promise.all([
    getUpcomingGames(2),
    getAllCompetitions(),
    getPreviousGames(),
    getTeamInfo(),
  ]);
  const nextGames: NextGameData[] = upcomingGames.map((game) => ({
    id: game.id,
    competition: game.competitionTitle ?? "Competição a definir",
    date: formatGameDate(game),
    time: formatGameTime(game),
    location: game.location,
    opponentName: game.opponent,
    opponentLogo: game.opponentLogo ?? fallbackOpponentLogo,
  }));

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
      <SiteHeader active="club" activeClub="competitions" />
      <header className="app-clube-competicoes-page-heading">
        <div>
          <p>clube</p>
          <h1>
            competições<span>.</span>
          </h1>
        </div>
      </header>
      <CompetitionsContent
        nextGames={nextGames}
        competitions={competitions}
        previousMatches={previousMatches}
        clubLogo={teamInfo.symbol}
      />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
