import { cache } from "react";
import { getDb } from "@/db";

export type TeamInfo = {
  facebook: string;
  instagram: string;
  youtube: string;
  phone: string;
  email: string;
  address: string;
  symbol: string;
};

type TeamInfoRow = {
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  symbol: string | null;
};

const FALLBACK_TEAM_INFO: TeamInfo = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "http://www.youtube.com/@ACFsportsTV",
  phone: "+55 43 99999-9999",
  email: "contato@acf-sports.com.br",
  address: "Rua Maria Staiger Vilar, 59 - Fortunato Sibim, Cornélio Procópio - PR",
  symbol: "/header/symbol.png",
};

export const getTeamInfo = cache(async (): Promise<TeamInfo> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT facebook, instagram, youtube, phone, email, address, symbol
      FROM team_info
      LIMIT 1
    `) as unknown as TeamInfoRow[];
    const row = rows[0];
    if (!row) return FALLBACK_TEAM_INFO;
    return {
      facebook: row.facebook || FALLBACK_TEAM_INFO.facebook,
      instagram: row.instagram || FALLBACK_TEAM_INFO.instagram,
      youtube: row.youtube || FALLBACK_TEAM_INFO.youtube,
      phone: row.phone || FALLBACK_TEAM_INFO.phone,
      email: row.email || FALLBACK_TEAM_INFO.email,
      address: row.address || FALLBACK_TEAM_INFO.address,
      symbol: row.symbol || FALLBACK_TEAM_INFO.symbol,
    };
  } catch (error) {
    console.error("Failed to fetch team info from database", error);
    return FALLBACK_TEAM_INFO;
  }
});
