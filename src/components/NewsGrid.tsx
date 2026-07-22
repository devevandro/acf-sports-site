import { newsItems, type NewsItem } from "@/data/news";
import { ArrowUpRight } from "lucide-react";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/e5b05588-9adf-425f-9894-1050cfad9599";

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
          <a className="components-news-grid-card" href={`/noticias/${item.slug}`} key={item.slug}>
            <NewsImage item={item} />
            <div className="components-news-grid-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <a className="components-news-grid-moreButton" href="/noticias">
        ver mais noticias
        <ArrowUpRight className="components-news-grid-moreButtonIcon" />
      </a>
    </section>
  );
}
