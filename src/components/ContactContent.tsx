
"use client";

import { useState, FormEvent } from "react";

const assets = {
  bull: "/contact/bull.png",
  phone: "/contact/phone.png",
  email: "/contact/email.png",
  location: "/contact/local.png",
  clock: "/contact/time.png",
  instagram: "/contact/insta.png",
  facebook: "/contact/face.png",
  youtube: "/contact/youtube.png",
  whatsapp: "/contact/whatsapp.png",
};

const contactItems = [
  {
    icon: assets.phone,
    title: "Telefone",
    value: "+55 (43) 99999-9999",
  },
  {
    icon: assets.email,
    title: "E-Mail",
    value: "acfsport@gmail.com",
  },
  {
    icon: assets.location,
    title: "Endereço",
    value: "Rua: Maria S Vilar, 59 - Bairro\nCornélio Procópio - PR, Brasil - BR",
  },
  {
    icon: assets.clock,
    title: "Atendimento",
    value: "08 às 18hr de seg à dom",
  },
];

type PlanType = "master" | "monthly" | "oneOff";

interface PlanData {
  id: PlanType;
  label: string;
  name: string;
  price: string;
  whatsappMessage: string;
  benefits: string[];
}

const plansData: Record<PlanType, PlanData> = {
  master: {
    id: "master",
    label: "Master",
    name: "MASTER",
    price: "R$ 500,00 / Mês",
    whatsappMessage:
      "https://wa.me/5543991802793?text=Ol%C3%A1%20boa%20tarde%2C%20gostaria%20de%20saber%20mais%20sobre%2C%20o%20plano%20master...",
    benefits: [
      "Post fixado no Instagram",
      "Destaque central no uniforme",
      "Logo em destaque nas artes de todos os jogos",
      "Banner de destaque na home do site",
      "Pagina exclusiva no site sobre a marca do patrocinador",
    ],
  },
  monthly: {
    id: "monthly",
    label: "Mensal",
    name: "MENSAL",
    price: "R$ 250,00 / Mês",
    whatsappMessage:
      "https://wa.me/5543991802793?text=Ol%C3%A1%20boa%20tarde%2C%20gostaria%20de%20saber%20mais%20sobre%2C%20o%20plano%20mensal...",
    benefits: [
      "Logo em partes secundárias no uniforme",
      "1 post dedicado por mês",
      "Menções nas artes de dias de jogo",
      "Logo em tamanho médio nas artes de jogos",
      "Link no site e logo na home",
    ],
  },
  oneOff: {
    id: "oneOff",
    label: "Pontual",
    name: "PONTUAL",
    price: "R$ 180,00 / Mês",
    whatsappMessage:
      "https://wa.me/5543991802793?text=Ol%C3%A1%20boa%20tarde%2C%20gostaria%20de%20saber%20mais%20sobre%2C%20o%20plano%20pontual...",
    benefits: [
      "Logo de tamanho médio exposto no uniforme",
      "1 post dedicado no dia do jogo",
      "2 stories no dia do jogo",
      "Destaque nas artes de resultados e de dia do jogo em tamanho médio",
      "Logo na seção parceiros do site",
    ],
  },
};

export function ContactContent() {
  const [activePlan, setActivePlan] = useState<PlanType>("master");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const currentPlan = plansData[activePlan];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section className="components-contact-content-section" data-node-id="2392:9111" data-name="contato">
      <div className="components-contact-content-inner">
        <div className="components-contact-content-leftColumn">
          <div className="components-contact-content-titleBlock">
            <h2>contate - nos</h2>
            <p>Ou entre em contato através de um de nossos canais</p>
          </div>

          <section className="components-contact-content-infoCard" aria-label="Informações de contato">
            <img className="components-contact-content-bull" src={assets.bull} alt="" aria-hidden="true" />
            <div className="components-contact-content-infoList">
              {contactItems.map((item) => (
                <article className="components-contact-content-infoItem" key={item.title}>
                  <img src={item.icon} alt="" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.value}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="components-contact-content-socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src={assets.instagram} alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <img src={assets.facebook} alt="Facebook" />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
                <img src={assets.youtube} alt="YouTube" />
              </a>
              <a href="https://wa.me/5543999999999" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src={assets.whatsapp} alt="WhatsApp" />
              </a>
            </div>
          </section>

          <section className="components-contact-content-formBlock" aria-labelledby="contact-form-title">
            <div className="components-contact-content-titleBlock">
              <h2 id="contact-form-title">vamos conversar?</h2>
              <p>Responderemos em até 24 horas</p>
            </div>

            {submitted ? (
              <div className="components-contact-content-success">
                <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form className="components-contact-content-form" onSubmit={handleSubmit}>
                <div className="components-contact-content-formRow">
                  <input
                    aria-label="Nome"
                    placeholder="Digite seu nome"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    aria-label="Telefone"
                    placeholder="(43) 9 9999 - 9999"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <input
                  aria-label="E-mail"
                  placeholder="contato@gmail.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  aria-label="Mensagem"
                  placeholder="Digite sua mensagem aqui!"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button type="submit">enviar mensagem</button>
              </form>
            )}
          </section>
        </div>

        <aside className="components-contact-content-planPanel" aria-label="Plano de patrocínio">
          <h2>Nossos Planos</h2>
          <div className="components-contact-content-planTabs" role="tablist" aria-label="Tipos de plano">
            {(Object.keys(plansData) as PlanType[]).map((planKey) => {
              const plan = plansData[planKey];
              const isActive = activePlan === planKey;
              return (
                <button
                  key={planKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`components-contact-content-planTab ${isActive ? "active" : ""}`}
                  onClick={() => setActivePlan(planKey)}
                >
                  <span className="components-contact-content-radioIcon" aria-hidden="true">
                    <span className="components-contact-content-radioDot" />
                  </span>
                  {plan.label}
                </button>
              );
            })}
          </div>

          <article className="components-contact-content-planCard">
            <h3>{currentPlan.name}</h3>
            <ul>
              {currentPlan.benefits.map((benefit) => (
                <li key={benefit}>
                  <span className="components-contact-content-bullet" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="4.5" stroke="#FF3203" strokeWidth="2" />
                    </svg>
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="components-contact-content-price">{currentPlan.price}</p>
            <a href={currentPlan.whatsappMessage} target="_blank" rel="noreferrer">
              enviar direct no whatsapp
            </a>
          </article>
        </aside>
      </div>
    </section>
  );
}
