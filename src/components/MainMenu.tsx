
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const logoAsset = "/header/symbol.png";

type MainMenuProps = {
  active?: "home" | "news" | "club" | "sponsors" | "contact";
  activeClub?: "history" | "roster" | "competitions";
};

export function MainMenu({ active = "home", activeClub }: MainMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false);
  const clubMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!clubDropdownOpen) return;

    function handleOutsideInteraction(event: MouseEvent | FocusEvent) {
      if (!clubMenuRef.current?.contains(event.target as Node)) {
        setClubDropdownOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setClubDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("focusin", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("focusin", handleOutsideInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [clubDropdownOpen]);

  return (
    <>
      <nav className="components-main-menu-menu" data-node-id="2010:10724" data-name="menu">
        <Link href="/" aria-label="ACF Sports - início">
          <img className="components-main-menu-logo" src={logoAsset} alt="ACF Sports" />
        </Link>

        <button
          className="md:hidden text-white p-2 focus:outline-none"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`components-main-menu-links ${mobileOpen ? "components-main-menu-linksOpen" : ""}`} aria-label="Menu principal">
          <Link
            className={`components-main-menu-link ${active === "home" ? "components-main-menu-active" : ""}`}
            href="/"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            Home
          </Link>
          <Link
            className={`components-main-menu-link ${active === "news" ? "components-main-menu-active" : ""}`}
            href="/noticias"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            notícias
          </Link>
          <div
            className={`components-main-menu-clubMenu ${active === "club" ? "components-main-menu-active" : ""}`}
            ref={clubMenuRef}
          >
            <button
              className="components-main-menu-linkButton"
              type="button"
              aria-haspopup="true"
              aria-expanded={clubDropdownOpen}
              onClick={() => setClubDropdownOpen((open) => !open)}
            >
              <span className="components-main-menu-dot" />
              <span className="components-main-menu-clubLabel">
                clube
                <ChevronDown
                  size={14}
                  className={`components-main-menu-chevron ${clubDropdownOpen ? "components-main-menu-chevronOpen" : ""}`}
                />
              </span>
            </button>

            <div
              className={`components-main-menu-dropdown ${clubDropdownOpen ? "components-main-menu-dropdownOpen" : ""}`}
              aria-label="Submenu Clube"
            >
              <Link
                className={`components-main-menu-dropdownLink ${activeClub === "history" ? "components-main-menu-dropdownActive" : ""}`}
                href="/clube/historia"
                onClick={() => {
                  setMobileOpen(false);
                  setClubDropdownOpen(false);
                }}
              >
                História
              </Link>
              <Link
                className={`components-main-menu-dropdownLink ${activeClub === "roster" ? "components-main-menu-dropdownActive" : ""}`}
                href="/clube/elenco"
                onClick={() => {
                  setMobileOpen(false);
                  setClubDropdownOpen(false);
                }}
              >
                Elenco
              </Link>
              <Link
                className={`components-main-menu-dropdownLink ${activeClub === "competitions" ? "components-main-menu-dropdownActive" : ""}`}
                href="/clube/competicoes"
                onClick={() => {
                  setMobileOpen(false);
                  setClubDropdownOpen(false);
                }}
              >
                Competições
              </Link>
            </div>
          </div>
          <Link
            className={`components-main-menu-link ${active === "sponsors" ? "components-main-menu-active" : ""}`}
            href="/clube/patrocinadores"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            patrocinadores
          </Link>
          <Link
            className={`components-main-menu-link ${active === "contact" ? "components-main-menu-active" : ""}`}
            href="/contato"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            contato
          </Link>
        </div>

        <span className="components-main-menu-bottomLine" aria-hidden="true" />
      </nav>
      <div className="components-main-menu-spacer" aria-hidden="true" />
    </>
  );
}
