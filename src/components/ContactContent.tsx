
const assets = {
  bull: "https://www.figma.com/api/mcp/asset/213de4f7-3a6d-41f6-a50b-e9affcd84ea0",
  phone: "https://www.figma.com/api/mcp/asset/9f768385-e424-4a74-ba9f-8029d877407e",
  email: "https://www.figma.com/api/mcp/asset/96798e38-1b9c-4381-8f0e-65363f689bc0",
  location: "https://www.figma.com/api/mcp/asset/cbb1da6d-14ff-45c2-89b6-7fd3e65530aa",
  clock: "https://www.figma.com/api/mcp/asset/5e13bacc-7713-4726-a1e4-58c4b82c4422",
  instagram: "https://www.figma.com/api/mcp/asset/f4405210-5cd5-42b4-83b0-6e38bcaff96a",
  facebook: "https://www.figma.com/api/mcp/asset/69cb66c7-61f8-4e3c-b251-1f899cde6295",
  youtube: "https://www.figma.com/api/mcp/asset/f49483e3-7201-4555-a48a-fbbae0b17644",
  whatsapp: "https://www.figma.com/api/mcp/asset/3aa02129-38f7-4440-be77-147937612020",
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

const masterBenefits = [
  "Post fixado no Instagram",
  "Destaque central no uniforme",
  "Logo em destaque nas artes de todos os jogos",
  "Banner de destaque na home do site",
  "Página exclusiva no site sobre a marca do patrocinador",
];

export function ContactContent() {
  return (
    <section className="components-contact-content-section" data-node-id="640:2361" data-name="contato">
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
                <img src={assets.instagram} alt="" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <img src={assets.facebook} alt="" />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">
                <img src={assets.youtube} alt="" />
              </a>
              <a href="https://wa.me/5543999999999" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <img src={assets.whatsapp} alt="" />
              </a>
            </div>
          </section>

          <section className="components-contact-content-formBlock" aria-labelledby="contact-form-title">
            <div className="components-contact-content-titleBlock">
              <h2 id="contact-form-title">vamos conversar?</h2>
              <p>Responderemos em até 24 horas</p>
            </div>

            <form className="components-contact-content-form">
              <div className="components-contact-content-formRow">
                <input aria-label="Nome" placeholder="Digite seu nome" type="text" />
                <input aria-label="Telefone" placeholder="(43) 9 9999 - 9999" type="tel" />
              </div>
              <input aria-label="E-mail" placeholder="contato@gmail.com" type="email" />
              <textarea aria-label="Mensagem" placeholder="Digite sua mensagem aqui!" />
              <button type="submit">enviar mensagem</button>
            </form>
          </section>
        </div>

        <aside className="components-contact-content-planPanel" aria-label="Plano de patrocínio">
          <h2>Nossos Planos</h2>
          <div className="components-contact-content-planTabs" aria-label="Tipos de plano">
            <span>Master</span>
            <span>Mensal</span>
            <span>Pontual</span>
          </div>
          <article className="components-contact-content-planCard">
            <h3>master</h3>
            <ul>
              {masterBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <p>R$ 500,00 / Mês</p>
            <a
              href="https://wa.me/5543991802793?text=Ol%C3%A1%20boa%20tarde%2C%20gostaria%20de%20saber%20mais%20sobre%2C%20o%20plano%20master..."
              target="_blank"
              rel="noreferrer"
            >
              enviar direct no whatsapp
            </a>
          </article>
        </aside>
      </div>
    </section>
  );
}
