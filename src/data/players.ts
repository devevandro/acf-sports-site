import { cache } from "react";
import { getDb } from "@/db";

export type RosterCategory = "futsal" | "campo";

export type SocialLink = {
  platform: string;
  url: string;
};

export type RosterPlayer = {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  number: string;
  position: string;
  category: RosterCategory;
  categories: RosterCategory[];
  birthday: string | null;
  dominantFoot: string | null;
  quote: string;
  socialLinks: SocialLink[];
};

export type RosterPlayerCard = {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  number: string;
  positionLabel: string;
};

export type RosterStaffMember = {
  id: string;
  name: string;
  nickname: string;
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
  nickname: string;
  number: string | null;
  position: string | null;
  modality: RosterCategory[];
  birthday: string | Date | null;
  dominant_foot: string | null;
  quote: string | null;
  social_media: SocialLink[] | null;
};

type StaffRow = {
  id: string;
  name: string;
  nickname: string;
  function: string;
};

const categoryLabels: Record<RosterCategory, string> = {
  futsal: "futsal",
  campo: "futebol de campo",
};

const positionGroupOrder: { id: string; label: string; cardLabel: string }[] = [
  { id: "goleiro", label: "Goleiros", cardLabel: "Goleiro" },
  { id: "fixo", label: "Fixos", cardLabel: "Fixo" },
  { id: "ala", label: "Alas", cardLabel: "Ala" },
  { id: "pivo", label: "Pivôs", cardLabel: "Pivô" },
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

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatBirthday(value: string | Date | null): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function categoryLabel(category: RosterCategory) {
  return categoryLabels[category];
}

export function dominantFootLabel(dominantFoot: string | null): string | null {
  return dominantFoot ? capitalize(dominantFoot) : null;
}

export function positionLabelFor(position: string): string {
  const id = normalizePosition(position);
  return positionGroupOrder.find((group) => group.id === id)?.cardLabel ?? "Outros";
}

export function positionGroupLabelFor(position: string): string {
  const id = normalizePosition(position);
  return positionGroupOrder.find((group) => group.id === id)?.label ?? "Outros";
}

const getAllPlayers = cache(async (): Promise<RosterPlayer[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, nickname, number, position, modality, birthday, dominant_foot, quote, social_media
      FROM players
      ORDER BY trim(name)
    `) as unknown as PlayerRow[];

    const seenSlugs = new Set<string>();

    return rows.map((row) => {
      const base = slugify(row.nickname) || row.id;
      const slug = seenSlugs.has(base) ? `${base}-${row.id.slice(0, 4)}` : base;
      seenSlugs.add(slug);

      const categories = row.modality ?? [];

      return {
        id: row.id,
        slug,
        name: row.name.trim(),
        nickname: row.nickname.trim(),
        number: row.number ?? "-",
        position: row.position ?? "",
        category: categories[0] ?? "futsal",
        categories,
        birthday: formatBirthday(row.birthday),
        dominantFoot: dominantFootLabel(row.dominant_foot),
        quote: row.quote?.trim() ?? "",
        socialLinks: (row.social_media ?? []).filter((link) => link.platform && link.url),
      };
    });
  } catch (error) {
    console.error("Failed to fetch players from database", error);
    return [];
  }
});

export async function getPlayersByCategory(category: RosterCategory): Promise<RosterPlayer[]> {
  const players = await getAllPlayers();
  return players.filter((player) => player.categories.includes(category));
}

export async function getPlayerBySlug(slug: string): Promise<RosterPlayer | null> {
  const players = await getAllPlayers();
  return players.find((player) => player.slug === slug) ?? null;
}

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
        slug: player.slug,
        name: player.name,
        nickname: player.nickname,
        number: player.number,
        positionLabel: group.cardLabel,
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
        slug: player.slug,
        name: player.name,
        nickname: player.nickname,
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
      SELECT id, name, nickname, function
      FROM staff_members
      ORDER BY created_at
    `) as unknown as StaffRow[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name.trim(),
      nickname: row.nickname.trim(),
      role: row.function,
    }));
  } catch (error) {
    console.error("Failed to fetch staff members from database", error);
    return [];
  }
});
