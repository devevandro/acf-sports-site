import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { runGa4Report } from "@/lib/ga4";

export const dynamic = "force-dynamic";

// GA4 "sessionDefaultChannelGroup" -> linguagem comercial (sem jargão de analytics).
const CHANNEL_LABELS: Record<string, { name: string; description: string }> = {
  "Organic Social": { name: "Redes sociais", description: "Instagram e Facebook do clube" },
  Direct: { name: "Acesso direto", description: "digitou o endereço ou tem o site salvo" },
  "Organic Search": { name: "Busca no Google", description: "pesquisa orgânica" },
  Referral: { name: "Indicação de outro site", description: "veio de um link em outro site" },
  "Paid Social": { name: "Anúncios em redes sociais", description: "campanhas patrocinadas" },
};
const DEFAULT_CHANNEL = { name: "Outros", description: "links compartilhados" };

// Títulos legíveis para as páginas mais visitadas, em vez das URLs técnicas.
const PAGE_TITLES: Record<string, string> = {
  "/": "Página inicial",
  "/clube/elenco": "Elenco do time",
  "/clube/competicoes": "Competições",
  "/clube/historia": "História do clube",
  "/clube/patrocinadores": "Patrocinadores",
  "/noticias": "Notícias",
  "/contato": "Contato",
};

function friendlyPageTitle(path: string, rawTitle: string): string {
  if (PAGE_TITLES[path]) return PAGE_TITLES[path];
  if (path.startsWith("/noticias/")) {
    const headline = rawTitle.split("|")[0]?.trim();
    return headline || "Notícia";
  }
  if (path.startsWith("/clube/elenco/")) return "Perfil de atleta";
  return rawTitle || path;
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function parseGa4Date(value: string): Date {
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6)) - 1;
  const day = Number(value.slice(6, 8));
  return new Date(Date.UTC(year, month, day));
}

function formatGa4Date(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function formatDayLabel(date: Date): string {
  const d = String(date.getUTCDate()).padStart(2, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${d}/${m}`;
}

function formatPeriodLabel(start: Date, end: Date): string {
  const day = (date: Date) => String(date.getUTCDate()).padStart(2, "0");
  const monthShort = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" })
    .format(end)
    .replace(".", "");
  return `${day(start)}–${day(end)} de ${monthShort}. de ${end.getUTCFullYear()}`;
}

function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function GET(request: Request) {
  const providedSecret = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!providedSecret || providedSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const dateRanges = [{ startDate: "29daysAgo", endDate: "today" }];

    const [totals, daily, channels, devices, pages] = await Promise.all([
      runGa4Report({
        metrics: ["activeUsers", "screenPageViews", "averageSessionDuration"],
        dateRanges,
      }),
      runGa4Report({
        dimensions: ["date"],
        metrics: ["activeUsers"],
        dateRanges,
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      runGa4Report({
        dimensions: ["sessionDefaultChannelGroup"],
        metrics: ["sessions"],
        dateRanges,
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      }),
      runGa4Report({
        dimensions: ["deviceCategory"],
        metrics: ["sessions"],
        dateRanges,
      }),
      runGa4Report({
        dimensions: ["pagePath", "pageTitle"],
        metrics: ["screenPageViews"],
        dateRanges,
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
    ]);

    const totalsRow = totals[0]?.metrics ?? ["0", "0", "0"];
    const activeUsers = Number(totalsRow[0] ?? 0);
    const pageViews = Number(totalsRow[1] ?? 0);
    const avgSessionDuration = Number(totalsRow[2] ?? 0);

    const dailyMap = new Map(daily.map((row) => [row.dims[0], Number(row.metrics[0] ?? 0)]));
    const sortedDates = [...dailyMap.keys()].sort();
    const firstDate = sortedDates[0];

    const dailyAudience: { label: string; visitors: number }[] = [];
    if (firstDate) {
      const cursor = parseGa4Date(firstDate);
      const end = todayUtc();
      while (cursor <= end) {
        dailyAudience.push({
          label: formatDayLabel(cursor),
          visitors: dailyMap.get(formatGa4Date(cursor)) ?? 0,
        });
        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }
    }
    const daysOnAirCount = dailyAudience.filter((day) => day.visitors > 0).length;
    const periodLabel = firstDate ? formatPeriodLabel(parseGa4Date(firstDate), todayUtc()) : "";

    const deviceTotal = devices.reduce((sum, row) => sum + Number(row.metrics[0] ?? 0), 0) || 1;
    const mobileSessions = Number(devices.find((row) => row.dims[0] === "mobile")?.metrics[0] ?? 0);
    const mobilePct = Math.round((mobileSessions / deviceTotal) * 100);
    const desktopPct = 100 - mobilePct;

    const sourceTotals = new Map<string, { description: string; sessions: number }>();
    for (const row of channels) {
      const label = CHANNEL_LABELS[row.dims[0]] ?? DEFAULT_CHANNEL;
      const sessions = Number(row.metrics[0] ?? 0);
      const existing = sourceTotals.get(label.name);
      if (existing) {
        existing.sessions += sessions;
      } else {
        sourceTotals.set(label.name, { description: label.description, sessions });
      }
    }
    const channelTotal = [...sourceTotals.values()].reduce((sum, s) => sum + s.sessions, 0) || 1;
    const sources = [...sourceTotals.entries()]
      .map(([name, { description, sessions }]) => ({
        name,
        description,
        percentage: Math.round((sessions / channelTotal) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const topPages = pages.map((row) => ({
      title: friendlyPageTitle(row.dims[0], row.dims[1]),
      views: Number(row.metrics[0] ?? 0),
    }));
    const topContent = topPages.slice(0, 2).map((page) => page.title).join(" & ") || "Conteúdo do site";

    const sql = getDb();
    await sql`
      INSERT INTO media_kit_stats (
        id, period_label, days_on_air, active_users, page_views,
        avg_session_duration_label, mobile_pct, desktop_pct, top_content,
        daily_audience, sources, top_pages, updated_at
      ) VALUES (
        1, ${periodLabel}, ${`${daysOnAirCount} dias no ar`}, ${activeUsers}, ${pageViews},
        ${formatDuration(avgSessionDuration)}, ${mobilePct}, ${desktopPct}, ${topContent},
        ${JSON.stringify(dailyAudience)}, ${JSON.stringify(sources)}, ${JSON.stringify(topPages)}, now()
      )
      ON CONFLICT (id) DO UPDATE SET
        period_label = EXCLUDED.period_label,
        days_on_air = EXCLUDED.days_on_air,
        active_users = EXCLUDED.active_users,
        page_views = EXCLUDED.page_views,
        avg_session_duration_label = EXCLUDED.avg_session_duration_label,
        mobile_pct = EXCLUDED.mobile_pct,
        desktop_pct = EXCLUDED.desktop_pct,
        top_content = EXCLUDED.top_content,
        daily_audience = EXCLUDED.daily_audience,
        sources = EXCLUDED.sources,
        top_pages = EXCLUDED.top_pages,
        updated_at = now()
    `;

    return NextResponse.json({ ok: true, activeUsers, pageViews, periodLabel });
  } catch (error) {
    console.error("media-kit sync failed", error);
    return NextResponse.json({ error: "sync_failed" }, { status: 500 });
  }
}
