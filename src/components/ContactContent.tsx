
import { Fragment } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { SponsorPlanCard } from "@/components/SponsorPlanCard";
import { sponsorPlans } from "@/data/sponsorPlans";
import type { TeamInfo } from "@/data/teamInfo";

function toWhatsappNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11 ? `55${digits}` : digits;
}

export function ContactContent({ teamInfo }: { teamInfo: TeamInfo }) {
  const whatsappNumber = toWhatsappNumber(teamInfo.phone);

  const infoCards = [
    {
      icon: MapPin,
      title: "Nossa sede.",
      body: teamInfo.address,
    },
    {
      icon: Phone,
      title: "Nossos canais.",
      body: `WhatsApp: ${teamInfo.phone}\nE-mail: ${teamInfo.email}`,
    },
    {
      icon: Clock,
      title: "Horário de atendimento.",
      body: "Segunda a sexta: 08h às 18h\nSábado: 08h às 16h",
    },
  ];

  return (
    <Fragment>
      <section className="components-contact-content-section" data-node-id="2392:9111" data-name="contato">
      <div className="components-contact-content-inner">
        <div className="components-contact-content-intro">
          <h2>fale com o acf</h2>
          <p>Tire suas dúvidas, envie sua mensagem e fique ligado em tudo que acontece no ACF.</p>
        </div>

        <div className="components-contact-content-whereBlock">
          <h3>Onde estamos ?</h3>
          <p>
            Quer falar com a equipe do ACF ou conhecer melhor o nosso projeto? Aqui você encontra
            nossos principais canais de contato e o endereço da nossa sede.
          </p>
        </div>

        <div className="components-contact-content-infoCards">
          {infoCards.map((card) => (
            <article className="components-contact-content-infoCard" key={card.title}>
              <div className="components-contact-content-infoCardHead">
                <span className="components-contact-content-infoCardIcon">
                  <card.icon aria-hidden="true" />
                </span>
                <h4>{card.title}</h4>
              </div>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <hr className="components-contact-content-divider" />

        <div className="components-contact-content-freeBlock">
          <h3>Fique à vontade !</h3>
          <p>
            Fale com nossa equipe, seja para saber mais sobre o clube, tirar dúvidas sobre
            patrocínios, se candidatar a ser um atleta do soberano, ou saber mais sobre o projeto e
            ficar mais perto da nossa equipe ou então veio apenas pela resenha, será um prazer falar
            com você. &ldquo;fique à vontade mas não mexa em nada&rdquo;.
          </p>
          <h3 className="components-contact-content-freeCallout mt-4">É só chamar a gente pelo whatsapp</h3>
          <a
            className="components-contact-content-whatsappButton"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            whatsapp
            <img src="/contact/whatsapp.png" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

      <section className="components-contact-content-partnerBand" aria-labelledby="contact-partner-title">
        <div className="components-contact-content-partnerIntro">
          <h2 id="contact-partner-title">Seja um parceiro do ACF</h2>
          <p>
            Entre em contato com nossa equipe para conhecer nossos planos e encontrar a melhor forma
            de sua empresa fazer parte do projeto ACF.
          </p>
        </div>

        <div className="components-contact-content-partnerGrid">
          {sponsorPlans.map((plan) => (
            <SponsorPlanCard key={plan.slug} plan={plan} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
