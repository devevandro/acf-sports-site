
import { Fragment } from "react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import type { TeamInfo } from "@/data/teamInfo";

function toWhatsappNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11 ? `55${digits}` : digits;
}

type SponsorPlan = {
  name: string;
  price: string;
  message: string;
  benefits: string[];
};

const sponsorPlans: SponsorPlan[] = [
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
      title: "Horario de atendimento.",
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
                <card.icon aria-hidden="true" />
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
            Fale com nossa equipe, seja para saber mais sobre o crube, tirar dúvidas sobre
            patrocínios, se candidatar a ser um atleta do soberano, ou saber mais sobre o projeto e
            ficar mais perto da nossa equipe ou então veio apenas pela resenha, será um prazer falar
            com você. &ldquo;fique a vontade mas não meche em nada&rdquo;.
          </p>
          <p className="components-contact-content-freeCallout">É só chamar a gente pelo whatsapp.</p>
          <a
            className="components-contact-content-whatsappButton"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            whatsapp
            <MessageCircle aria-hidden="true" />
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
          {sponsorPlans.map((plan) => {
            const whatsAppUrl = `https://wa.me/5543991802793?text=${encodeURIComponent(plan.message)}`;
            const [priceAmount, pricePeriod] = plan.price.split(" / ");
            return (
              <article className="components-contact-content-partnerCard" key={plan.name}>
                <h3>{plan.name}</h3>
                <span className="components-contact-content-partnerDivider" aria-hidden="true" />
                <ul>
                  {plan.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <p className="components-contact-content-partnerPrice">
                  <span className="components-contact-content-partnerPriceAmount">{priceAmount}</span>
                  {pricePeriod ? (
                    <span className="components-contact-content-partnerPricePeriod"> / {pricePeriod}</span>
                  ) : null}
                </p>
                <a href={whatsAppUrl} target="_blank" rel="noreferrer">
                  enviar direct no whatsapp
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}
