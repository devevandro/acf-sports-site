import styles from "./CompetitionsContent.module.css";

const acfLogo =
  "https://www.figma.com/api/mcp/asset/dd1c5a3c-322d-4586-9085-6aff6a4f1936";

const opponentLogo =
  "https://www.figma.com/api/mcp/asset/ef769cd6-dea1-4e50-9e45-3b73aadcb405";

const nextHomeLogo =
  "https://www.figma.com/api/mcp/asset/1dbc469a-0db9-4ae8-9e79-aab3010d9885";

const nextAwayLogo =
  "https://www.figma.com/api/mcp/asset/4a00cad2-a91d-4824-abd3-6693a2cdcd2e";

const eventIcon =
  "https://www.figma.com/api/mcp/asset/ebc77592-1c65-48b3-a803-6c93bffbc3e2";

const chevronIcon =
  "https://www.figma.com/api/mcp/asset/dd39ac77-3ca7-4c80-8bfa-8d4b531a3c35";

const bullMark =
  "https://www.figma.com/api/mcp/asset/19c89fa7-edaa-491f-bfd7-59ad5139c884";

const previousMatches = [
  {
    score: "1 x 1",
    away: "Real Figueira",
    awayLogo: opponentLogo
  },
  {
    score: "5 x 1",
    away: "Vila Real",
    awayLogo: "https://www.figma.com/api/mcp/asset/56bee846-6ede-4945-b8d1-cc886d78aeac"
  },
  {
    score: "4 x 6",
    away: "EBC Construtor",
    awayLogo: "https://www.figma.com/api/mcp/asset/8fe810e8-815a-4a43-9c54-0649ed922077"
  }
];

const standings = [
  ["01", "ACF Sport Club", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["02", "Azul Clube", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["03", "Guarani", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["04", "Limitados F.C", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["05", "Real Meleiro", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["06", "Storge Deco.", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["07", "Vila Nova", "00", "00", "00", "00", "00", "00", "00", "00"],
  ["08", "Zico Pinturas", "00", "00", "00", "00", "00", "00", "00", "00"]
];

function Team({ logo, name }: { logo: string; name: string }) {
  return (
    <div className={styles.team}>
      <img src={logo} alt="" />
      <span>{name}</span>
    </div>
  );
}

function DetailsLink() {
  return (
    <a className={styles.details} href="#">
      <img src={eventIcon} alt="" />
      Ver mais detalhes da partida
    </a>
  );
}

export function CompetitionsContent() {
  return (
    <section
      className={styles.section}
      data-node-id="640:2508"
      aria-label="Tabelas e jogos"
    >
      <img className={styles.bullMark} src={bullMark} alt="" aria-hidden="true" />

      <div className={styles.inner}>
        <h2>Próxima Partida</h2>
        <article className={styles.nextMatch}>
          <div className={styles.matchTeams}>
            <Team logo={nextHomeLogo} name="ACF Sport Club" />
            <strong>x</strong>
            <Team logo={nextAwayLogo} name="Real Figueira" />
          </div>
          <div className={styles.separator} />
          <div className={styles.matchMeta}>
            <p>Citadino Segunda Divisão / 2026</p>
            <DetailsLink />
          </div>
        </article>

        <hr className={styles.sectionDivider} />

        <div className={styles.contentGrid}>
          <section className={styles.previous} aria-labelledby="previous-title">
            <h2 id="previous-title">Partidas Anteriores</h2>
            <div className={styles.previousList}>
              {previousMatches.map((match) => (
                <article className={styles.previousCard} key={`${match.score}-${match.away}`}>
                  <Team logo={acfLogo} name="ACF Sport Club" />
                  <strong>{match.score}</strong>
                  <Team logo={match.awayLogo} name={match.away} />
                  <div className={styles.cardSeparator} />
                  <div className={styles.previousMeta}>
                    <p>Citadino Segunda Divisão / 2026</p>
                    <DetailsLink />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.tableBlock} aria-labelledby="standings-title">
            <button className={styles.tableTitle} type="button" id="standings-title">
              Citadino Primeira Divisão - Cp
              <img src={chevronIcon} alt="" />
            </button>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Clube</th>
                    <th>Pts</th>
                    <th>Jog</th>
                    <th>Vit</th>
                    <th>Emp</th>
                    <th>Der</th>
                    <th>Gm</th>
                    <th>Gc</th>
                    <th>Sg</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row) => (
                    <tr key={row[0]}>
                      <td>
                        <span className={Number(row[0]) > 6 ? styles.relegated : ""}>{row[0]}</span>
                        {row[1]}
                      </td>
                      {row.slice(2, 10).map((cell, index) => (
                        <td className={index === 0 ? styles.points : ""} key={`${row[0]}-${index}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.legend}>
              <span>
                <i className={styles.promotedDot} />
                Classificados para próxima fase
              </span>
              <span>
                <i className={styles.relegatedDot} />
                Rebaixados para a segunda divisão
              </span>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
