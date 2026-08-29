import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { getAllNews, PINNED_CAROUSEL_NEWS_ID } from "@/data/news";

const CARDS_PER_PAGE = 6;

export async function NewsArchive({ page = 1 }: { page?: number }) {
  const allNews = await getAllNews();
  const newsItems = allNews.filter((item) => item.id !== PINNED_CAROUSEL_NEWS_ID);
  const totalPages = Math.max(1, Math.ceil(newsItems.length / CARDS_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pageItems = newsItems.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  return (
    <section
      className="components-news-archive-archive"
      data-node-id="1345:3596"
      aria-label="Todas as notícias"
    >
      <div className="components-news-archive-grid">
        {pageItems.map((item) => (
          <Link className="components-news-archive-card" href={`/noticias/${item.id}`} key={item.id}>
            <img className="components-news-archive-cardImage" src={item.image} alt={item.title} />
            <div className="components-news-archive-copy">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {newsItems.length > CARDS_PER_PAGE && (
        <nav className="components-news-archive-pagination" aria-label="Paginação de notícias">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              className={pageNumber === currentPage ? "components-news-archive-currentPage" : ""}
              href={`/noticias?page=${pageNumber}`}
              key={pageNumber}
            >
              {pageNumber}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              className="components-news-archive-iconPage inline-flex items-center justify-center"
              href={`/noticias?page=${currentPage + 1}`}
              aria-label="Próxima página"
            >
              <ChevronRight size={18} />
            </Link>
          )}
          {currentPage < totalPages && (
            <Link
              className="components-news-archive-iconPage inline-flex items-center justify-center"
              href={`/noticias?page=${totalPages}`}
              aria-label="Última página"
            >
              <ChevronsRight size={18} />
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
