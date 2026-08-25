import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { getAllNews, PINNED_CAROUSEL_NEWS_ID } from "@/data/news";

const CARDS_PER_PAGE = 6;

export async function NewsArchive() {
  const allNews = await getAllNews();
  const newsItems = allNews.filter((item) => item.id !== PINNED_CAROUSEL_NEWS_ID);
  const totalPages = Math.ceil(newsItems.length / CARDS_PER_PAGE);

  return (
    <section
      className="components-news-archive-archive"
      data-node-id="1345:3596"
      aria-label="Todas as notícias"
    >
      <div className="components-news-archive-grid">
        {newsItems.map((item) => (
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
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Link className={page === 1 ? "components-news-archive-currentPage" : ""} href="/noticias" key={page}>
              {page}
            </Link>
          ))}
          <Link className="components-news-archive-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Próxima página">
            <ChevronRight size={18} />
          </Link>
          <Link className="components-news-archive-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Última página">
            <ChevronsRight size={18} />
          </Link>
        </nav>
      )}
    </section>
  );
}
