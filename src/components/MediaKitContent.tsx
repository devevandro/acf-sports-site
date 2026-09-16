import { ArrowUpRight } from "lucide-react";
import { SPONSOR_WHATSAPP_NUMBER } from "@/data/sponsorPlans";
import { getMediaKit, type MediaKit } from "@/data/mediaKit";

const WHATSAPP_MESSAGE = "Olá! Vi o mídia kit do ACF Sports e gostaria de conversar sobre patrocínio.";
const whatsAppUrl = `https://wa.me/${SPONSOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Os argumentos de venda ficam curados aqui; só os números/valores vêm do banco
// (preenchido pela sincronização com o GA4 em src/app/api/cron/media-kit/route.ts).
function buildStatCards(data: MediaKit) {
  return [
    {
      eyebrow: "Público ativo",
      value: String(data.stats.activeUsers),
      unit: "leitores únicos",
      sub: `${data.stats.pageViews} visualizações no período`,
      argument: "Alcance consistente logo nos primeiros dias no ar.",
    },
    {
      eyebrow: "Qualidade da audiência",
      value: data.stats.avgSessionDurationLabel,
      unit: "min por sessão",
      sub: "tempo médio de permanência",
      argument: "O leitor dedica tempo real lendo matérias e conhecendo o clube.",
    },
    {
      eyebrow: "Perfil de acesso",
      value: `${data.stats.mobilePct}%`,
      unit: "celular",
      sub: `${data.stats.desktopPct}% computador`,
      argument: "Garante exibição das marcas em telas mobile, de forma direta.",
      split: { mobile: data.stats.mobilePct, desktop: data.stats.desktopPct },
    },
    {
      eyebrow: "Conteúdo mais consumido",
      value: data.stats.topContent,
      sub: "principais páginas acessadas",
      argument: "Conexão forte entre os torcedores e a identidade dos atletas.",
    },
  ];
}

export async function MediaKitContent() {
  const data = await getMediaKit();
  const statCards = buildStatCards(data);
  const maxDailyVisitors = Math.max(1, ...data.dailyAudience.map((day) => day.visitors));
  const peakDay = data.dailyAudience.reduce(
    (peak, day) => (day.visitors > peak.visitors ? day : peak),
    data.dailyAudience[0] ?? { label: "", visitors: 0 },
  );

  return (
    <section className="components-media-kit-content-section" data-name="midia-kit">
      <div className="components-media-kit-content-intro">
        <p className="components-media-kit-content-eyebrow">Dados do site oficial</p>
        <h2>Por que anunciar com o ACF Sports</h2>
        <p>Leitura resumida da audiência do site, direto do Google Analytics, sem jargão técnico.</p>
        <span className="components-media-kit-content-periodBadge">
          {data.period.daysOnAir} &middot; {data.period.label}
        </span>
      </div>

      <div className="components-media-kit-content-grid">
        {statCards.map((stat) => (
          <article className="components-media-kit-content-card" key={stat.eyebrow}>
            <p className="components-media-kit-content-cardEyebrow">{stat.eyebrow}</p>
            <p className="components-media-kit-content-cardValue">
              {stat.value}
              {stat.unit ? <span>{stat.unit}</span> : null}
            </p>
            {stat.split ? (
              <span className="components-media-kit-content-split" aria-hidden="true">
                <span style={{ width: `${stat.split.mobile}%` }} />
                <span style={{ width: `${stat.split.desktop}%` }} />
              </span>
            ) : null}
            {stat.sub ? <p className="components-media-kit-content-cardSub">{stat.sub}</p> : null}
            <p className="components-media-kit-content-cardArgument">{stat.argument}</p>
          </article>
        ))}
      </div>

      <article className="components-media-kit-content-card components-media-kit-content-growth">
        <p className="components-media-kit-content-cardTitle">Evolução da audiência</p>
        <p className="components-media-kit-content-cardCaption">
          Visitantes únicos por dia desde o lançamento &middot; pico de {peakDay.visitors} em {peakDay.label}
        </p>
        <div className="components-media-kit-content-growthBars">
          {data.dailyAudience.map((day) => (
            <span
              key={day.label}
              className={
                day.visitors === peakDay.visitors
                  ? "components-media-kit-content-growthBar components-media-kit-content-growthBarPeak"
                  : "components-media-kit-content-growthBar"
              }
              style={{ height: `${Math.max((day.visitors / maxDailyVisitors) * 100, 3)}%` }}
              title={`${day.label}: ${day.visitors} visitantes`}
            />
          ))}
        </div>
        <div className="components-media-kit-content-growthLabels">
          {data.dailyAudience.map((day, index) => (
            <span key={day.label} className={index % 2 === 1 ? "components-media-kit-content-growthLabelHidden" : ""}>
              {day.label}
            </span>
          ))}
        </div>
      </article>

      <div className="components-media-kit-content-secondaryGrid">
        <article className="components-media-kit-content-card">
          <p className="components-media-kit-content-cardTitle">De onde vem nosso público</p>
          <p className="components-media-kit-content-cardCaption">como os torcedores chegam até o site</p>
          <div className="components-media-kit-content-sourceList">
            {data.sources.map((source) => (
              <div className="components-media-kit-content-sourceRow" key={source.name}>
                <div className="components-media-kit-content-sourceHead">
                  <span className="components-media-kit-content-sourceName">{source.name}</span>
                  <span className="components-media-kit-content-sourcePct num">{source.percentage}%</span>
                </div>
                <div className="components-media-kit-content-sourceTrack">
                  <div className="components-media-kit-content-sourceFill" style={{ width: `${source.percentage}%` }} />
                </div>
                <p className="components-media-kit-content-sourceDesc">{source.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="components-media-kit-content-card">
          <p className="components-media-kit-content-cardTitle">Páginas mais visitadas</p>
          <p className="components-media-kit-content-cardCaption">onde as marcas parceiras aparecem</p>
          <div className="components-media-kit-content-pageList">
            {data.topPages.map((page, index) => (
              <div className="components-media-kit-content-pageRow" key={page.title}>
                <span className="components-media-kit-content-pageRank">{String(index + 1).padStart(2, "0")}</span>
                <span className="components-media-kit-content-pageTitle">{page.title}</span>
                <span className="components-media-kit-content-pageViews num">{page.views}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <p className="components-media-kit-content-updatedAt">{data.period.updatedAt}</p>

      <a className="components-media-kit-content-whatsappButton" href={whatsAppUrl} target="_blank" rel="noreferrer">
        falar sobre patrocínio
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
