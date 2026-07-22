import styles from "./SponsorsPageContent.module.css";

type Plan = {
  name: string;
  price: string;
  message: string;
  benefits: string[];
};

type Logo = {
  src: string;
  alt: string;
  dark?: boolean;
};

const plans: Plan[] = [
  {
    name: "pontual",
    price: "R$ 180,00 / Mês",
    message: "Olá boa tarde, gostaria de saber mais sobre, o plano pontual...",
    benefits: [
      "Logo de tamanho médio em partes do uniforme",
      "1 Post dedicado no dia do jogo",
      "2 Stories no dia do evento",
      "Destaque nas artes de resultados e de dia de jogo em tamanho médio",
      "Logo na seção parceiros do site",
    ],
  },
  {
    name: "master",
    price: "R$ 500,00 / Mês",
    message: "Olá boa tarde, gostaria de saber mais sobre, o plano master...",
    benefits: [
      "Post fixado no instagram",
      "Destaque central no uniforme",
      "Logo em destaque nas artes de todos os jogos",
      "Banner de destaque na home do site",
      "Pagina exclusiva no site sobre a sua marca",
    ],
  },
  {
    name: "mensal",
    price: "R$ 250,00 / Mês",
    message: "Olá boa tarde, gostaria de saber mais sobre, o plano mensal...",
    benefits: [
      "Logo em partes segundarias no uniforme junto ao calção",
      "Post dedicado por mês",
      "Menções em todas as artes de dias de jogos",
      "Logo em tamanho médio nas artes de jogos",
      "Link no site e logo na home",
    ],
  },
];

const reasons = [
  {
    title: "Viabilidade Financeira e Estrutura",
    text: "O apoio financeiro garante o básico para o jogo acontecer: uniformes completos, materiais de treino (bolas, cones, coletes) e o pagamento de taxas de inscrição em torneios e arbitragem. Sem isso, o custo recai sobre os atletas, o que muitas vezes inviabiliza a permanência de bons jogadores.",
  },
  {
    title: "Fortalecimento da Identidade e Profissionalismo",
    text: "Um time padronizado e com marcas parceiras estampadas transmite credibilidade. Isso eleva a autoestima do grupo e atrai a atenção de novos talentos e até da mídia local, tirando a equipe do anonimato.",
  },
  {
    title: "Conexão com a o publico",
    text: "O patrocínio cria um ciclo de ganha-ganha. Para a equipe: estabilidade para focar apenas no desempenho em campo. Para o patrocinador: visibilidade direta com um público fiel e engajado, associando a marca ao bem-estar e ao esporte.",
  },
];

const masterLogos: Logo[] = [
  {
    src: "https://www.figma.com/api/mcp/asset/13714137-a58e-40ee-ac50-43603ea7b86b",
    alt: "Auto Vidros",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/c8621abe-c571-4172-8642-0bd4ef995353",
    alt: "Innova Dev",
  },
];

const partnerLogos: Logo[] = [
  {
    src: "https://www.figma.com/api/mcp/asset/d36d31f2-d7ab-4a3c-a0a2-561e46468cdf",
    alt: "Apex",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/78fc0a67-bcc6-4e68-80b6-ba16c69377e1",
    alt: "Apex",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/6ff3046a-4c54-4987-8b9c-a5200634fcab",
    alt: "Mercat",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/d1093d7d-1466-45aa-9bfb-934cef6e351b",
    alt: "VoltGreen",
  },
  {
    src: "https://www.figma.com/api/mcp/asset/c2938408-1ce2-4f84-8e62-1db0d675c25d",
    alt: "Velocity",
  },
];

const oneOffLogos: Logo[] = [
  {
    src: "https://www.figma.com/api/mcp/asset/aa4c4233-ddb9-4ad2-aec4-c695d51a4b1d",
    alt: "Tech Genius",
    dark: true,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/238c89f0-09f5-4a2e-aab8-ca5f58b73124",
    alt: "Titan",
    dark: true,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/bd0224ae-deec-46d0-b1b2-3cb7a3f533f9",
    alt: "Velocity",
    dark: true,
  },
];

export function SponsorsPageContent() {
  return (
    <section className={styles.section} data-node-id="640:2418" data-name="patrocinadores">
      <div className={styles.reasons}>
        {reasons.map((reason, index) => (
          <article className={styles.reason} key={reason.title}>
            <h2>
              {index + 1}. {reason.title}
            </h2>
            <p>
              {index + 1}.1&nbsp;&nbsp;{reason.text}
            </p>
          </article>
        ))}
      </div>

      <section className={styles.plansBand} aria-labelledby="sponsor-plans-title">
        <div className={styles.plansInner}>
          <h2 id="sponsor-plans-title">Nossos Planos</h2>
          <div className={styles.planGrid}>
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.logoSection} aria-label="Lista de patrocinadores">
        <SponsorGroup title="Patrocinador Master" logos={masterLogos} variant="master" />
        <SponsorGroup title="Parceiros" logos={partnerLogos} />
        <SponsorGroup title="Pontuais" logos={oneOffLogos} />
      </section>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const whatsAppUrl = `https://wa.me/5543991802793?text=${encodeURIComponent(plan.message)}`;

  return (
    <article className={styles.planCard}>
      <h3>{plan.name}</h3>
      <ul>
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <p>{plan.price}</p>
      <a href={whatsAppUrl} target="_blank" rel="noreferrer">
        enviar direct no whatsapp
      </a>
    </article>
  );
}

function SponsorGroup({
  title,
  logos,
  variant,
}: {
  title: string;
  logos: Logo[];
  variant?: "master";
}) {
  return (
    <div className={styles.logoGroup}>
      <h2>{title}</h2>
      <div className={`${styles.logoGrid} ${variant === "master" ? styles.masterGrid : ""}`}>
        {logos.map((logo) => (
          <article className={`${styles.logoCard} ${logo.dark ? styles.darkLogo : ""}`} key={`${title}-${logo.src}`}>
            <img src={logo.src} alt={logo.alt} />
          </article>
        ))}
      </div>
    </div>
  );
}
