import { Fragment } from "react";
import {
  categoryLabel,
  getPlayersByCategory,
  getStaffMembers,
  groupPlayersByPosition,
  type RosterCategory,
} from "@/data/players";
import { AthleteCard } from "./AthleteCard";
import { RosterFilters } from "./RosterFilters";

type RosterPageContentProps = {
  category: RosterCategory;
};

export async function RosterPageContent({ category }: RosterPageContentProps) {
  const [players, staffMembers] = await Promise.all([getPlayersByCategory(category), getStaffMembers()]);
  const positionGroups = groupPlayersByPosition(players, category);

  return (
    <section className="components-roster-roster-page-content-section" data-node-id="1027:2345" data-name="elenco_principal_campo">
      <div className="components-roster-roster-page-content-inner">
        <header className="components-roster-roster-page-content-toolbar">
          <h2>Elenco Principal</h2>
          <RosterFilters activeCategory={category} />
        </header>

        {positionGroups.length === 0 ? (
          <p className="components-roster-roster-page-content-empty">
            Elenco de {categoryLabel(category)} ainda sendo montado. Em breve, mais novidades por aqui.
          </p>
        ) : (
          <div className="components-roster-roster-page-content-positionGroups">
            {positionGroups.map((group, index) => (
              <Fragment key={group.id}>
                {index > 0 ? <hr className="components-roster-roster-page-content-positionDivider" /> : null}
                <section className="components-roster-roster-page-content-positionGroup">
                  <h3>{group.label}</h3>
                  <div className="components-roster-roster-page-content-positionRow">
                    {group.players.map((player) => (
                      <AthleteCard person={player} key={player.id} />
                    ))}
                  </div>
                </section>
              </Fragment>
            ))}
          </div>
        )}

        {staffMembers.length > 0 ? (
          <>
            <hr />
            <section className="components-roster-roster-page-content-staff" aria-labelledby="staff-title">
              <h2 id="staff-title">comissão técnica / staff</h2>
              <div className="components-roster-roster-page-content-grid">
                {staffMembers.map((member) => (
                  <AthleteCard person={member} variant="staff" key={member.id} />
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </section>
  );
}
