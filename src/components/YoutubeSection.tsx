import styles from "./YoutubeSection.module.css";

const backgroundAsset =
  "https://www.figma.com/api/mcp/asset/a50069e5-f8c9-4717-aae4-0ebd52851391";

const leftBullAsset =
  "https://www.figma.com/api/mcp/asset/acecc7e6-aaa8-4063-9c33-840219de2fd2";

const rightBullAsset =
  "https://www.figma.com/api/mcp/asset/009c5fc4-411d-4fc7-baec-0b2269684018";

const mascotAsset =
  "https://www.figma.com/api/mcp/asset/904abba3-98c1-4f8a-9fac-39752a505439";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/942bae20-9d34-42ec-bfbc-668f7cb8aec3";

const networkAsset =
  "https://www.figma.com/api/mcp/asset/7cac1369-dc70-45c1-abec-c31c48c15e08";

export function YoutubeSection() {
  return (
    <section
      className={styles.section}
      data-node-id="1695:10759"
      data-name="card_touyube"
      aria-labelledby="youtube-title"
    >
      <img className={styles.background} src="/img-fundo.png" alt="" />
      <img className={styles.leftBull} src="/touro_desfoque-02.png" alt="" aria-hidden="true" />
      <img className={styles.rightBull} src="/touro_desfoque-01.png" alt="" aria-hidden="true" />

      <div className={styles.card}>
        <div className={styles.intro}>
          <img className={styles.mascot} src="/touro-youtube.png" alt="" />
          <div>
            <h2 id="youtube-title">o acf sports agora está no YouTube</h2>
            <p>a mesma resenha, ainda mais acessível e com a qualidade de sempre.</p>
          </div>
        </div>

        <div className={styles.ctaBlock}>
          <div>
            <h3>seja membro do canal</h3>
            <p>fique por dentro das novidades no youtube do soberano</p>
          </div>
          <a
            className={styles.button}
            href="http://www.youtube.com/@ACFsportsTV"
            target="_blank"
            rel="noreferrer"
          >
            inscreva-se no canal do youtube
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M9 7H17V15"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </a>
        </div>

        <div className={styles.network}>
          <img src="/boi-logo.png" alt="" />
          <p>
            <span>rede</span>
            ACF soberano
          </p>
        </div>
      </div>
    </section>
  );
}
