import { cache } from "react";
import { getDb } from "@/db";

export type TeamHistory = {
  title: string;
  content: string;
  symbol: string;
  mascot: string;
  contentImage: string;
  mascotImages: string[];
  createdAt: string;
};

type TeamHistoryRow = {
  title: string | null;
  content: string | null;
  symbol: string | null;
  mascot: string | null;
  content_image: string | null;
  mascot_images: string[] | null;
  created_at: string;
};

const FALLBACK_TEAM_HISTORY: TeamHistory = {
  title: "A origem do nome",
  content: `
    <p>Fundado no dia 16 de janeiro de 2002, inicialmente como equipe de futsal apenas, com o nome de Juventus Futsal, 3 garotos que tinham o sonho de ter a sua própria equipe e assim poder disputar campeonatos.</p>
    <p>No ano de 2004 surgiu também a equipe de campo, mas como já existia uma equipe com o nome de Juventus na cidade resolveram colocar o nome do time de futebol de campo de ACF, no mesmo ano por sempre serem confundidos com a equipe do Juventus, resolveram mudar o nome da equipe para Ajax, porém logo foi mudado para ACF também e a partir deste ano passamos a se chamar ACF tanto no futsal quanto no futebol de campo.</p>
    <p>As letras ACF nada mais são que uma homenagem que fizemos ao grande Tonhão do Cascavel (Antônio Carlos Ferreira), daí o nome da equipe.</p>
  `,
  symbol: "",
  mascot: "",
  contentImage: "/history/hero.png",
  mascotImages: [],
  createdAt: new Date().toISOString(),
};

export const getTeamHistory = cache(async (): Promise<TeamHistory> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT title, content, symbol, mascot, content_image, mascot_images, created_at
      FROM team_history
      ORDER BY created_at DESC
      LIMIT 1
    `) as unknown as TeamHistoryRow[];
    const row = rows[0];
    if (!row) return FALLBACK_TEAM_HISTORY;
    return {
      title: row.title || FALLBACK_TEAM_HISTORY.title,
      content: row.content || FALLBACK_TEAM_HISTORY.content,
      symbol: row.symbol ?? "",
      mascot: row.mascot ?? "",
      contentImage: row.content_image || FALLBACK_TEAM_HISTORY.contentImage,
      mascotImages: row.mascot_images?.length ? row.mascot_images : [],
      createdAt: new Date(row.created_at).toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch team history from database", error);
    return FALLBACK_TEAM_HISTORY;
  }
});
