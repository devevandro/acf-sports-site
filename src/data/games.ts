import { cache } from "react";
import { getDb } from "@/db";

export type GameItem = {
  id: string;
  opponent: string;
  opponentLogo: string | null;
  result: string;
  date: string;
  time: string | null;
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
  time: string | null;
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
    time: row.time,
    location: row.location ?? "",
    competitionTitle: row.competition_title,
  };
}

export const getAllGames = cache(async (): Promise<GameItem[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT g.id, g.opponent, g.result, g.date, g.time, g.location, c.title AS competition_title, c."table" AS competition_table
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

function gameDateTime(game: GameItem): string {
  // Compares as plain "YYYY-MM-DD HH:MM" strings so ordering is correct
  // without going through Date/timezone parsing (game.date has no time
  // component and game.time is a separate "HH:MM" field).
  return `${game.date} ${game.time ?? "00:00"}`;
}

export async function getLatestFinishedGame(): Promise<GameItem | null> {
  const finished = (await getAllGames()).filter(isFinished);
  finished.sort((a, b) => gameDateTime(b).localeCompare(gameDateTime(a)));
  return finished[0] ?? null;
}

export async function getNextUpcomingGame(): Promise<GameItem | null> {
  const upcoming = (await getAllGames()).filter((game) => !isFinished(game));
  upcoming.sort((a, b) => gameDateTime(a).localeCompare(gameDateTime(b)));
  return upcoming[0] ?? null;
}

export async function getPreviousGames(): Promise<GameItem[]> {
  const finished = (await getAllGames()).filter(isFinished);
  finished.sort((a, b) => gameDateTime(b).localeCompare(gameDateTime(a)));
  return finished;
}

export function formatGameDate(game: GameItem): string {
  // game.date is a plain "YYYY-MM-DD" string with no time/timezone info,
  // so it's formatted directly instead of going through Date parsing
  // (which treats it as UTC midnight and can shift it a day when
  // formatted in a negative-UTC timezone).
  const [year, month, day] = game.date.split("-");
  const datePart = year && month && day ? `${day}/${month}/${year}` : game.date;
  return game.competitionTitle ? `${datePart} - ${game.competitionTitle}` : datePart;
}

export function formatGameTime(game: GameItem): string {
  return game.time ?? "";
}
