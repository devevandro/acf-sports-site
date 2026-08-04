import Link from "next/link";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { newsItems, type NewsItem } from "@/data/news";

function ArchiveImage({ item }: { item: NewsItem }) {
  if (item.image.type === "layered") {
    return (
      <div className="components-news-archive-layeredImage">
        <img className="components-news-archive-layeredBackground" src={item.image.background} alt="" />
        <img className="components-news-archive-layeredPlayers" src={item.image.foreground} alt={item.image.alt} />
      </div>
    );
  }

  if (item.image.type === "mascot") {
    return (
      <div className="components-news-archive-mascotImage">
        <img src={item.image.src} alt={item.image.alt} />
      </div>
    );
  }

  return <img className="components-news-archive-cardImage" src={item.image.src} alt={item.image.alt} />;
}

export function NewsArchive() {
  return (
    <section
      className="components-news-archive-archive"
      data-node-id="1345:3596"
      aria-label="Todas as notícias"
    >
      <div className="components-news-archive-grid">
        {newsItems.map((item) => (
          <Link className="components-news-archive-card" href={`/noticias/${item.slug}`} key={item.slug}>
            <ArchiveImage item={item} />
            <div className="components-news-archive-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
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

