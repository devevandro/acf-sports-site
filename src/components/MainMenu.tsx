import styles from "./MainMenu.module.css";

const logoAsset = "/simbolo.png";

const chevronAsset =
  "https://www.figma.com/api/mcp/asset/7c8419d2-9f00-4f88-aac3-8e2a5f6095d4";

type MainMenuProps = {
  active?: "home" | "noticias" | "clube" | "contato";
  activeClub?: "historia" | "elenco" | "competicoes" | "patrocinadores";
};

export function MainMenu({ active = "home", activeClub }: MainMenuProps) {
  return (
    <nav className={styles.menu} data-node-id="2010:10724" data-name="menu">
      <a href="/" aria-label="ACF Sports - início">
        <img className={styles.logo} src={logoAsset} alt="ACF Sports" />
      </a>

      <div className={styles.links} aria-label="Menu principal">
        <a className={`${styles.link} ${active === "home" ? styles.active : ""}`} href="/">
          <span className={styles.dot} />
          Home
        </a>
        <a className={`${styles.link} ${active === "noticias" ? styles.active : ""}`} href="/noticias">
          <span className={styles.dot} />
          noticias
        </a>
        <div className={`${styles.clubMenu} ${active === "clube" ? styles.active : ""}`}>
          <button className={styles.linkButton} type="button" aria-haspopup="true">
            <span className={styles.dot} />
            <span className={styles.clubLabel}>
              clube
              <img className={styles.chevron} src={chevronAsset} alt="" />
            </span>
          </button>

          <div className={styles.dropdown} aria-label="Submenu Clube">
            <a
              className={`${styles.dropdownLink} ${activeClub === "historia" ? styles.dropdownActive : ""}`}
              href="/clube/historia"
            >
              História
            </a>
            <a
              className={`${styles.dropdownLink} ${activeClub === "elenco" ? styles.dropdownActive : ""}`}
              href="/clube/elenco"
            >
              Elenco
            </a>
            <a
              className={`${styles.dropdownLink} ${activeClub === "competicoes" ? styles.dropdownActive : ""}`}
              href="/clube/competicoes"
            >
              Competições
            </a>
            <a
              className={`${styles.dropdownLink} ${activeClub === "patrocinadores" ? styles.dropdownActive : ""}`}
              href="/clube/patrocinadores"
            >
              Patrocinadores
            </a>
          </div>
        </div>
        <a className={`${styles.link} ${active === "contato" ? styles.active : ""}`} href="/contato">
          <span className={styles.dot} />
          contato
        </a>
      </div>

      <span className={styles.bottomLine} aria-hidden="true" />
    </nav>
  );
}
