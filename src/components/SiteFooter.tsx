import styles from "./SiteFooter.module.css";

const mascotAsset =
  "https://www.figma.com/api/mcp/asset/06d114a6-53dc-4bf9-9a91-450d0fa2bb11";

const logoLeftAsset =
  "https://www.figma.com/api/mcp/asset/b8951d2a-28f0-4650-a32a-179012c54361";

const logoRightAsset =
  "https://www.figma.com/api/mcp/asset/0f338042-57c9-4c76-bd80-5f96d03ff5c3";

const instagramAsset =
  "https://www.figma.com/api/mcp/asset/d11ea4e5-25dd-4039-8562-4602ca18dd45";

const facebookAsset =
  "https://www.figma.com/api/mcp/asset/092561bf-23bb-4de9-b005-09e4344b30bf";

const youtubeAsset =
  "https://www.figma.com/api/mcp/asset/102eea08-1c53-430d-9da3-a1c4dfeda746";

const chevronAsset =
  "https://www.figma.com/api/mcp/asset/781d0216-011a-4c60-ab67-7fb4d595c1c2";

const topArrowAsset =
  "https://www.figma.com/api/mcp/asset/731a83fa-9275-4a58-901b-83987ff23428";

const menuLinks = ["Home", "Notícias", "Clube", "Contato"];

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-node-id="1675:15287" data-name="footer">
      <img className={styles.backgroundMascot} src="/soberano-rodape.png" alt="" aria-hidden="true" />

      <div className={styles.columns}>
        <section className={styles.column}>
          <h2>Informações</h2>
          <nav className={styles.menu} aria-label="Informações do rodapé">
            {menuLinks.map((link) => (
              <a
                href={
                  link === "Notícias"
                    ? "/noticias"
                    : link === "Clube"
                      ? "/clube/competicoes"
                      : link === "Contato"
                        ? "/contato"
                        : "/"
                }
                key={link}
              >
                {link}
                {link === "Clube" ? <img src={chevronAsset} alt="" /> : null}
              </a>
            ))}
          </nav>
        </section>

        <section className={styles.column}>
          <h2>social mídias</h2>
          <a className={styles.acfTv} href="http://www.youtube.com/@ACFsportsTV" target="_blank" rel="noreferrer">
            ACF TV
          </a>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/footer/insta.png" alt="" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="/footer/face.png" alt="" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
              <img src="/footer/youtube.png" alt="" />
            </a>
          </div>
        </section>

        <section className={styles.contact}>
          <h2>Contato</h2>
          <p>
            +55 43 99999-9999
            <br />
            contato@bikcraft.com
          </p>
          <hr />
          <p>
            Rua: Maria Staiger Vilar, 59 - Fortunato Sibim
            <br />
            Botafogo - RJ
          </p>
          <hr />
        </section>
      </div>

      <div className={styles.brand}>
        <div className={styles.brandImages}>
          <img src="/acf-logo-rodape.png" alt="" />
        </div>
        <p>E©F © Alguns direitos reservados</p>
      </div>

      <a className={styles.backTop} href="#" aria-label="Voltar ao topo">
        <img src="/footer/top-arrow.png" alt="" />
      </a>
    </footer>
  );
}
