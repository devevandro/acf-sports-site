import { cache } from "react";
import { getDb } from "@/db";

export type StandingEntry = {
  position: string;
  team: string;
  points: string;
  played: string;
  wins: string;
  draws: string;
  losses: string;
  goalsScored: string;
  goalsConceded: string;
  goalDifference: string;
  symbol: string | null;
};

export type HomeCompetition = {
  id: string;
  title: string;
  group: string | null;
  standings: StandingEntry[];
};

type CompetitionRow = {
  id: string;
  title: string;
  group: string | null;
  table: StandingEntry[] | null;
};

function rankStandings(entries: StandingEntry[]): StandingEntry[] {
  return [...entries]
    .sort((a, b) => {
      const pointsDiff = Number(b.points || 0) - Number(a.points || 0);
      if (pointsDiff !== 0) return pointsDiff;
      return Number(b.goalDifference || 0) - Number(a.goalDifference || 0);
    })
    .map((entry, index) => ({ ...entry, position: String(index + 1) }));
}

function mapRow(row: CompetitionRow): HomeCompetition {
  return {
    id: row.id,
    title: row.title,
    group: row.group,
    standings: rankStandings(row.table ?? []),
  };
}

export const getHomeCompetitions = cache(async (): Promise<HomeCompetition[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, title, "group", "table"
      FROM competitions
      WHERE home_page = true
      ORDER BY updated_at DESC
    `) as unknown as CompetitionRow[];

    return rows.map(mapRow);
  } catch (error) {
    console.error("Failed to fetch home competitions from database", error);
    return [];
  }
});

export const getAllCompetitions = cache(async (): Promise<HomeCompetition[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, title, "group", "table"
      FROM competitions
      ORDER BY home_page DESC, updated_at DESC
    `) as unknown as CompetitionRow[];

    return rows.map(mapRow);
  } catch (error) {
    console.error("Failed to fetch competitions from database", error);
    return [];
  }
});
