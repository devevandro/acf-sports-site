import { formatNewsDate } from "@/data/news";
import type { TeamHistory } from "@/data/teamHistory";

const assets = {
  symbol: "/header/symbol.png",
};

const symbols = [
  { year: "Ano 2000", label: "Primeiro símbolo", tag: "2000" },
  { year: "Ano 2004", label: "Segundo Símbolo", tag: "2004" },
  { year: "Ano 2010", label: "Terceiro Símbolo", tag: "2010" },
  { year: "Atual", label: "Símbolo Atual", tag: "Atual" },
];

export function HistoryContent({ history }: { history: TeamHistory }) {
  const hasSymbol = history.symbol.trim().length > 0;
  const hasMascot = history.mascot.trim().length > 0 || history.mascotImages.length > 0;
  const mascotImage = history.mascotImages[0];

  return (
    <section className="components-history-content-section" data-node-id="2394:9599" data-name="historia">
      <div className="components-history-content-inner">
        <SectionTitle eyebrow="acf sports" title={history.title} />

        <figure className="components-history-content-heroFigure">
          <div className="components-history-content-heroImage">
            <img src={history.contentImage} alt="Antônio Carlos Ferreira com a equipe ACF Sports" />
          </div>
          <figcaption>
            <span>Na imagem, Antônio Carlos Ferreira.</span>
            <span>{formatNewsDate(history.createdAt)}</span>
          </figcaption>
        </figure>

        <div
          className="components-history-content-articleText"
          dangerouslySetInnerHTML={{ __html: history.content }}
        />

        {hasSymbol && (
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
            <div
              className="components-history-content-articleText"
              dangerouslySetInnerHTML={{ __html: history.symbol }}
            />
          </section>
        )}

        {hasMascot && (
          <section className="components-history-content-mascot" aria-labelledby="mascot-title">
            <SectionTitle eyebrow="mascote" title="A história por trás do Touro" id="mascot-title" />
            {mascotImage && (
              <div className="components-history-content-mascotImage">
                <div className="components-history-content-glow" aria-hidden="true" />
                <img className="components-history-content-bull" src={mascotImage} alt="Mascote touro da ACF Sports" />
              </div>
            )}
            <div
              className="components-history-content-articleText"
              dangerouslySetInnerHTML={{ __html: history.mascot }}
            />
          </section>
        )}
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
