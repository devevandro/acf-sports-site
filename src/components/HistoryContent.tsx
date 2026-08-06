
const assets = {
  hero: "/history/hero.png",
  stamp: "/header/symbol.png",
  bull: "/history/bull.png",
  symbol: "/header/symbol.png",
};

const historyParagraphs = [
  "Fundado no dia 16 de janeiro de 2002, inicialmente como equipe de futsal apenas, com o nome de Juventus Futsal, 3 garotos que tinham o sonho de ter a sua própria equipe e assim poder disputar campeonatos.",
  "No ano de 2004 surgiu também a equipe de campo, mas como já existia uma equipe com o nome de Juventus na cidade resolveram colocar o nome do time de futebol de campo de ACF, no mesmo ano por sempre serem confundidos com a equipe do Juventus, resolveram mudar o nome da equipe para Ajax, porém logo foi mudado para ACF também e a partir deste ano passamos a se chamar ACF tanto no futsal quanto no futebol de campo.",
  "A letras ACF nada mais é que uma homenagem que fizemos ao grande Tonhão do Cascavel (Antônio Carlos Ferreira), dai o nome da equipe.",
  "Nosso blog tem por objetivo mostrar todas e qualquer atividades relacionadas ao time, tanto no futsal quanto no futebol de campo ou outros eventos esportivos que a equipe estiver presente.",
];

const symbols = [
  { year: "Ano 2000", label: "Primeiro símbolo", tag: "2000" },
  { year: "Ano 2004", label: "Segundo Símbolo", tag: "2004" },
  { year: "Ano 2010", label: "Terceiro Símbolo", tag: "2010" },
  { year: "Atual", label: "Símbolo Atual", tag: "Atual" },
];

export function HistoryContent() {
  return (
    <section className="components-history-content-section" data-node-id="2394:9599" data-name="historia">
      <div className="components-history-content-inner">
        <SectionTitle eyebrow="acf sports" title="A origem do nome" />

        <figure className="components-history-content-heroFigure">
          <div className="components-history-content-heroImage">
            <img src={assets.hero} alt="Antônio Carlos Ferreira com a equipe ACF Sports" />
          </div>
          <figcaption>
            <span>Na imagem, Antônio Carlos Ferreira.</span>
            <span>05 de janeiro de 2026 às 11:45</span>
          </figcaption>
        </figure>

        <ArticleText />

        <section className="components-history-content-symbols" aria-labelledby="symbols-title">
          <SectionTitle eyebrow="símbolos" title="O desenvolvimento do nosso símbolo" id="symbols-title" />
          <div className="components-history-content-symbolGrid">
            {symbols.map((item) => (
              <article className="components-history-content-symbolCard" key={item.label}>
                <div className="components-history-content-symbolBox">
                  <img src={assets.symbol} alt={`Logo ACF Sports - ${item.label}`} />
                  <span className="components-history-content-symbolBadge">{item.tag}</span>
                </div>
                <p>{`${item.label} ${item.year}`}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="components-history-content-mascot" aria-labelledby="mascot-title">
          <SectionTitle eyebrow="mascote" title="A história por trás do Touro" id="mascot-title" />
          <div className="components-history-content-mascotImage">
            <div className="components-history-content-glow" aria-hidden="true" />
            <img className="components-history-content-bull" src={assets.bull} alt="Mascote touro da ACF Sports" />
          </div>
          <ArticleText emphasizeLast />
        </section>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="components-history-content-titleBlock">
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function ArticleText({ emphasizeLast = false }: { emphasizeLast?: boolean }) {
  return (
    <div className="components-history-content-articleText">
      {historyParagraphs.map((paragraph, index) => {
        const isLast = index === historyParagraphs.length - 1;
        return (
          <p className={emphasizeLast && isLast ? "components-history-content-emphasis" : ""} key={paragraph}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}

