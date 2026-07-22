import { getRelatedNews, type NewsItem } from "@/data/news";

const arrowRightAsset =
  "https://www.figma.com/api/mcp/asset/686c6feb-316b-4b23-a9be-82c25fca4ec8";

const arrowEndAsset =
  "https://www.figma.com/api/mcp/asset/d2ee2f79-c0b5-489d-96c5-3ab5915f8d93";

export function NewsDetail({ news }: { news: NewsItem }) {
  const relatedNews = getRelatedNews(news.slug);

  return (
    <article className="components-news-detail-article" data-node-id="1564:11705" data-name="detalhe-noticia">
      <div className="components-news-detail-inner">
        <header className="components-news-detail-articleHeader">
          <p>{news.category}</p>
          <h2>{news.title}</h2>
          <span>{news.description}</span>
        </header>

        <NewsImage item={news} variant="hero" />

        <div className="components-news-detail-caption">
          <span>{news.caption}</span>
          <span>{news.date}</span>
        </div>

        <div className="components-news-detail-body">
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

        <section className="components-news-detail-related" aria-labelledby="related-title">
          <h2 id="related-title">Mais notícias sobre o ACF</h2>
          <div className="components-news-detail-relatedList">
            {relatedNews.map((item) => (
              <a className="components-news-detail-relatedCard" href={`/noticias/${item.slug}`} key={item.slug}>
                <NewsImage item={item} variant="related" />
                <div className="components-news-detail-relatedCopy">
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

          <nav className="components-news-detail-pagination" aria-label="Paginação de notícias relacionadas">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <a className={page === 1 ? "components-news-detail-currentPage" : ""} href="/noticias" key={page}>
                {page}
              </a>
            ))}
            <span>...</span>
            <a className="components-news-detail-iconPage" href="/noticias" aria-label="Próxima página">
              <img src={arrowRightAsset} alt="" />
            </a>
            <a className="components-news-detail-iconPage" href="/noticias" aria-label="Última página">
              <img src={arrowEndAsset} alt="" />
            </a>
          </nav>
        </section>
      </div>
    </article>
  );
}

function NewsImage({ item, variant }: { item: NewsItem; variant: "hero" | "related" }) {
  const className = variant === "hero" ? "components-news-detail-heroImage" : "components-news-detail-relatedImage";

  if (item.image.type === "layered") {
    return (
      <div className={`${className} components-news-detail-layeredImage`}>
        <img className="components-news-detail-layeredBackground" src={item.image.background} alt="" />
        <img className="components-news-detail-layeredPlayers" src={item.image.foreground} alt={item.image.alt} />
      </div>
    );
  }

  if (item.image.type === "mascot") {
    return (
      <div className={`${className} components-news-detail-mascotImage`}>
        <img src={item.image.src} alt={item.image.alt} />
      </div>
    );
  }

  return <img className={className} src={item.image.src} alt={item.image.alt} />;
}
