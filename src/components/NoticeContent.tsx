import Image from "next/image";

type NoticeContentProps = {
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
};

/**
 * Figma: frame "Frame 162881" (1600x1240), title node 3273:18164.
 * The artwork (background, card, mascot, divider, partner logos, social icons) is a single
 * PNG; only the texts are live HTML, positioned over it with the Figma pixel values.
 */
export function NoticeContent({ socialLinks }: NoticeContentProps) {
  return (
    <section className="components-notice-content-frame" data-name="Frame 162881">
      <Image
        className="components-notice-content-artwork"
        src="/comunicado/comunicado.png"
        alt=""
        fill
        priority
        sizes="100vw"
      />

      <div className="components-notice-content-stage">
        <h1 className="components-notice-content-title" data-node-id="3273:18164">
          O jogo <span>parou</span> por aqui.
        </h1>

        <p className="components-notice-content-subtitle">
          O site do acf sports entrou em pré-temporada para reformulação e melhorias.
          <br />
          Voltamos em breve, com tudo para o 2027, que será a celebração de <strong>25 anos</strong> do{" "}
          <strong>ACF.</strong>
        </p>

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
      </div>
    </section>
  );
}
