import type { RosterPlayerCard, RosterStaffMember } from "@/data/players";

type AthleteCardProps = {
  person: RosterPlayerCard | RosterStaffMember;
  variant?: "athlete" | "staff";
};

export function AthleteCard({ person, variant = "athlete" }: AthleteCardProps) {
  const isPlayer = "number" in person;

  return (
    <article className={`components-roster-athlete-card-card ${variant === "staff" ? "components-roster-athlete-card-staff" : ""}`}>
      <img className="components-roster-athlete-card-image" src="/squad/player-placeholder.png" alt={person.name} />
      <div className="components-roster-athlete-card-info">
        {isPlayer ? (
          <span className="components-roster-athlete-card-label">{person.number}</span>
        ) : (
          <img className="components-roster-athlete-card-staffIcon" src="/header/symbol.png" alt="" aria-hidden="true" />
        )}
        <div>
          <h3 className="components-roster-athlete-card-title">{person.nickname}</h3>
          <p className="components-roster-athlete-card-text">{isPlayer ? person.positionLabel : person.role}</p>
        </div>
      </div>
    </article>
  );
}
