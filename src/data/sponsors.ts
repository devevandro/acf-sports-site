import { cache } from "react";
import { getDb } from "@/db";

export type SponsorRecord = {
  id: string;
  name: string;
  url: string | null;
  image: string;
};

type SponsorRow = {
  id: string;
  name: string;
  url: string | null;
  image: string;
};

export const getMasterSponsors = cache(async (): Promise<SponsorRecord[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, url, image
      FROM sponsors
      WHERE type = 'sponsor'
      ORDER BY created_at
    `) as unknown as SponsorRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name.trim(),
      url: row.url,
      image: row.image,
    }));
  } catch (error) {
    console.error("Failed to fetch sponsors from database", error);
    return [];
  }
});
