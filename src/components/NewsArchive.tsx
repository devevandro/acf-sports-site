import { newsItems, type NewsItem } from "@/data/news";

const arrowRightAsset =
  "https://www.figma.com/api/mcp/asset/eae11955-b143-497d-9aee-f236a5e4c414";

const arrowEndAsset =
  "https://www.figma.com/api/mcp/asset/88490890-b8f5-4030-a54e-d77937549a88";

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
      aria-label="Todas as noticias"
    >
      <div className="components-news-archive-grid">
        {newsItems.map((item) => (
          <a className="components-news-archive-card" href={`/noticias/${item.slug}`} key={item.slug}>
            <ArchiveImage item={item} />
            <div className="components-news-archive-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </a>
        ))}
      </div>

      <nav className="components-news-archive-pagination" aria-label="Paginação de notícias">
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <a className={page === 1 ? "components-news-archive-currentPage" : ""} href="#" key={page}>
            {page}
          </a>
        ))}
        <span>...</span>
        <a className="components-news-archive-iconPage" href="#" aria-label="Próxima página">
          <img src={arrowRightAsset} alt="" />
        </a>
        <a className="components-news-archive-iconPage" href="#" aria-label="Última página">
          <img src={arrowEndAsset} alt="" />
        </a>
      </nav>
    </section>
  );
}
