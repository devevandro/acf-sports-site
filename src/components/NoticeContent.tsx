import Image from "next/image";

type NoticeContentProps = {
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
};

/**
 * Desktop (> 768px) — Figma: frame "Frame 162881" (1600x1240), title node 3273:18164.
 * The artwork (background, card, mascot, divider, partner logos, social icons) is a single
 * PNG; only the texts are live HTML, positioned over it with the Figma pixel values.
 *
 * Mobile (<= 768px) — there is no Figma, so the same content is stacked in a column. The
 * logo, partner logos, social icons and top-right decoration are small crops of that PNG
 * (`public/comunicado/mobile-*.png`); the card and divider are drawn with CSS.
 */
export function NoticeContent({ socialLinks }: NoticeContentProps) {
  return (
    <section className="components-notice-content-frame" data-name="Frame 162881">
      <Image
        className="components-notice-content-artwork"
        src="/comunicado/comunicado.png"
        alt=""
        fill
        sizes="100vw"
      />

      <img
        className="components-notice-content-mobileDecor"
        src="/comunicado/mobile-top-right.png"
        alt=""
        aria-hidden="true"
        width={360}
        height={560}
      />

      <div className="components-notice-content-stage">
        <img
          className="components-notice-content-mobileLogo"
          src="/comunicado/mobile-logo.png"
          alt="ACF Sports"
          width={170}
          height={110}
        />

        <h1 className="components-notice-content-title" data-node-id="3273:18164">
          O jogo <span>parou</span> por aqui.
        </h1>

        <p className="components-notice-content-subtitle">
          O site do acf sports entrou em pré-temporada para reformulação e melhorias.{" "}
          <br />
          Voltamos em breve, com tudo para o 2027, que será a celebração de <strong>25 anos</strong> do{" "}
          <strong>ACF.</strong>
        </p>

        <div className="components-notice-content-card">
          <div className="components-notice-content-season components-notice-content-seasonClosed">
            <p className="components-notice-content-seasonYear">Temporada 2026</p>
            <p className="components-notice-content-seasonStatus">Encerrada</p>
          </div>

          <div className="components-notice-content-season components-notice-content-seasonNext">
            <p className="components-notice-content-seasonYear components-notice-content-seasonYearNext">
              Temporada 2027
            </p>
            <p className="components-notice-content-seasonBadge">Carregando...</p>
          </div>
        </div>

        <p className="components-notice-content-socialTitle">
          <span>A bola</span> continua rolando nas nossas <span>redes.</span>
        </p>

        <p className="components-notice-content-socialText">
          Não perca nenhuma novidade para o ano que vem, visite nossas redes sociais.
        </p>

        <nav className="components-notice-content-socialLinks" aria-label="Redes sociais do ACF Sports">
          <a
            className="components-notice-content-socialLink components-notice-content-socialInstagram"
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          />
          <a
            className="components-notice-content-socialLink components-notice-content-socialFacebook"
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          />
          <a
            className="components-notice-content-socialLink components-notice-content-socialYoutube"
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          />
        </nav>

        <div className="components-notice-content-mobileFooter">
          <img
            className="components-notice-content-mobilePartners"
            src="/comunicado/mobile-partners.png"
            alt="Parceiros: Vilo e Carol Ferreira Unhas"
            width={290}
            height={115}
          />
          <img
            className="components-notice-content-mobileAcfNaVeia"
            src="/comunicado/mobile-acf-na-veia.png"
            alt="ACF na veia"
            width={130}
            height={60}
          />
        </div>
      </div>
    </section>
  );
}
