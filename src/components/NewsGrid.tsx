import Link from "next/link";
import { newsItems, type NewsItem } from "@/data/news";
import { ArrowUpRight } from "lucide-react";

function NewsImage({ item }: { item: NewsItem }) {
  if (item.image.type === "layered") {
    return (
      <div className="components-news-grid-layeredImage">
        <img className="components-news-grid-layeredBackground" src={item.image.background} alt="" />
        <img className="components-news-grid-layeredPlayers" src={item.image.foreground} alt={item.image.alt} />
      </div>
    );
  }

  if (item.image.type === "mascot") {
    return (
      <div className="components-news-grid-mascotImage">
        <img src={item.image.src} alt={item.image.alt} />
      </div>
    );
  }

  return <img className="components-news-grid-cardImage" src={item.image.src} alt={item.image.alt} />;
}

export function NewsGrid() {
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

      <div className="components-news-grid-grid">
        {newsItems.map((item) => (
          <Link className="components-news-grid-card" href={`/noticias/${item.slug}`} key={item.slug}>
            <NewsImage item={item} />
            <div className="components-news-grid-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link className="components-news-grid-moreButton" href="/noticias">
        ver mais notícias
        <ArrowUpRight className="components-news-grid-moreButtonIcon" />
      </Link>
    </section>
  );
}

