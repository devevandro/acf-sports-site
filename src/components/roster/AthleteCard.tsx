import Link from "next/link";
import type { Athlete, StaffMember } from "@/data/roster";

type AthleteCardProps = {
  person: Athlete | StaffMember;
  variant?: "athlete" | "staff";
};

export function AthleteCard({ person, variant = "athlete" }: AthleteCardProps) {
  const isAthlete = "position" in person;
  const content = (
    <>
      <img className="components-roster-athlete-card-image" src="/squad/player-placeholder.png" alt={person.name} />
      <div className="components-roster-athlete-card-info">
        {isAthlete ? <span className="components-roster-athlete-card-label">{person.number}</span> : null}
        <div>
          <h3 className="components-roster-athlete-card-title">{person.name}</h3>
          <p className="components-roster-athlete-card-text">{isAthlete ? positionLabel(person.position) : person.role}</p>
        </div>
      </div>
    </>
  );

  if (isAthlete) {
    return (
      <Link className={`components-roster-athlete-card-card components-roster-athlete-card-linkCard`} href={`/clube/elenco/${person.slug}`}>
        {content}
      </Link>
    );
  }

  return (
    <article className={`components-roster-athlete-card-card ${variant === "staff" ? "components-roster-athlete-card-staff" : ""}`}>
      {content}
    </article>
  );
}

function positionLabel(position: Athlete["position"]) {
  const labels: Record<Athlete["position"], string> = {
    goleiro: "Goleiro",
    defensor: "Defensor",
    "meio-campo": "Meio-campo",
    atacante: "Atacante",
  };

  return labels[position];
}
