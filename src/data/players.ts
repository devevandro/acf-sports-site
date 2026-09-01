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
  positionFutsal: string;
  positionCampo: string;
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
  position_futsal: string | null;
  position_campo: string | null;
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

type PositionGroupDef = { id: string; label: string; cardLabel: string };

const futsalPositionGroupOrder: PositionGroupDef[] = [
  { id: "goleiro", label: "Goleiros", cardLabel: "Goleiro" },
  { id: "fixo", label: "Fixos", cardLabel: "Fixo" },
  { id: "ala", label: "Alas", cardLabel: "Ala" },
  { id: "pivo", label: "Pivôs", cardLabel: "Pivô" },
];

const campoPositionGroupOrder: PositionGroupDef[] = [
  { id: "goleiro", label: "Goleiros", cardLabel: "Goleiro" },
  { id: "zagueiro", label: "Zagueiros", cardLabel: "Zagueiro" },
  { id: "lateral", label: "Laterais", cardLabel: "Lateral" },
  { id: "volante", label: "Volantes", cardLabel: "Volante" },
  { id: "meia", label: "Meias", cardLabel: "Meia" },
  { id: "ponta", label: "Pontas", cardLabel: "Ponta" },
  { id: "centroavante", label: "Centroavantes", cardLabel: "Centroavante" },
];

function positionGroupOrderFor(category: RosterCategory): PositionGroupDef[] {
  return category === "campo" ? campoPositionGroupOrder : futsalPositionGroupOrder;
}

// `players.position_campo` exists as its own column but is still populated with
// futsal-vocabulary values today (Goleiro/Fixo/Ala/Pivô) rather than real
// field-soccer positions. Until campo-specific values are entered, map that
// value onto its closest field-soccer equivalent so the roster still groups
// sensibly under the requested campo section headings.
const futsalToCampoFallback: Record<string, string> = {
  goleiro: "goleiro",
  fixo: "volante",
  ala: "ponta",
  pivo: "centroavante",
};

function normalizePosition(raw: string | null, category: RosterCategory = "futsal"): string | null {
  if (!raw) return null;

  const primary = raw.split("/")[0] ?? raw;
  const normalized = primary
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

  if (category === "campo") {
    if (normalized.includes("gol")) return "goleiro";
    if (normalized.includes("zagu")) return "zagueiro";
    if (normalized.includes("lateral")) return "lateral";
    if (normalized.includes("volante")) return "volante";
    if (normalized.includes("mei")) return "meia";
    if (normalized.includes("ponta")) return "ponta";
    if (normalized.includes("centroavante") || normalized.includes("atacante")) return "centroavante";

    const futsalId = normalizePosition(raw, "futsal");
    return futsalId ? futsalToCampoFallback[futsalId] ?? null : null;
  }

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

export function positionLabelFor(position: string, category: RosterCategory = "futsal"): string {
  const id = normalizePosition(position, category);
  return positionGroupOrderFor(category).find((group) => group.id === id)?.cardLabel ?? "Outros";
}

export function positionGroupLabelFor(position: string, category: RosterCategory = "futsal"): string {
  const id = normalizePosition(position, category);
  return positionGroupOrderFor(category).find((group) => group.id === id)?.label ?? "Outros";
}

const getAllPlayers = cache(async (): Promise<RosterPlayer[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, nickname, number, position_futsal, position_campo, modality, birthday, dominant_foot, quote, social_media
      FROM players
      ORDER BY trim(name)
    `) as unknown as PlayerRow[];

    const seenSlugs = new Set<string>();

    return rows.map((row) => {
      const base = slugify(row.nickname) || row.id;
      const slug = seenSlugs.has(base) ? `${base}-${row.id.slice(0, 4)}` : base;
      seenSlugs.add(slug);

      const positionFutsal = row.position_futsal?.trim() ?? "";
      const positionCampo = row.position_campo?.trim() ?? "";
      const categories = row.modality ?? [];

      return {
        id: row.id,
        slug,
        name: row.name.trim(),
        nickname: row.nickname.trim(),
        number: row.number ?? "-",
        positionFutsal,
        positionCampo,
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

export function groupPlayersByPosition(players: RosterPlayer[], category: RosterCategory): RosterPositionGroup[] {
  const matchedIds = new Set<string>();
  const order = positionGroupOrderFor(category);

  const groups = order.map((group) => {
    const groupPlayers = players.filter((player) => {
      const rawPosition = category === "campo" ? player.positionCampo : player.positionFutsal;
      return normalizePosition(rawPosition, category) === group.id;
    });
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
