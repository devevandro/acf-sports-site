import Link from "next/link";
import { categoryLabel, positionLabelFor, type RosterPlayer } from "@/data/players";

type PlayerDetailContentProps = {
  player: RosterPlayer;
};

const frameAsset = "/squad/player-profile.png";
const frameAssetMobile = "/squad/player-profile-mob.png";
const playerPhotoAsset = "/squad/player-placeholder.png";

const socialIcons: Record<string, string> = {
  facebook: "/squad/facebook-azul.svg",
  instagram: "/squad/insta-azul.png",
  youtube: "/footer/youtube.png",
  tiktok: "/squad/tiktok-azul.svg",
};

export function PlayerDetailContent({ player }: PlayerDetailContentProps) {
  return (
    <section className="components-roster-player-detail-content-section" data-node-id="2394:20847" data-name="elenco-perfil-jogador">
      <div className="components-roster-player-detail-content-inner">
        <header className="components-roster-player-detail-content-toolbar">
          <h2>Perfil do Atleta</h2>
          <Link href={`/clube/elenco?modalidade=${player.category}`}>Elenco →</Link>
        </header>

        <article className="components-roster-player-detail-content-profileCard">
          <picture>
            <source media="(max-width: 768px)" srcSet={frameAssetMobile} />
            <img className="components-roster-player-detail-content-frameAsset" src={frameAsset} alt="" aria-hidden="true" />
          </picture>

          <div className="components-roster-player-detail-content-identity">
            <img src="/squad/nick-name.png" alt="" aria-hidden="true" />
            <h2>{player.nickname}</h2>

            <dl className="components-roster-player-detail-content-profileList">
              <InfoRow label="Nome" value={player.name} />
              {player.birthday ? <InfoRow label="Data de Nascimento" value={player.birthday} /> : null}
              {player.categories.length > 0 ? (
                <InfoRow label="Modalidade" value={formatCategories(player.categories)} />
              ) : null}
              {player.dominantFoot ? <InfoRow label="Pé Dominante" value={player.dominantFoot} /> : null}
              {player.positionCampo ? (
                <InfoRow label="Posição Futebol" value={positionLabelFor(player.positionCampo, "campo")} />
              ) : null}
              {player.positionFutsal ? (
                <InfoRow label="Posição Futsal" value={positionLabelFor(player.positionFutsal, "futsal")} />
              ) : null}
            </dl>

            {player.socialLinks.length > 0 ? (
              <div className="components-roster-player-detail-content-socialsList">
                {player.socialLinks.map((link) => {
                  const icon = socialIcons[link.platform.toLowerCase()];
                  if (!icon) return null;

                  return (
                    <a href={link.url} target="_blank" rel="noreferrer" key={link.platform} aria-label={link.platform}>
                      <img src={icon} alt="" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="components-roster-player-detail-content-playerFigure">
            <img src={playerPhotoAsset} alt={player.name} />
          </div>

          <p className="components-roster-player-detail-content-number">#{formatNumber(player.number)}</p>
        </article>

        {player.quote ? <blockquote className="components-roster-player-detail-content-quote">“{player.quote}”</blockquote> : null}
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[#ffffff]">{label}</dt>
      <dd className="text-[#FF7A5C]">{value}</dd>
    </div>
  );
}

function formatNumber(value: string) {
  return /^\d+$/.test(value) ? value.padStart(2, "0") : value;
}

function formatCategories(categories: RosterPlayer["categories"]) {
  return categories
    .map((category) => categoryLabel(category))
    .map((label) => label.charAt(0).toUpperCase() + label.slice(1))
    .join(" / ");
}
