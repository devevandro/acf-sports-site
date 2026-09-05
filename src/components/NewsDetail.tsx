import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { formatNewsDate, getRelatedNews, type NewsItem } from "@/data/news";
import { NewsHeroImage } from "@/components/NewsHeroImage";

const RELATED_PER_PAGE = 4;

export async function NewsDetail({ news, page = 1 }: { news: NewsItem; page?: number }) {
  const allRelatedNews = await getRelatedNews(news.id);
  const totalPages = Math.max(1, Math.ceil(allRelatedNews.length / RELATED_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const relatedNews = allRelatedNews.slice(
    (currentPage - 1) * RELATED_PER_PAGE,
    currentPage * RELATED_PER_PAGE
  );

  return (
    <article className="components-news-detail-article" data-node-id="1564:11705" data-name="detalhe-noticia">
      <div className="components-news-detail-inner">
        <header className="components-news-detail-articleHeader">
          <p>{news.tag}</p>
          <h2>{news.title}</h2>
          <span>{news.subtitle}</span>
        </header>

        <NewsHeroImage src={news.newsImage} alt={news.title} />

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

          {allRelatedNews.length > RELATED_PER_PAGE && (
            <nav className="components-news-detail-pagination" aria-label="Paginação de notícias relacionadas">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Link
                  className={pageNumber === currentPage ? "components-news-detail-currentPage" : ""}
                  href={`/noticias/${news.id}?page=${pageNumber}`}
                  key={pageNumber}
                >
                  {pageNumber}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  className="components-news-detail-iconPage inline-flex items-center justify-center"
                  href={`/noticias/${news.id}?page=${currentPage + 1}`}
                  aria-label="Próxima página"
                >
                  <ChevronRight size={18} />
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  className="components-news-detail-iconPage inline-flex items-center justify-center"
                  href={`/noticias/${news.id}?page=${totalPages}`}
                  aria-label="Última página"
                >
                  <ChevronsRight size={18} />
                </Link>
              )}
            </nav>
          )}
        </section>
      </div>
    </article>
  );
}
