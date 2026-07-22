import { filterAthletes, staffMembers, type RosterCategory, type RosterPosition } from "@/data/roster";
import { AthleteCard } from "./AthleteCard";
import { RosterFilters } from "./RosterFilters";
import styles from "./RosterPageContent.module.css";

type RosterPageContentProps = {
  category: RosterCategory | "todos";
  position: RosterPosition;
};

export function RosterPageContent({ category, position }: RosterPageContentProps) {
  const filteredAthletes = filterAthletes(position, category);

  return (
    <section className={styles.section} data-node-id="1027:2345" data-name="elenco_principal_campo">
      <div className={styles.inner}>
        <header className={styles.toolbar}>
          <h2>Elenco Principal</h2>
          <RosterFilters activeCategory={category} activePosition={position} />
        </header>

        <div className={styles.grid} aria-label="Atletas">
          {filteredAthletes.map((athlete) => (
            <AthleteCard person={athlete} key={athlete.id} />
          ))}
        </div>

        <hr />

        <section className={styles.staff} aria-labelledby="staff-title">
          <h2 id="staff-title">comissão técnica / staff</h2>
          <div className={styles.grid}>
            {staffMembers.map((member) => (
              <AthleteCard person={member} variant="staff" key={member.id} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
