export type RosterPosition = "todos" | "goleiro" | "defensor" | "meio-campo" | "atacante";

export type RosterCategory = "campo" | "futsal";

export type Athlete = {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  number: number;
  position: Exclude<RosterPosition, "todos">;
  category: RosterCategory;
  image: string;
  birthDate: string;
  height: string;
  weight: string;
  dominantFoot: "Destro" | "Canhoto" | "Ambidestro";
  city: string;
  joinedAt: string;
  stats: {
    games: number;
    goals: number;
    assists: number;
  };
};

export type StaffMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const athleteImages = [
  "https://www.figma.com/api/mcp/asset/fa0fdc19-0723-46e7-b0bd-a506780efa80",
  "https://www.figma.com/api/mcp/asset/838e8b29-4da9-4c41-a176-6bdba6508189",
  "https://www.figma.com/api/mcp/asset/82157c76-8b22-4998-91ea-839711547d02",
  "https://www.figma.com/api/mcp/asset/3159c55e-7ec9-4add-a849-d20968be9278",
  "https://www.figma.com/api/mcp/asset/c8116d5a-83fc-401b-a051-6e96169e94a4",
];

const fieldAthleteImages = [
  "https://www.figma.com/api/mcp/asset/c4d90fec-8c1f-410d-9e4f-5b5be79ce06a",
  "https://www.figma.com/api/mcp/asset/6e1e5cfa-4b97-498f-bd03-9798680c234b",
  "https://www.figma.com/api/mcp/asset/5beaf1e9-b36d-4d5d-b381-b2b05dc6d97b",
  "https://www.figma.com/api/mcp/asset/8d0bc137-a404-409a-bd96-d0954f398115",
  "https://www.figma.com/api/mcp/asset/369469ea-45e2-4f1b-8d73-4114d0207ca5",
  "https://www.figma.com/api/mcp/asset/63c34fc3-c846-4183-b565-8c61e256738a",
  "https://www.figma.com/api/mcp/asset/6e4b4203-0d70-4fa7-8669-dfa88eed00ac",
  "https://www.figma.com/api/mcp/asset/1b6ebdf7-ac53-4ccb-a456-c48c2d70a783",
  "https://www.figma.com/api/mcp/asset/46bf8418-1f28-4879-ad63-d27f4a0ef4f3",
  "https://www.figma.com/api/mcp/asset/196a172c-0e8b-4556-921e-0efbbe24682b",
  "https://www.figma.com/api/mcp/asset/ace20dd0-939f-483a-8426-4292e4151e5e",
  "https://www.figma.com/api/mcp/asset/db0771bc-9fbc-4b2e-a94f-3fa74a4a27b4",
  "https://www.figma.com/api/mcp/asset/0a838b59-bea7-4c58-8e97-46659569e29d",
  "https://www.figma.com/api/mcp/asset/551df0dc-2854-48b5-b0e1-1140cc621832",
  "https://www.figma.com/api/mcp/asset/f9638da7-3ddd-448f-ba51-2db3259f2ad7",
  "https://www.figma.com/api/mcp/asset/da7a82fa-d2bf-47c1-ab7a-35b6b9e8e9d3",
  "https://www.figma.com/api/mcp/asset/c557d7af-16a1-4093-8908-a96499098309",
  "https://www.figma.com/api/mcp/asset/31466037-e672-462c-8e88-63c9aca21bad",
  "https://www.figma.com/api/mcp/asset/9e762a9c-1d1e-443e-a0f3-425296354858",
  "https://www.figma.com/api/mcp/asset/4dacceed-e3d5-491c-b78e-c97fdc2adab2",
];

const fieldAthleteNames = [
  "Talan Botosh",
  "Zain Kenter",
  "Cooper Geidt",
  "Nolan",
  "Ethan",
  "Bryan",
  "Dante",
  "Lorenzo",
  "Ryan",
  "Henry",
  "Theo",
  "Benício",
  "Matteo",
  "Noah",
  "Anthony",
  "Ahmad",
  "Lubin",
  "Madson",
  "Kadin",
  "Lucca",
];

export const rosterPositions: { id: RosterPosition; label: string }[] = [
  { id: "todos", label: "Todas às posições" },
  { id: "goleiro", label: "Goleiros" },
  { id: "defensor", label: "Defensores" },
  { id: "meio-campo", label: "Meio-campo" },
  { id: "atacante", label: "Atacantes" },
];

const positions: Exclude<RosterPosition, "todos">[] = [
  "goleiro",
  "defensor",
  "defensor",
  "meio-campo",
  "atacante",
];

function createAthletes(category: RosterCategory, startNumber: number): Athlete[] {
  return Array.from({ length: 20 }, (_, index) => {
    const number = startNumber + index;
    const isFieldCategory = category === "campo";
    const name = isFieldCategory ? fieldAthleteNames[index] : `Futsal ACF ${String(index + 1).padStart(2, "0")}`;
    const nickname = isFieldCategory ? name.split(" ")[0] : `Futsal ${index + 1}`;

    return {
      id: `${category}-${number}`,
      slug: `${category}-acf-${index + 1}`,
      name,
      nickname,
      number,
      position: positions[index % positions.length],
      category,
      image: isFieldCategory ? fieldAthleteImages[index] : athleteImages[(index + 2) % athleteImages.length],
      birthDate: `${String((index % 27) + 1).padStart(2, "0")}/0${(index % 9) + 1}/199${index % 10}`,
      height: `${1.68 + (index % 18) / 100}m`,
      weight: `${68 + (index % 18)}kg`,
      dominantFoot: index % 5 === 0 ? "Canhoto" : index % 7 === 0 ? "Ambidestro" : "Destro",
      city: "Cornélio Procópio - PR",
      joinedAt: `20${18 + (index % 7)}`,
      stats: {
        games: 8 + index * 2,
        goals: positions[index % positions.length] === "goleiro" ? 0 : index + 1,
        assists: index % 9,
      },
    };
  });
}

export const athletes: Athlete[] = [
  ...createAthletes("campo", 1),
  ...createAthletes("futsal", 21),
];

export const staffMembers: StaffMember[] = [
  {
    id: "staff-1",
    name: "Evandro Ferreira",
    role: "Treinador",
    image: athleteImages[0],
  },
  {
    id: "staff-2",
    name: "Carlos Ferreira",
    role: "Auxiliar técnico",
    image: athleteImages[1],
  },
  {
    id: "staff-3",
    name: "Marcos Silva",
    role: "Preparador físico",
    image: athleteImages[2],
  },
  {
    id: "staff-4",
    name: "Rafael Santos",
    role: "Massagista",
    image: athleteImages[3],
  },
  {
    id: "staff-5",
    name: "João Pereira",
    role: "Diretor",
    image: athleteImages[4],
  },
];

export function filterAthletes(position: RosterPosition, category: RosterCategory | "todos") {
  return athletes.filter((athlete) => {
    const matchesPosition = position === "todos" || athlete.position === position;
    const matchesCategory = category === "todos" || athlete.category === category;

    return matchesPosition && matchesCategory;
  });
}

export function getAthleteBySlug(slug: string) {
  return athletes.find((athlete) => athlete.slug === slug);
}

export function getRelatedAthletes(athlete: Athlete) {
  return athletes
    .filter((item) => item.slug !== athlete.slug && item.category === athlete.category)
    .slice(0, 5);
}
