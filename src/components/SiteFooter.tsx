
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getTeamInfo } from "@/data/teamInfo";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Notícias", href: "/noticias" },
  { name: "Clube", href: "/clube/historia" },
  { name: "Contato", href: "/contato" }
];

export async function SiteFooter() {
  const teamInfo = await getTeamInfo();

  return (
    <footer className="components-site-footer-footer">
      <img className="components-site-footer-backgroundMascot" src="/footer/sovereign-footer.png" alt="" aria-hidden="true" />

      <div className="components-site-footer-columns">
        <section className="components-site-footer-column">
          <h2>Informações</h2>
          <nav className="components-site-footer-menu text-acf-gray" aria-label="Informações do rodapé">
            {menuLinks.map((item) => (
              <Link href={item.href} key={item.name} className="inline-flex items-center gap-1">
                {item.name}
                {item.name === "Clube" ? <ChevronDown size={14} /> : null}
              </Link>
            ))}
          </nav>
        </section>

        <section className="components-site-footer-column text-acf-gray w-100">
          <h2>mídias sociais</h2>
          <a className="components-site-footer-acfTv" href={teamInfo.youtube} target="_blank" rel="noreferrer">
            Soberano TV
          </a>
          <div className="components-site-footer-socials text-acf-gray">
            <a href={teamInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/footer/instagram.png" alt="Instagram" />
            </a>
            <a href={teamInfo.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="/footer/facebook.png" alt="Facebook" />
            </a>
            <a href={teamInfo.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <img src="/footer/youtube.png" alt="YouTube" />
            </a>
          </div>
        </section>

        <section className="components-site-footer-contact">
          <h2>Contato</h2>
          <p>
            {teamInfo.phone}
            <br />
            {teamInfo.email}
          </p>
          <hr />
          <p>{teamInfo.address}</p>
          <hr />
        </section>
      </div>

      <div className="components-site-footer-brand">
        <div className="components-site-footer-brandImages">
          <img src="/footer/acf-footer-logo.png" alt="ACF Sports" />
        </div>
        <p>© ACF Sports — Alguns direitos reservados</p>
      </div>

      <a className="components-site-footer-backTop" href="#" aria-label="Voltar ao topo">
        <img src="/footer/top-arrow.png" alt="" />
      </a>
    </footer>
  );
}

