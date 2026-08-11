import type { Metadata } from "next";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Notícia Não Encontrada | ACF Sports",
    };
  }

  return {
    title: `${news.title} | ACF Sports`,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      type: "article",
      publishedTime: news.date,
      authors: [news.author],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return (
    <main className="app-noticias-slug-page-page">
      <TopCf />
      <MainMenu active="news" />
      <header className="app-noticias-slug-page-heading">
        <div>
          <p>{news.category}</p>
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
