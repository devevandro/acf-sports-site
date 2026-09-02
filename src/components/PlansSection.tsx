import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sponsorPlans, type SponsorPlan } from "@/data/sponsorPlans";

function PlanCard({ plan }: { plan: SponsorPlan }) {
  return (
    <article className={`components-plans-section-card ${plan.featured ? "components-plans-section-featuredCard" : ""}`}>
      <header className="components-plans-section-cardHeader">
        <h3>{plan.name}</h3>
        <div className="components-plans-section-price">
          <strong>{plan.priceAmount}</strong>
          <span>{plan.pricePeriod}</span>
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
          {sponsorPlans.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

