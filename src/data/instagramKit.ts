export type InstagramTopContent = {
  title: string;
  views: number;
};

export type InstagramKit = {
  period: {
    label: string;
    updatedAt: string;
  };
  stats: {
    views: number;
    reach: number;
    followers: number;
    newFollowers: number;
    followersGrowthPct: number;
    storiesViews: number;
    postsViews: number;
    reelsViews: number;
    audienceMalePct: number;
    audienceFemalePct: number;
    topAgeRange: string;
    topAgeRangePct: number;
    brazilPct: number;
  };
  topContent: InstagramTopContent[];
};

// Dados extraídos manualmente do app do Instagram (@acfsports), sem integração
// automática com a API — atualizar aqui quando houver um novo print do painel.
export const INSTAGRAM_KIT: InstagramKit = {
  period: {
    label: "17 de ago. – 15 de set. de 2026",
    updatedAt: "atualizado em 16/09/2026",
  },
  stats: {
    views: 2298,
    reach: 365,
    followers: 355,
    newFollowers: 5,
    followersGrowthPct: 1.4,
    storiesViews: 1300,
    postsViews: 940,
    reelsViews: 56,
    audienceMalePct: 80.9,
    audienceFemalePct: 19.1,
    topAgeRange: "25–34 anos",
    topAgeRangePct: 41.6,
    brazilPct: 97.4,
  },
  topContent: [
    { title: "Estamos no ar! Visite nosso site", views: 314 },
    { title: "Dia de jogo — ACF Sports x Cyber Futsal", views: 265 },
    { title: "Dia de jogo — Copa Sesc Esporte", views: 214 },
    { title: "Últimas do ACF — novidade no site", views: 175 },
  ],
};
