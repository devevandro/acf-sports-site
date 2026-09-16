-- Tabela usada por /midia-kit para exibir dados reais do GA4 (ver src/data/mediaKit.ts e
-- src/app/api/cron/media-kit/route.ts, que sincroniza esta linha uma vez por dia via Vercel Cron).
-- Não há ferramenta de migração no projeto — este arquivo é só documentação/registro;
-- já foi aplicado manualmente no banco de produção.
CREATE TABLE IF NOT EXISTS media_kit_stats (
  id smallint PRIMARY KEY DEFAULT 1,
  period_label text NOT NULL,
  days_on_air text NOT NULL,
  active_users integer NOT NULL,
  page_views integer NOT NULL,
  avg_session_duration_label text NOT NULL,
  mobile_pct integer NOT NULL,
  desktop_pct integer NOT NULL,
  top_content text NOT NULL,
  daily_audience jsonb NOT NULL,
  sources jsonb NOT NULL,
  top_pages jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT media_kit_stats_singleton CHECK (id = 1)
);
