export type SponsorPlanSlug = "pontual" | "master";

export type SponsorPlan = {
  slug: SponsorPlanSlug;
  name: string;
  priceAmount: string;
  pricePeriod: string;
  whatsappMessage: string;
  benefits: string[];
  featured?: boolean;
};

export const SPONSOR_WHATSAPP_NUMBER = "5543991802793";

export const sponsorPlans: SponsorPlan[] = [
  {
    slug: "pontual",
    name: "pontual",
    priceAmount: "R$ 199",
    pricePeriod: "mensal",
    whatsappMessage: "Olá boa tarde, gostaria de saber mais sobre o plano pontual do ACF Sports...",
    benefits: [
      "2 stories no dia do jogo",
      "1 post dedicado no dia do jogo",
      "logo na seção parceiros do site",
      "logo em tamanho médio nas artes de jogos",
      "logo de tamanho médio exposto no uniforme",
    ],
  },
  {
    slug: "master",
    name: "master",
    priceAmount: "R$ 299",
    pricePeriod: "mensal",
    featured: true,
    whatsappMessage: "Olá boa tarde, gostaria de saber mais sobre o plano master do ACF Sports...",
    benefits: [
      "post fixado no instagram",
      "destaque central no uniforme",
      "logo em destaque nas artes de todos os jogos",
      "banner de destaque na home do site",
      "página exclusiva no site sobre a marca do patrocinador",
      "link no site e logo na home",
    ],
  },
];
