
const logoAsset = "/simbolo.png";

const chevronAsset =
  "https://www.figma.com/api/mcp/asset/7c8419d2-9f00-4f88-aac3-8e2a5f6095d4";

type MainMenuProps = {
  active?: "home" | "noticias" | "clube" | "contato";
  activeClub?: "historia" | "elenco" | "competicoes" | "patrocinadores";
};

export function MainMenu({ active = "home", activeClub }: MainMenuProps) {
  return (
    <nav className="components-main-menu-menu" data-node-id="2010:10724" data-name="menu">
      <a href="/" aria-label="ACF Sports - início">
        <img className="components-main-menu-logo" src={logoAsset} alt="ACF Sports" />
      </a>

      <div className="components-main-menu-links" aria-label="Menu principal">
        <a className={`components-main-menu-link ${active === "home" ? "components-main-menu-active" : ""}`} href="/">
          <span className="components-main-menu-dot" />
          Home
        </a>
        <a className={`components-main-menu-link ${active === "noticias" ? "components-main-menu-active" : ""}`} href="/noticias">
          <span className="components-main-menu-dot" />
          noticias
        </a>
        <div className={`components-main-menu-clubMenu ${active === "clube" ? "components-main-menu-active" : ""}`}>
          <button className="components-main-menu-linkButton" type="button" aria-haspopup="true">
            <span className="components-main-menu-dot" />
            <span className="components-main-menu-clubLabel">
              clube
              <img className="components-main-menu-chevron" src={chevronAsset} alt="" />
            </span>
          </button>

          <div className="components-main-menu-dropdown" aria-label="Submenu Clube">
            <a
              className={`components-main-menu-dropdownLink ${activeClub === "historia" ? "components-main-menu-dropdownActive" : ""}`}
              href="/clube/historia"
            >
              História
            </a>
            <a
              className={`components-main-menu-dropdownLink ${activeClub === "elenco" ? "components-main-menu-dropdownActive" : ""}`}
              href="/clube/elenco"
            >
              Elenco
            </a>
            <a
              className={`components-main-menu-dropdownLink ${activeClub === "competicoes" ? "components-main-menu-dropdownActive" : ""}`}
              href="/clube/competicoes"
            >
              Competições
            </a>
            <a
              className={`components-main-menu-dropdownLink ${activeClub === "patrocinadores" ? "components-main-menu-dropdownActive" : ""}`}
              href="/clube/patrocinadores"
            >
              Patrocinadores
            </a>
          </div>
        </div>
        <a className={`components-main-menu-link ${active === "contato" ? "components-main-menu-active" : ""}`} href="/contato">
          <span className="components-main-menu-dot" />
          contato
        </a>
      </div>

      <span className="components-main-menu-bottomLine" aria-hidden="true" />
    </nav>
  );
}
