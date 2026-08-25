import { cache } from "react";
import { getDb } from "@/db";

export type NewsItem = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
  highlight: boolean;
};

const FALLBACK_IMAGE = "/home-news/news-03.png";
const CLUB_NAME = "ACF Sports/Vila Mercado";

export const PINNED_CAROUSEL_NEWS_ID = "cd288794-2014-4f37-8163-cb5082cd0b47";

function highlightClubName(html: string): string {
  const pattern = new RegExp(`(<[^>]*>)|(${CLUB_NAME.replace(/[/]/g, "\\/")})`, "g");
  return html.replace(pattern, (match, tag, name) =>
    tag ? tag : `<span class="components-news-detail-clubName">${name}</span>`
  );
}

type NewsRow = {
  id: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image: string | null;
  tag: string | null;
  author: string | null;
  created_at: string;
  highlight: boolean | null;
};

function mapRow(row: NewsRow): NewsItem {
  return {
    id: row.id,
    tag: row.tag ?? "",
    title: row.title ?? "",
    subtitle: row.subtitle ?? "",
    content: row.content ? highlightClubName(row.content) : "",
    author: row.author ?? "ACF Sports",
    image: row.image || FALLBACK_IMAGE,
    createdAt: new Date(row.created_at).toISOString(),
    highlight: row.highlight ?? false,
  };
}

export const getAllNews = cache(async (): Promise<NewsItem[]> => {
  try {
    const sql = getDb();
    const rows = (await sql`SELECT * FROM news ORDER BY created_at DESC`) as unknown as NewsRow[];
    return rows.map(mapRow);
  } catch (error) {
    console.error("Failed to fetch news from database", error);
    return [];
  }
});

export async function getLatestNews(limit = 6): Promise<NewsItem[]> {
  const news = await getAllNews();
  return news.filter((item) => item.id !== PINNED_CAROUSEL_NEWS_ID).slice(0, limit);
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  const news = await getAllNews();
  return news.find((item) => item.id === id);
}

export async function getRelatedNews(id: string, limit = 3): Promise<NewsItem[]> {
  const news = await getAllNews();
  return news.filter((item) => item.id !== id).slice(0, limit);
}

export function formatNewsDate(iso: string): string {
  const date = new Date(iso);
  const datePart = new Intl.DateTimeFormat("pt-BR").format(date);
  const timePart = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(date);
  return `${datePart} às ${timePart}`;
}
