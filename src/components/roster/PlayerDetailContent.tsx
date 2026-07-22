import { athletes, getRelatedAthletes, type Athlete } from "@/data/roster";
import styles from "./PlayerDetailContent.module.css";

type PlayerDetailContentProps = {
  athlete: Athlete;
};

const profileFrameAsset = "https://www.figma.com/api/mcp/asset/22d3a957-fdae-4aa6-a714-0e196d3cde0e";
const decoAsset = "https://www.figma.com/api/mcp/asset/116cb7c0-44f3-4c56-9129-78ce14823a6e";
const acfAsset = "https://www.figma.com/api/mcp/asset/c1a208b3-1f93-4cf2-85e9-00d57893ca61";
const crestAsset = "https://www.figma.com/api/mcp/asset/30fbe56a-ab3d-4767-8404-a512b08645e6";
const signatureAsset = "https://www.figma.com/api/mcp/asset/fdf0c764-dcf4-47f1-a805-aac320bc4938";
const socialsAsset = "https://www.figma.com/api/mcp/asset/23b293ce-5d1c-43ad-aeeb-f3ebaca0d152";

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
    <section className={styles.section} data-node-id="640:1971" data-name="elenco-perfil-jogador">
      <div className={styles.inner}>
        <article className={styles.profileCard}>
          <img className={styles.frameAsset} src={profileFrameAsset} alt="" aria-hidden="true" />
          <img className={styles.decoAsset} src={decoAsset} alt="" aria-hidden="true" />
          <img className={styles.acfAsset} src={acfAsset} alt="" aria-hidden="true" />
          <img className={styles.crestAsset} src={crestAsset} alt="" aria-hidden="true" />

          <div className={styles.identity}>
            <p className={styles.firstName}>{firstName}</p>
            <h2>{lastName}</h2>

            <dl className={styles.profileList}>
              <InfoRow label="Apelido" value={athlete.nickname} />
              <InfoRow label="Data de Nascimento" value={athlete.birthDate} />
              <InfoRow label="Pé dominante" value={athlete.dominantFoot} />
            </dl>
          </div>

          <blockquote className={styles.quote}>
            “o tempo ruim vai passar é só uma fase, o sofrimento alimenta mais a sua coragem”
          </blockquote>

          <section className={styles.related} aria-labelledby="related-players-title">
            <div className={styles.relatedHeader}>
              <div>
                <h3 id="related-players-title">{positionGroupTitle(athlete.position)}</h3>
                <span />
              </div>
              <a href={`/clube/elenco?modalidade=${athlete.category}&posicao=${athlete.position}`}>
                Ver mais posições
              </a>
            </div>

            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <MiniPlayerCard athlete={item} key={item.id} />
              ))}
            </div>
          </section>

          <div className={styles.playerFigure}>
            <img src={athlete.image} alt={athlete.name} />
          </div>

          <p className={styles.number}>#{String(athlete.number).padStart(2, "0")}</p>

          <div className={styles.footerMarks} aria-hidden="true">
            <img src={signatureAsset} alt="" />
            <img src={socialsAsset} alt="" />
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
    <a className={styles.miniCard} href={`/clube/elenco/${athlete.slug}`}>
      <img src={athlete.image} alt={athlete.name} />
    </a>
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

function positionGroupTitle(position: Athlete["position"]) {
  const labels: Record<Athlete["position"], string> = {
    goleiro: "goleiros",
    defensor: "zagueiros",
    "meio-campo": "meio-campistas",
    atacante: "atacantes",
  };

  return labels[position];
}
