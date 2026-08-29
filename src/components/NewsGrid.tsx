import Link from "next/link";
import type { CSSProperties } from "react";
import { getLatestNews } from "@/data/news";
import { ArrowUpRight } from "lucide-react";

export async function NewsGrid() {
  const newsItems = await getLatestNews(6);
  const gridColumns = Math.max(1, Math.min(newsItems.length, 3));

  return (
    <section
      className="components-news-grid-section"
      data-node-id="1672:11167"
      data-name="noticias_home"
      aria-labelledby="news-grid-title"
    >
      <h2 className="components-news-grid-title" id="news-grid-title">
        notícias<span>.</span>
      </h2>

      <div
        className="components-news-grid-grid"
        style={{ "--news-grid-columns": gridColumns } as CSSProperties}
      >
        {newsItems.map((item) => (
          <Link className="components-news-grid-card" href={`/noticias/${item.id}`} key={item.id}>
            <img className="components-news-grid-cardImage" src={item.image} alt={item.title} />
            <div className="components-news-grid-copy">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="components-news-grid-action">
        <Link className="components-news-grid-moreButton" href="/noticias">
          ver mais notícias
          <ArrowUpRight className="components-news-grid-moreButtonIcon" />
        </Link>
      </div>
    </section>
  );
}
