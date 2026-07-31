
import { MessageCircle } from "lucide-react";

type Plan = {
  name: string;
  price: string;
  message: string;
  benefits: string[];
};

type Logo = {
  name: string;
  subtitle?: string;
  dark?: boolean;
};

const plans: Plan[] = [
  {
    name: "pontual",
    price: "R$ 180,00 / Mês",
    message: "Olá boa tarde, gostaria de saber mais sobre o plano pontual do ACF Sports...",
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
    message: "Olá boa tarde, gostaria de saber mais sobre o plano master do ACF Sports...",
    benefits: [
      "Post fixado no Instagram",
      "Destaque central no uniforme",
      "Logo em destaque nas artes de todos os jogos",
      "Banner de destaque na home do site",
      "Página exclusiva no site sobre a sua marca",
    ],
  },
  {
    name: "mensal",
    price: "R$ 250,00 / Mês",
    message: "Olá boa tarde, gostaria de saber mais sobre o plano mensal do ACF Sports...",
    benefits: [
      "Logo em partes secundárias no uniforme junto ao calção",
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
    title: "Conexão com o Público",
    text: "O patrocínio cria um ciclo de ganha-ganha. Para a equipe: estabilidade para focar apenas no desempenho em campo. Para o patrocinador: visibilidade direta com um público fiel e engajado, associando a marca ao bem-estar e ao esporte.",
  },
];

const masterLogos: Logo[] = [
  { name: "Auto Vidros", subtitle: "Patrocinador Master" },
  { name: "Innova Dev", subtitle: "Soluções Tecnológicas" },
];

const partnerLogos: Logo[] = [
  { name: "Apex Sports" },
  { name: "Apex Nutrição" },
  { name: "Mercat Supermercados" },
  { name: "VoltGreen Energia" },
  { name: "Velocity Fit" },
];

const oneOffLogos: Logo[] = [
  { name: "Tech Genius", dark: true },
  { name: "Titan Suplementos", dark: true },
  { name: "Velocity Express", dark: true },
];

export function SponsorsPageContent() {
  return (
    <section className="components-sponsors-page-content-section" data-node-id="2372:9111" data-name="patrocinadores">
      <div className="components-sponsors-page-content-reasons">
        {reasons.map((reason, index) => (
          <article className="components-sponsors-page-content-reason" key={reason.title}>
            <h2>
              {index + 1}. {reason.title}
            </h2>
            <p>
              {index + 1}.1&nbsp;&nbsp;{reason.text}
            </p>
          </article>
        ))}
      </div>

      <section className="components-sponsors-page-content-plansBand" aria-labelledby="sponsor-plans-title">
        <div className="components-sponsors-page-content-plansInner">
          <h2 id="sponsor-plans-title">Nossos Planos</h2>
          <div className="components-sponsors-page-content-planGrid">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="components-sponsors-page-content-logoSection" aria-label="Lista de patrocinadores">
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
    <article className="components-sponsors-page-content-planCard">
      <h3>{plan.name}</h3>
      <ul>
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
      <p>{plan.price}</p>
      <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2">
        <MessageCircle size={18} />
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
    <div className="components-sponsors-page-content-logoGroup">
      <h2>{title}</h2>
      <div className={`components-sponsors-page-content-logoGrid ${variant === "master" ? "components-sponsors-page-content-masterGrid" : ""}`}>
        {logos.map((logo) => (
          <article
            className={`components-sponsors-page-content-logoCard flex flex-col items-center justify-center p-4 rounded text-center ${
              logo.dark ? "components-sponsors-page-content-darkLogo bg-[#01121F] text-white" : "bg-white/5 border border-white/10"
            }`}
            key={`${title}-${logo.name}`}
          >
            <span className="font-bold text-base tracking-wide text-white uppercase">{logo.name}</span>
            {logo.subtitle ? <small className="text-xs text-white/70 mt-1">{logo.subtitle}</small> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

