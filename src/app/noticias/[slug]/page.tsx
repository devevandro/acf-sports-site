import { NewsDetail } from "@/components/NewsDetail";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getNewsBySlug, newsItems } from "@/data/news";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NoticiaDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <main className="app-noticias-slug-page-page">
      <TopCf />
      <MainMenu active="noticias" />
      <header className="app-noticias-slug-page-heading">
        <div>
          <p>atualidades</p>
          <h1>
            notícias<span>.</span>
          </h1>
        </div>
      </header>
      <NewsDetail news={news} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
