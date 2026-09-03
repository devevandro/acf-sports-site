import { SponsorPlanCard } from "@/components/SponsorPlanCard";
import { SPONSOR_WHATSAPP_NUMBER, sponsorPlans } from "@/data/sponsorPlans";
import { getMasterSponsors, type SponsorRecord } from "@/data/sponsors";

type Logo = {
  name: string;
  subtitle?: string;
  dark?: boolean;
};

const reasons = [
  {
    title: "Fortaleça nossa estrutura",
    texts: [
      "O apoio financeiro garante o básico para o jogo acontecer: uniformes completos, materiais de treino (bolas, cones, coletes) e o pagamento de taxas de inscrição em torneios e arbitragem. Sem isso, o custo recai sobre os atletas, o que muitas vezes inviabiliza a permanência de bons jogadores.",
    ],
  },
  {
    title: "Fortaleça sua marca junto com o ACF",
    texts: [
      "Um time padronizado e com marcas parceiras estampadas transmite credibilidade. Isso eleva a autoestima do grupo e atrai a atenção de novos talentos e até da mídia local, tirando a equipe do anonimato.",
    ],
  },
  {
    title: "Conecte sua marca ao nosso público",
    texts: [
      'O patrocínio cria um ciclo de "ganha-ganha".',
      "Para a equipe: Estabilidade para focar apenas no desempenho em campo.",
      "Para o patrocinador: Visibilidade direta com um público fiel e engajado, associando a marca ao bem-estar e ao esporte.",
    ],
  },
];

const NO_PLAN_WHATSAPP_MESSAGE =
  "Olá, gostaria de apoiar o ACF Sports mesmo sem contratar um plano de patrocínio.";
const noPlanWhatsAppUrl = `https://wa.me/${SPONSOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(NO_PLAN_WHATSAPP_MESSAGE)}`;

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

// Flags para esconder grupos de patrocinadores sem remover os dados.
const SHOW_PARTNERS = false;
const SHOW_ONE_OFFS = false;

export async function SponsorsPageContent() {
  const masterSponsors = await getMasterSponsors();

  return (
    <section className="components-sponsors-page-content-section" data-node-id="2372:9111" data-name="patrocinadores">
      <div className="components-sponsors-page-content-reasons">
        <div className="components-sponsors-page-content-intro">
          <p className="components-sponsors-page-content-eyebrow">Patrocínio</p>
          <h2>Porque sua empresa deveria estar com o ACF?</h2>
          <p className="text-[#959595]">O esporte cresce quando equipes amadoras e parceiros, caminham juntos.</p>
        </div>

        {reasons.map((reason, index) => (
          <article className="components-sponsors-page-content-reason" key={reason.title}>
            <h2>
              {index + 1}. {reason.title}
            </h2>
            {reason.texts.map((text, subIndex) => (
              <p key={subIndex}>
                {index + 1}.{subIndex + 1}&nbsp;&nbsp;{text}
              </p>
            ))}
          </article>
        ))}
      </div>

      <hr className="components-sponsors-page-content-divider" />

      <div className="components-sponsors-page-content-noPlan">
        <div className="components-sponsors-page-content-intro">
          <h2>Quer apoiar o acf sem contratar um plano?</h2>
          <p className="text-[#959595]">Sem problemas. Você também pode contribuir de outras maneiras e fazer parte do crescimento do projeto.</p>
        </div>

        <article className="components-sponsors-page-content-reason">
          <h2>1. Apoie de outras formas</h2>
          <p>
            1.1&nbsp;&nbsp;Nem toda parceria precisa seguir um plano mensal. Mesmo que você opte por não assinar
            nenhum de nossos planos, você ainda pode ser um incentivador da equipe e fazer uma ajuda simbólica do
            valor que mais se adequa à seu bolso, se você deseja ser um desses apoiadores clique no botão abaixo.
          </p>
        </article>

        <a className="components-sponsors-page-content-whatsappButton" href={noPlanWhatsAppUrl} target="_blank" rel="noreferrer">
          quero apoiar o acf
          <img src="/contact/whatsapp.png" alt="" aria-hidden="true" />
        </a>
      </div>

      <section className="components-sponsors-page-content-plansBand" aria-labelledby="sponsor-plans-title">
        <div className="components-sponsors-page-content-plansInner">
          <h2 id="sponsor-plans-title">Nossos Planos</h2>
          <div className="components-sponsors-page-content-planGrid">
            {sponsorPlans.map((plan) => (
              <SponsorPlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="components-sponsors-page-content-logoSection" aria-label="Lista de patrocinadores">
        {masterSponsors.length > 0 && (
          <div className="components-sponsors-page-content-logoGroup">
            <h2>Patrocinadores Master</h2>
            <div className="components-sponsors-page-content-logoGrid components-sponsors-page-content-masterGrid">
              {masterSponsors.map((sponsor) => (
                <SponsorLogoCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        )}
        {SHOW_PARTNERS && <SponsorGroup title="Parceiros" logos={partnerLogos} />}
        {SHOW_ONE_OFFS && <SponsorGroup title="Pontuais" logos={oneOffLogos} />}
      </section>
    </section>
  );
}

function SponsorLogoCard({ sponsor }: { sponsor: SponsorRecord }) {
  const image = <img src={sponsor.image} alt={sponsor.name} />;

  if (sponsor.url) {
    return (
      <a
        className="components-sponsors-page-content-logoCard components-sponsors-page-content-masterLogoCard"
        href={sponsor.url}
        target="_blank"
        rel="noreferrer"
      >
        {image}
      </a>
    );
  }

  return (
    <article className="components-sponsors-page-content-logoCard components-sponsors-page-content-masterLogoCard">
      {image}
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

