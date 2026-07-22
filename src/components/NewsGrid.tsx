import { newsItems, type NewsItem } from "@/data/news";
import styles from "./NewsGrid.module.css";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/e5b05588-9adf-425f-9894-1050cfad9599";

function NewsImage({ item }: { item: NewsItem }) {
  if (item.image.type === "layered") {
    return (
      <div className={styles.layeredImage}>
        <img className={styles.layeredBackground} src={item.image.background} alt="" />
        <img className={styles.layeredPlayers} src={item.image.foreground} alt={item.image.alt} />
      </div>
    );
  }

  if (item.image.type === "mascot") {
    return (
      <div className={styles.mascotImage}>
        <img src={item.image.src} alt={item.image.alt} />
      </div>
    );
  }

  return <img className={styles.cardImage} src={item.image.src} alt={item.image.alt} />;
}

export function NewsGrid() {
  return (
    <section
      className={styles.section}
      data-node-id="1672:11167"
      data-name="noticias_home"
      aria-labelledby="news-grid-title"
    >
      <h2 className={styles.title} id="news-grid-title">
        notícias<span>.</span>
      </h2>

      <div className={styles.grid}>
        {newsItems.map((item) => (
          <a className={styles.card} href={`/noticias/${item.slug}`} key={item.slug}>
            <NewsImage item={item} />
            <div className={styles.copy}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <a className={styles.moreButton} href="/noticias">
        ver mais noticias
        <img src={arrowAsset} alt="" />
      </a>
    </section>
  );
}
