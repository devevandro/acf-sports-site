import { getRelatedNews, type NewsItem } from "@/data/news";
import styles from "./NewsDetail.module.css";

const arrowRightAsset =
  "https://www.figma.com/api/mcp/asset/686c6feb-316b-4b23-a9be-82c25fca4ec8";

const arrowEndAsset =
  "https://www.figma.com/api/mcp/asset/d2ee2f79-c0b5-489d-96c5-3ab5915f8d93";

export function NewsDetail({ news }: { news: NewsItem }) {
  const relatedNews = getRelatedNews(news.slug);

  return (
    <article className={styles.article} data-node-id="1564:11705" data-name="detalhe-noticia">
      <div className={styles.inner}>
        <header className={styles.articleHeader}>
          <p>{news.category}</p>
          <h2>{news.title}</h2>
          <span>{news.description}</span>
        </header>

        <NewsImage item={news} variant="hero" />

        <div className={styles.caption}>
          <span>{news.caption}</span>
          <span>{news.date}</span>
        </div>

        <div className={styles.body}>
          {news.body.slice(0, 3).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {news.quote ? <blockquote>{news.quote}</blockquote> : null}
          {news.body.slice(3).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <footer>
            <span>Escrito por {news.author}</span>
            <span>{news.date}</span>
          </footer>
        </div>

        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title">Mais notícias sobre o ACF</h2>
          <div className={styles.relatedList}>
            {relatedNews.map((item) => (
              <a className={styles.relatedCard} href={`/noticias/${item.slug}`} key={item.slug}>
                <NewsImage item={item} variant="related" />
                <div className={styles.relatedCopy}>
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                  <div>
                    <small>Por {item.author}</small>
                    <small>{item.date}</small>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <nav className={styles.pagination} aria-label="Paginação de notícias relacionadas">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <a className={page === 1 ? styles.currentPage : ""} href="/noticias" key={page}>
                {page}
              </a>
            ))}
            <span>...</span>
            <a className={styles.iconPage} href="/noticias" aria-label="Próxima página">
              <img src={arrowRightAsset} alt="" />
            </a>
            <a className={styles.iconPage} href="/noticias" aria-label="Última página">
              <img src={arrowEndAsset} alt="" />
            </a>
          </nav>
        </section>
      </div>
    </article>
  );
}

function NewsImage({ item, variant }: { item: NewsItem; variant: "hero" | "related" }) {
  const className = variant === "hero" ? styles.heroImage : styles.relatedImage;

  if (item.image.type === "layered") {
    return (
      <div className={`${className} ${styles.layeredImage}`}>
        <img className={styles.layeredBackground} src={item.image.background} alt="" />
        <img className={styles.layeredPlayers} src={item.image.foreground} alt={item.image.alt} />
      </div>
    );
  }

  if (item.image.type === "mascot") {
    return (
      <div className={`${className} ${styles.mascotImage}`}>
        <img src={item.image.src} alt={item.image.alt} />
      </div>
    );
  }

  return <img className={className} src={item.image.src} alt={item.image.alt} />;
}
