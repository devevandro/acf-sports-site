import { newsItems, type NewsItem } from "@/data/news";
import styles from "./NewsArchive.module.css";

const arrowRightAsset =
  "https://www.figma.com/api/mcp/asset/eae11955-b143-497d-9aee-f236a5e4c414";

const arrowEndAsset =
  "https://www.figma.com/api/mcp/asset/88490890-b8f5-4030-a54e-d77937549a88";

function ArchiveImage({ item }: { item: NewsItem }) {
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

export function NewsArchive() {
  return (
    <section
      className={styles.archive}
      data-node-id="1345:3596"
      aria-label="Todas as noticias"
    >
      <div className={styles.grid}>
        {newsItems.map((item) => (
          <a className={styles.card} href={`/noticias/${item.slug}`} key={item.slug}>
            <ArchiveImage item={item} />
            <div className={styles.copy}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <nav className={styles.pagination} aria-label="Paginação de notícias">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <a className={page === 1 ? styles.currentPage : ""} href="#" key={page}>
            {page}
          </a>
        ))}
        <span>...</span>
        <a className={styles.iconPage} href="#" aria-label="Próxima página">
          <img src={arrowRightAsset} alt="" />
        </a>
        <a className={styles.iconPage} href="#" aria-label="Última página">
          <img src={arrowEndAsset} alt="" />
        </a>
      </nav>
    </section>
  );
}
