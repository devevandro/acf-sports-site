import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { getAllNews } from "@/data/news";

export async function NewsArchive() {
  const newsItems = await getAllNews();

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

      <nav className="components-news-archive-pagination" aria-label="Paginação de notícias">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <Link className={page === 1 ? "components-news-archive-currentPage" : ""} href="/noticias" key={page}>
            {page}
          </Link>
        ))}
        <span>...</span>
        <Link className="components-news-archive-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Próxima página">
          <ChevronRight size={18} />
        </Link>
        <Link className="components-news-archive-iconPage inline-flex items-center justify-center" href="/noticias" aria-label="Última página">
          <ChevronsRight size={18} />
        </Link>
      </nav>
    </section>
  );
}
