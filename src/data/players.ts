import { cache } from "react";
import { getDb } from "@/db";

export type RosterCategory = "futsal" | "campo";

export type RosterPlayer = {
  id: string;
  name: string;
  number: string;
  position: string;
};

export type RosterPlayerCard = {
  id: string;
  name: string;
  number: string;
  positionLabel: string;
};

export type RosterStaffMember = {
  id: string;
  name: string;
  role: string;
};

export type RosterPositionGroup = {
  id: string;
  label: string;
  players: RosterPlayerCard[];
};

type PlayerRow = {
  id: string;
  name: string;
  number: string | null;
  position: string | null;
};

type StaffRow = {
  id: string;
  name: string;
  function: string;
};

const categoryLabels: Record<RosterCategory, string> = {
  futsal: "futsal",
  campo: "futebol de campo",
};

const positionGroupOrder: { id: string; label: string }[] = [
  { id: "goleiro", label: "Goleiros" },
  { id: "fixo", label: "Fixos" },
  { id: "ala", label: "Alas - Esq / Dir" },
  { id: "pivo", label: "Pivôs" },
];

function normalizePosition(raw: string | null): string | null {
  if (!raw) return null;

  const primary = raw.split("/")[0] ?? raw;
  const normalized = primary
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

  if (normalized.includes("gol")) return "goleiro";
  if (normalized.includes("piv")) return "pivo";
  if (normalized.includes("fix")) return "fixo";
  if (normalized.includes("ala")) return "ala";
  return null;
}

export function categoryLabel(category: RosterCategory) {
  return categoryLabels[category];
}

export const getPlayersByCategory = cache(async (category: RosterCategory): Promise<RosterPlayer[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, number, position
      FROM players
      WHERE modality = ${category}
      ORDER BY trim(name)
    `) as unknown as PlayerRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name.trim(),
      number: row.number ?? "-",
      position: row.position ?? "",
    }));
  } catch (error) {
    console.error("Failed to fetch players from database", error);
    return [];
  }
});

export function groupPlayersByPosition(players: RosterPlayer[]): RosterPositionGroup[] {
  const matchedIds = new Set<string>();

  const groups = positionGroupOrder.map((group) => {
    const groupPlayers = players.filter((player) => normalizePosition(player.position) === group.id);
    groupPlayers.forEach((player) => matchedIds.add(player.id));

    return {
      id: group.id,
      label: group.label,
      players: groupPlayers.map((player) => ({
        id: player.id,
        name: player.name,
        number: player.number,
        positionLabel: group.label,
      })),
    };
  });

  const unmatched = players.filter((player) => !matchedIds.has(player.id));
  if (unmatched.length > 0) {
    groups.push({
      id: "outros",
      label: "Outros",
      players: unmatched.map((player) => ({
        id: player.id,
        name: player.name,
        number: player.number,
        positionLabel: "Outros",
      })),
    });
  }

  return groups.filter((group) => group.players.length > 0);
}

export const getStaffMembers = cache(async (): Promise<RosterStaffMember[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, function
      FROM staff_members
      ORDER BY created_at
    `) as unknown as StaffRow[];

    return rows.map((row) => ({ id: row.id, name: row.name.trim(), role: row.function }));
  } catch (error) {
    console.error("Failed to fetch staff members from database", error);
    return [];
  }
});
