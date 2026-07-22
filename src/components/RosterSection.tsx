import styles from "./RosterSection.module.css";

const athleteCards = Array.from({ length: 5 }, (_, index) => index + 1);

const cardPath = `M8 1
  H248
  Q255 1 255 8
  V121
  L240 136
  V214
  L255 229
  V319
  L128 447
  L1 319
  V229
  L16 214
  V136
  L1 121
  V8
  Q1 1 8 1
  Z`;

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/b847c4b4-aafc-4f55-bb07-941e552cb1d8";

export function RosterSection() {
  return (
    <section
      className={styles.section}
      data-node-id="1278:3855"
      data-name="elenco"
      aria-labelledby="roster-title"
    >
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowBlue} aria-hidden="true" />
      <div className={styles.glowOrange} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 className={styles.title} id="roster-title">
          elenco<span>.</span>
        </h2>

        <div className={styles.athletes}>
          {athleteCards.map((cardNumber) => (
            <article
              className={`${styles.athlete} ${styles[`athlete${cardNumber}`]}`}
              key={cardNumber}
            >
              <svg
                className={styles.athleteCard}
                viewBox="0 0 256 448"
                role="img"
                aria-label={`Atleta ${cardNumber} do ACF Sports`}
              >
                <defs>
                  <clipPath id={`roster-card-shape-${cardNumber}`}>
                    <path d={cardPath} />
                  </clipPath>
                </defs>

                <image
                  href="/player.png"
                  width="256"
                  height="448"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#roster-card-shape-${cardNumber})`}
                />

                <path
                  d={cardPath}
                  fill="none"
                  stroke="#b83e25"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </article>
          ))}
        </div>

        <img className={styles.centerBull} src="/center-bull.jpg" alt="" aria-hidden="true" />

        <a className={styles.button} href="/clube/elenco">
          ver elenco completo
          <img src={arrowAsset} alt="" />
        </a>
      </div>
    </section>
  );
}
