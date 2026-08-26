
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Plus, X } from "lucide-react";

const logoAsset = "/header/symbol.png";
const whatsappAsset = "/contact/whatsapp.png";
const instagramAsset = "/contact/insta.png";

type MainMenuProps = {
  active?: "home" | "news" | "club" | "sponsors" | "contact";
  activeClub?: "history" | "roster" | "competitions";
  logoSrc?: string;
};

export function MainMenu({ active = "home", activeClub, logoSrc = logoAsset }: MainMenuProps) {
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
        <button
          className="components-main-menu-toggle md:hidden"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <Link className="components-main-menu-logoLink" href="/" aria-label="ACF Sports - início">
          <img className="components-main-menu-logo" src={logoSrc} alt="ACF Sports" />
        </Link>

        <div className="components-main-menu-mobileActions md:hidden">
          <a href="https://wa.me/5543991802793" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <img src={whatsappAsset} alt="" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src={instagramAsset} alt="" />
          </a>
        </div>

        <div className={`components-main-menu-links ${mobileOpen ? "components-main-menu-linksOpen" : ""}`} aria-label="Menu principal">
          <Link
            className={`components-main-menu-link ${active === "home" ? "components-main-menu-active" : ""}`}
            data-active={active === "home"}
            href="/"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            Home
          </Link>
          <Link
            className={`components-main-menu-link ${active === "news" ? "components-main-menu-active" : ""}`}
            data-active={active === "news"}
            href="/noticias"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            notícias
          </Link>
          <div
            className={`components-main-menu-clubMenu ${active === "club" ? "components-main-menu-active" : ""}`}
            data-active={active === "club"}
            ref={clubMenuRef}
            onMouseEnter={() => setClubDropdownOpen(true)}
            onMouseLeave={() => setClubDropdownOpen(false)}
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
              <span className="components-main-menu-accordionIcon" aria-hidden="true">
                {clubDropdownOpen ? <X size={16} /> : <Plus size={16} />}
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
            data-active={active === "sponsors"}
            href="/clube/patrocinadores"
            onClick={() => setMobileOpen(false)}
          >
            <span className="components-main-menu-dot" />
            patrocinadores
          </Link>
          <Link
            className={`components-main-menu-link ${active === "contact" ? "components-main-menu-active" : ""}`}
            data-active={active === "contact"}
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
