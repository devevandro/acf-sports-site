import { cache } from "react";
import { getDb } from "@/db";

export type GameItem = {
  id: string;
  opponent: string;
  opponentLogo: string | null;
  result: string;
  date: string;
  location: string;
  competitionTitle: string | null;
};

type CompetitionTeamEntry = {
  team?: string;
  symbol?: string;
};

type GameRow = {
  id: string;
  opponent: string;
  result: string;
  date: string;
  location: string | null;
  competition_title: string | null;
  competition_table: CompetitionTeamEntry[] | null;
};

function findOpponentLogo(opponent: string, table: CompetitionTeamEntry[] | null): string | null {
  if (!table) return null;
  const entry = table.find((row) => row.team?.trim() === opponent.trim());
  return entry?.symbol || null;
}

function mapRow(row: GameRow): GameItem {
  return {
    id: row.id,
    opponent: row.opponent,
    opponentLogo: findOpponentLogo(row.opponent, row.competition_table),
    result: row.result,
    date: row.date,
    location: row.location ?? "",
    competitionTitle: row.competition_title,
  };
}

export const getAllGames = cache(async (): Promise<GameItem[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT g.id, g.opponent, g.result, g.date, g.location, c.title AS competition_title, c."table" AS competition_table
      FROM games g
      LEFT JOIN competitions c ON c.id = g.competition_id
    `) as unknown as GameRow[];
    return rows.map(mapRow);
  } catch (error) {
    console.error("Failed to fetch games from database", error);
    return [];
  }
});

function isFinished(game: GameItem): boolean {
  const result = game.result.trim();
  return result !== "" && result !== "-";
}

function gameDateTime(game: GameItem): number {
  const time = new Date(game.date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export async function getLatestFinishedGame(): Promise<GameItem | null> {
  const finished = (await getAllGames()).filter(isFinished);
  finished.sort((a, b) => gameDateTime(b) - gameDateTime(a));
  return finished[0] ?? null;
}

export async function getNextUpcomingGame(): Promise<GameItem | null> {
  const upcoming = (await getAllGames()).filter((game) => !isFinished(game));
  upcoming.sort((a, b) => gameDateTime(a) - gameDateTime(b));
  return upcoming[0] ?? null;
}

export async function getPreviousGames(): Promise<GameItem[]> {
  const finished = (await getAllGames()).filter(isFinished);
  finished.sort((a, b) => gameDateTime(b) - gameDateTime(a));
  return finished;
}

export function formatGameDate(game: GameItem): string {
  const time = new Date(game.date).getTime();
  const datePart = Number.isNaN(time)
    ? game.date
    : new Intl.DateTimeFormat("pt-BR").format(new Date(time));
  return game.competitionTitle ? `${datePart} - ${game.competitionTitle}` : datePart;
}

export function formatGameTime(game: GameItem): string {
  const time = new Date(game.date).getTime();
  if (Number.isNaN(time)) return "";
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(time));
}
