import type { RosterCategory, RosterPosition } from "@/data/roster";
import styles from "./RosterFilters.module.css";

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
    <div className={styles.filters}>
      <div className={styles.categoryGroup} aria-label="Filtrar por modalidade">
        {categories.map((category) => (
          <a
            className={category.id === activeCategory ? styles.active : ""}
            href={buildHref(category.id, activePosition)}
            key={category.id}
          >
            {category.label}
          </a>
        ))}
      </div>

      <nav className={styles.positionGroup} aria-label="Filtrar por posição">
        <a
          className={activePosition === "todos" ? styles.active : ""}
          href={buildHref(activeCategory, "todos")}
        >
          Todas às posições
        </a>
        <a
          className={activePosition !== "todos" ? styles.active : ""}
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
