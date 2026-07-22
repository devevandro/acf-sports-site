import styles from "./SponsorsStrip.module.css";

const sponsorAssets = [
  "https://www.figma.com/api/mcp/asset/a6fac5d8-6588-4106-ae7d-2e289b4d26aa",
  "https://www.figma.com/api/mcp/asset/3c9ba544-d428-4649-b0b1-162b1b008adf",
  "https://www.figma.com/api/mcp/asset/5dbcce94-1534-4f46-ad73-541c80044a4b",
  "https://www.figma.com/api/mcp/asset/5662b2cf-be40-4e78-a800-cb33338f449c",
  "https://www.figma.com/api/mcp/asset/602ff16e-f2bc-48a2-b9c0-9f875cb1df67",
  "https://www.figma.com/api/mcp/asset/b3dbc2d6-7a98-4e96-939b-d465c2252bd9",
  "https://www.figma.com/api/mcp/asset/a04cda42-08d9-45b1-a7f4-5e1a235b6848",
  "https://www.figma.com/api/mcp/asset/19a6a39f-05e9-4dda-958d-a326662ec417"
];

export function SponsorsStrip() {
  return (
    <section
      className={styles.strip}
      data-node-id="1718:11201"
      data-name="patrocinio"
      aria-labelledby="sponsors-title"
    >
      <div className={styles.decorText} aria-hidden="true">
        <span>a</span>
        <span>c</span>
        <span>f</span>
        <strong>acf sports</strong>
      </div>

      <div className={styles.inner}>
        <h2 id="sponsors-title">patrocinadores</h2>
        <div className={styles.track}>
          {[...sponsorAssets, ...sponsorAssets].map((src, index) => (
            <div className={styles.logoCard} key={`${src}-${index}`}>
              <img src={src} alt={`Patrocinador ${(index % sponsorAssets.length) + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
