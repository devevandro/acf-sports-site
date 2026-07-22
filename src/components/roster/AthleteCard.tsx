import type { Athlete, StaffMember } from "@/data/roster";
import styles from "./AthleteCard.module.css";

type AthleteCardProps = {
  person: Athlete | StaffMember;
  variant?: "athlete" | "staff";
};

export function AthleteCard({ person, variant = "athlete" }: AthleteCardProps) {
  const isAthlete = "position" in person;
  const content = (
    <>
      <img className={styles.image} src="/jogador.png" alt={person.name} />
      <div className={styles.info}>
        {isAthlete ? <span className={styles.label}>{person.number}</span> : null}
        <div>
          <h3 className={styles.title}>{person.name}</h3>
          <p className={styles.text}>{isAthlete ? positionLabel(person.position) : person.role}</p>
        </div>
      </div>
    </>
  );

  if (isAthlete) {
    return (
      <a className={`${styles.card} ${styles.linkCard}`} href={`/clube/elenco/${person.slug}`}>
        {content}
      </a>
    );
  }

  return (
    <article className={`${styles.card} ${variant === "staff" ? styles.staff : ""}`}>
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
