import type { RosterCategory } from "@/data/players";

const categories: { id: RosterCategory; label: string }[] = [
  { id: "campo", label: "Futebol de Campo" },
  { id: "futsal", label: "Futsal" },
];

type RosterFiltersProps = {
  activeCategory: RosterCategory;
};

export function RosterFilters({ activeCategory }: RosterFiltersProps) {
  return (
    <nav className="components-roster-roster-filters-categoryGroup" aria-label="Filtrar por modalidade">
      {categories.map((category) => (
        <a
          className={category.id === activeCategory ? "components-roster-roster-filters-active" : ""}
          href={buildHref(category.id)}
          key={category.id}
        >
          {category.label}
        </a>
      ))}
    </nav>
  );
}

function buildHref(category: RosterCategory) {
  const params = new URLSearchParams({ modalidade: category });
  return `/clube/elenco?${params.toString()}`;
}
