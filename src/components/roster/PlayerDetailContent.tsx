import Link from "next/link";
import { athletes, getRelatedAthletes, type Athlete } from "@/data/roster";

type PlayerDetailContentProps = {
  athlete: Athlete;
};

const profileFrameAsset = "/squad/player-profile.png";
const crestAsset = "/header/symbol.png";
const playerProfileAsset = "/squad/player.png";

export function PlayerDetailContent({ athlete }: PlayerDetailContentProps) {
  const related = getRelatedAthletes(athlete)
    .concat(athletes)
    .filter(
      (item, index, list) =>
        item.slug !== athlete.slug &&
        item.category === athlete.category &&
        item.position === athlete.position &&
        list.findIndex((candidate) => candidate.slug === item.slug) === index,
    )
    .slice(0, 3);
  const position = positionLabel(athlete.position);
  const [firstName, ...lastNameParts] = athlete.name.split(" ");
  const lastName = lastNameParts.join(" ") || athlete.nickname;

  return (
    <section className="components-roster-player-detail-content-section" data-node-id="2394:20847" data-name="elenco-perfil-jogador">
      <div className="components-roster-player-detail-content-inner">
        <article className="components-roster-player-detail-content-profileCard">
          <img className="components-roster-player-detail-content-frameAsset" src={profileFrameAsset} alt="" aria-hidden="true" />
          <img className="components-roster-player-detail-content-crestAsset" src={crestAsset} alt="" aria-hidden="true" />

          <div className="components-roster-player-detail-content-identity">
            <p className="components-roster-player-detail-content-firstName">{firstName}</p>
            <h2>{lastName}</h2>

            <dl className="components-roster-player-detail-content-profileList">
              <InfoRow label="Apelido" value={athlete.nickname} />
              <InfoRow label="Data de Nascimento" value={athlete.birthDate} />
              <InfoRow label="Pé dominante" value={athlete.dominantFoot} />
            </dl>
          </div>

          <blockquote className="components-roster-player-detail-content-quote">
            “o tempo ruim vai passar é só uma fase, o sofrimento alimenta mais a sua coragem”
          </blockquote>

          <section className="components-roster-player-detail-content-related" aria-labelledby="related-players-title">
            <div className="components-roster-player-detail-content-relatedHeader">
              <div>
                <h3 id="related-players-title">{positionGroupTitle(athlete.position)}</h3>
                <span />
              </div>
              <Link href={`/clube/elenco?modalidade=${athlete.category}&posicao=${athlete.position}`}>
                Ver mais posições
              </Link>
            </div>

            <div className="components-roster-player-detail-content-relatedGrid">
              {related.map((item) => (
                <MiniPlayerCard athlete={item} key={item.id} />
              ))}
            </div>
          </section>

          <div className="components-roster-player-detail-content-playerFigure">
            <img src={playerProfileAsset} alt={athlete.name} />
          </div>

          <p className="components-roster-player-detail-content-number">#{String(athlete.number).padStart(2, "0")}</p>

          <div className="components-roster-player-detail-content-footerMarks" aria-hidden="true">
            <span className="components-roster-player-detail-content-signature">ACF SPORTS #NAVEIA</span>
            <div className="components-roster-player-detail-content-socialsList">
              <span>INSTAGRAM</span>
              <span>FACEBOOK</span>
              <span>YOUTUBE</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function MiniPlayerCard({ athlete }: { athlete: Athlete }) {
  return (
    <Link className="components-roster-player-detail-content-miniCard" href={`/clube/elenco/${athlete.slug}`}>
      <img src={athlete.image} alt={athlete.name} />
    </Link>
  );
}

function positionLabel(position: Athlete["position"]) {
  const labels: Record<Athlete["position"], string> = {
    goleiro: "Goleiro",
    defensor: "Defensor",
    "meio-campo": "Meio-campo",
    atacante: "Atacante",
    fixo: "Fixo",
    ala: "Ala",
    pivo: "Pivô",
  };

  return labels[position];
}

function positionGroupTitle(position: Athlete["position"]) {
  const labels: Record<Athlete["position"], string> = {
    goleiro: "goleiros",
    defensor: "zagueiros",
    "meio-campo": "meio-campistas",
    atacante: "atacantes",
    fixo: "fixos",
    ala: "alas",
    pivo: "pivôs",
  };

  return labels[position];
}
