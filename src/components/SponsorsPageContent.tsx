import { SponsorPlanCard } from "@/components/SponsorPlanCard";
import { sponsorPlans } from "@/data/sponsorPlans";
import { getMasterSponsors, type SponsorRecord } from "@/data/sponsors";

type Logo = {
  name: string;
  subtitle?: string;
  dark?: boolean;
};

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
            {sponsorPlans.map((plan) => (
              <SponsorPlanCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="components-sponsors-page-content-logoSection" aria-label="Lista de patrocinadores">
        {masterSponsors.length > 0 && (
          <div className="components-sponsors-page-content-logoGroup">
            <h2>Patrocinador Master</h2>
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

