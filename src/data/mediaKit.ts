import { cache } from "react";
import { getDb } from "@/db";

export type MediaKitDailyPoint = {
  label: string;
  visitors: number;
};

export type MediaKitSource = {
  name: string;
  percentage: number;
  description: string;
};

export type MediaKitPage = {
  title: string;
  views: number;
};

export type MediaKit = {
  period: {
    label: string;
    daysOnAir: string;
    updatedAt: string;
  };
  stats: {
    activeUsers: number;
    pageViews: number;
    avgSessionDurationLabel: string;
    mobilePct: number;
    desktopPct: number;
    topContent: string;
  };
  dailyAudience: MediaKitDailyPoint[];
  sources: MediaKitSource[];
  topPages: MediaKitPage[];
};

type MediaKitRow = {
  period_label: string;
  days_on_air: string;
  active_users: number;
  page_views: number;
  avg_session_duration_label: string;
  mobile_pct: number;
  desktop_pct: number;
  top_content: string;
  daily_audience: MediaKitDailyPoint[];
  sources: MediaKitSource[];
  top_pages: MediaKitPage[];
  updated_at: string;
};

// Usado enquanto a tabela `media_kit_stats` ainda não foi preenchida pela sincronização
// com o GA4 (ver `src/app/api/cron/media-kit/route.ts`), ou se o banco ficar indisponível.
const FALLBACK_MEDIA_KIT: MediaKit = {
  period: {
    label: "03–15 de set. de 2026",
    daysOnAir: "13 dias no ar",
    updatedAt: "atualizado em 15/09/2026",
  },
  stats: {
    activeUsers: 118,
    pageViews: 439,
    avgSessionDurationLabel: "1:55",
    mobilePct: 79,
    desktopPct: 21,
    topContent: "Elenco & Notícias locais",
  },
  dailyAudience: [
    { label: "03/09", visitors: 11 },
    { label: "04/09", visitors: 5 },
    { label: "05/09", visitors: 4 },
    { label: "06/09", visitors: 4 },
    { label: "07/09", visitors: 3 },
    { label: "08/09", visitors: 1 },
    { label: "09/09", visitors: 0 },
    { label: "10/09", visitors: 61 },
    { label: "11/09", visitors: 5 },
    { label: "12/09", visitors: 7 },
    { label: "13/09", visitors: 2 },
    { label: "14/09", visitors: 23 },
    { label: "15/09", visitors: 13 },
  ],
  sources: [
    { name: "Redes sociais", percentage: 52, description: "Instagram e Facebook do clube" },
    { name: "Acesso direto", percentage: 45, description: "digitou o endereço ou tem o site salvo" },
    { name: "Outros", percentage: 2, description: "links compartilhados" },
    { name: "Busca no Google", percentage: 1, description: "pesquisa orgânica" },
  ],
  topPages: [
    { title: "Elenco do time", views: 142 },
    { title: "Página inicial", views: 118 },
    { title: "Notícia: grupos da Segunda Divisão definidos", views: 41 },
    { title: "Notícia: chuvas adiam rodada da Copa Sesc", views: 25 },
    { title: "Competições", views: 20 },
  ],
};

function formatDatePtBr(value: string): string {
  // O timestamp fica salvo em UTC no banco (`now()`); exibimos convertido para o
  // horário de São Paulo (UTC-3), não o dia/hora UTC crus.
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export const getMediaKit = cache(async (): Promise<MediaKit> => {
  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT
        period_label, days_on_air, active_users, page_views,
        avg_session_duration_label, mobile_pct, desktop_pct, top_content,
        daily_audience, sources, top_pages, updated_at
      FROM media_kit_stats
      WHERE id = 1
      LIMIT 1
    `) as unknown as MediaKitRow[];
    const row = rows[0];
    if (!row) return FALLBACK_MEDIA_KIT;

    return {
      period: {
        label: row.period_label,
        daysOnAir: row.days_on_air,
        updatedAt: `atualizado em ${formatDatePtBr(row.updated_at)}`,
      },
      stats: {
        activeUsers: row.active_users,
        pageViews: row.page_views,
        avgSessionDurationLabel: row.avg_session_duration_label,
        mobilePct: row.mobile_pct,
        desktopPct: row.desktop_pct,
        topContent: row.top_content,
      },
      dailyAudience: row.daily_audience,
      sources: row.sources,
      topPages: row.top_pages,
    };
  } catch (error) {
    console.error("Failed to fetch media kit stats from database", error);
    return FALLBACK_MEDIA_KIT;
  }
});
