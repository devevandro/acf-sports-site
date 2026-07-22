import styles from "./StandingsPanel.module.css";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/6609ea1e-247d-4096-af35-3a2b2173c8b0";

const chevronAsset =
  "https://www.figma.com/api/mcp/asset/45ea76e6-1603-40fe-9abd-2378156ec2eb";

const rows = [
  ["01", "ACF S.C"],
  ["02", "EBC Cons"],
  ["03", "DM Tech"],
  ["04", "Real Mel"],
  ["05", "Azul Clube"],
  ["06", "Sibim Unt"]
];

export function StandingsPanel() {
  return (
    <aside className={styles.panel} data-node-id="1888:10656" aria-labelledby="standings-title">
      <header className={styles.header}>
        <h2 id="standings-title">
          tabelas<span>.</span>
        </h2>
        <a href="#tabelas">
          ver mais
          <img src={arrowAsset} alt="" />
        </a>
      </header>

      <div className={styles.tableCard}>
        <button className={styles.selectButton} type="button">
          Segunda Divisão
          <img src={chevronAsset} alt="" />
        </button>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.clubColumn}>Clubes</th>
              <th>Pts</th>
              <th>Jgs</th>
              <th>Sgs</th>
              <th>Vit</th>
              <th>De</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([position, club]) => (
              <tr key={position}>
                <td className={styles.clubColumn}>
                  <span>{position}</span>
                  {club}
                </td>
                <td className={styles.points}>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
