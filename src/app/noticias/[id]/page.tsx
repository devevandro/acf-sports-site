import type { Metadata } from "next";
import { NewsDetail } from "@/components/NewsDetail";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getNewsById } from "@/data/news";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    return {
      title: "Notícia Não Encontrada | ACF Sports",
    };
  }

  return {
    title: `${news.title} | ACF Sports`,
    description: news.subtitle,
    openGraph: {
      title: news.title,
      description: news.subtitle,
      type: "article",
      publishedTime: news.createdAt,
      authors: [news.author],
    },
  };
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <main className="app-noticias-slug-page-page">
      <TopCf />
      <SiteHeader active="news" />
      <header className="app-noticias-slug-page-heading">
        <div>
          <p>{news.tag}</p>
          <h1>
            notícias<span>.</span>
          </h1>
        </div>
      </header>
      <NewsDetail news={news} page={page ? Number(page) : 1} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
