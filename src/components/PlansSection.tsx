import { ArrowUpRight } from "lucide-react";

const arrowAsset =
  "https://www.figma.com/api/mcp/asset/1b2b3532-68ec-4ef4-bbf9-23a66f49a996";

type Plan = {
  name: string;
  price: string;
  featured?: boolean;
  benefits: string[];
};

const plans: Plan[] = [
  {
    name: "pontual",
    price: "R$ 180",
    benefits: [
      "logo de tamanho médio exposto no uniforme",
      "1 post dedicado no dia do jogo",
      "2 stories no dia do jogo",
      "destaque nas artes de resultados e de dia do jogo em tamanho médio",
      "logo na seção parceiros do site"
    ]
  },
  {
    name: "master",
    price: "R$ 500",
    featured: true,
    benefits: [
      "Post fixado no Instagram",
      "Destaque central no uniforme",
      "Logo em destaque nas artes de todos os jogos",
      "Banner de destaque na home do site",
      "Pagina exclusiva no site sobre a marca do patrocinador",
      "Cobertura regional"
    ]
  },
  {
    name: "mensal",
    price: "R$ 250",
    benefits: [
      "logo em partes segundarias no uniforme",
      "1 post dedicado por mês",
      "menções nas artes de dias de jogo",
      "logo em tamanho médio nas artes de jogos",
      "link no site e logo na home"
    ]
  }
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`components-plans-section-card ${plan.featured ? "components-plans-section-featuredCard" : ""}`}>
      <header className="components-plans-section-cardHeader">
        <h3>{plan.name}</h3>
        <div className="components-plans-section-price">
          <strong>{plan.price}</strong>
          <span>mensal</span>
        </div>
      </header>

      <ul className="components-plans-section-benefits">
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <a className={`components-plans-section-button ${plan.featured ? "components-plans-section-featuredButton" : ""}`} href="#planos">
        ver mais
        <ArrowUpRight className="components-plans-section-buttonIcon" />
      </a>
    </article>
  );
}

export function PlansSection() {
  return (
    <section
      className="components-plans-section-section"
      data-node-id="1695:10075"
      data-name="planos"
      aria-labelledby="plans-title"
    >
      <img className="components-plans-section-background" src="/backgrounds/background-plans.png" alt="" />
      <div className="components-plans-section-overlay" />

      <div className="components-plans-section-inner">
        <h2 className="components-plans-section-title" id="plans-title">
          planos<span>.</span>
        </h2>

        <div className="components-plans-section-cards">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
