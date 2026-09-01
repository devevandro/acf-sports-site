import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

      <hr className="components-plans-section-divider" />

      <ul className="components-plans-section-benefits">
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <Link
        className={`components-plans-section-button ${plan.featured ? "components-plans-section-featuredButton" : ""}`}
        href="/contato"
      >
        ver mais
        <ArrowUpRight className="components-plans-section-buttonIcon" />
      </Link>
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

