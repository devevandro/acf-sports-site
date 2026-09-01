import { ArrowUpRight } from "lucide-react";
import { SPONSOR_WHATSAPP_NUMBER, type SponsorPlan } from "@/data/sponsorPlans";

export function SponsorPlanCard({ plan }: { plan: SponsorPlan }) {
  const whatsAppUrl = `https://wa.me/${SPONSOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.whatsappMessage)}`;

  return (
    <article
      className={`components-sponsor-plan-card-card ${
        plan.featured ? "components-sponsor-plan-card-featured" : ""
      }`}
    >
      <header className="components-sponsor-plan-card-header">
        <h3>{plan.name}</h3>
        <p className="components-sponsor-plan-card-price">
          <span className="components-sponsor-plan-card-priceAmount">{plan.priceAmount}</span>
          <span className="components-sponsor-plan-card-pricePeriod">{plan.pricePeriod}</span>
        </p>
      </header>

      <span className="components-sponsor-plan-card-divider" aria-hidden="true" />

      <ul>
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <a href={whatsAppUrl} target="_blank" rel="noreferrer">
        ver mais
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </article>
  );
}
