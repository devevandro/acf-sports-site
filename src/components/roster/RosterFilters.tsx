import type { RosterCategory, RosterPosition } from "@/data/roster";

const categories: { id: RosterCategory | "todos"; label: string }[] = [
  { id: "campo", label: "Futebol de Campo" },
  { id: "futsal", label: "Futsal" },
];

type RosterFiltersProps = {
  activeCategory: RosterCategory | "todos";
  activePosition: RosterPosition;
};

export function RosterFilters({ activeCategory, activePosition }: RosterFiltersProps) {
  return (
    <div className="components-roster-roster-filters-filters">
      <div className="components-roster-roster-filters-categoryGroup" aria-label="Filtrar por modalidade">
        {categories.map((category) => (
          <a
            className={category.id === activeCategory ? "components-roster-roster-filters-active" : ""}
            href={buildHref(category.id, activePosition)}
            key={category.id}
          >
            {category.label}
          </a>
        ))}
      </div>

      <nav className="components-roster-roster-filters-positionGroup" aria-label="Filtrar por posição">
        <a
          className={activePosition === "todos" ? "components-roster-roster-filters-active" : ""}
          href={buildHref(activeCategory, "todos")}
        >
          Todas às posições
        </a>
        <a
          className={activePosition !== "todos" ? "components-roster-roster-filters-active" : ""}
          href={buildHref(activeCategory, activePosition === "todos" ? "goleiro" : activePosition)}
        >
          Ver por posições
        </a>
      </nav>
    </div>
  );
}

function buildHref(category: RosterCategory | "todos", position: RosterPosition) {
  const params = new URLSearchParams();

  if (category !== "todos") {
    params.set("modalidade", category);
  }

  if (position !== "todos") {
    params.set("posicao", position);
  }

  const query = params.toString();
  return query ? `/clube/elenco?${query}` : "/clube/elenco";
}
