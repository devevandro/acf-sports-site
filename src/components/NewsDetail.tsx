import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { formatNewsDate, getRelatedNews, type NewsItem } from "@/data/news";

export async function NewsDetail({ news }: { news: NewsItem }) {
  const relatedNews = await getRelatedNews(news.id);

  return (
    <article className="components-news-detail-article" data-node-id="1564:11705" data-name="detalhe-noticia">
      <div className="components-news-detail-inner">
        <header className="components-news-detail-articleHeader">
          <p>{news.tag}</p>
          <h2>{news.title}</h2>
          <span>{news.subtitle}</span>
        </header>

        <img className="components-news-detail-heroImage" src={news.image} alt={news.title} />

        <div className="components-news-detail-caption">
          <span>Por {news.author}</span>
          <span>{formatNewsDate(news.createdAt)}</span>
        </div>

        <div className="components-news-detail-body">
          <div className="components-news-detail-content" dangerouslySetInnerHTML={{ __html: news.content }} />
          <footer>
            <span>Escrito por {news.author}</span>
            <span>{formatNewsDate(news.createdAt)}</span>
          </footer>
        </div>

        <section className="components-news-detail-related" aria-labelledby="related-title">
          <h2 id="related-title">Mais notícias sobre o ACF</h2>
          <div className="components-news-detail-relatedList">
            {relatedNews.map((item) => (
              <Link className="components-news-detail-relatedCard" href={`/noticias/${item.id}`} key={item.id}>
                <img className="components-news-detail-relatedImage" src={item.image} alt={item.title} />
                <div className="components-news-detail-relatedCopy">
                  <p>{item.tag}</p>
                  <h3>{item.title}</h3>
                  <span>{item.subtitle}</span>
                  <div>
                    <small>Por {item.author}</small>
                    <small>{formatNewsDate(item.createdAt)}</small>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <nav className="components-news-detail-pagination" aria-label="Paginação de notícias relacionadas">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <Link className={page === 1 ? "components-news-detail-currentPage" : ""} href="/noticias" key={page}>
                {page}
              </Link>
            ))}
            <span>...</span>
            <Link className="components-news-detail-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Próxima página">
              <ChevronRight size={18} />
            </Link>
            <Link className="components-news-detail-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Última página">
              <ChevronsRight size={18} />
            </Link>
          </nav>
        </section>
      </div>
    </article>
  );
}
