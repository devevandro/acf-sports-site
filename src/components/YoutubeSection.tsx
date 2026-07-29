

export function YoutubeSection() {
  return (
    <section
      className="components-youtube-section-section"
      data-node-id="1695:10759"
      data-name="card_youtube"
      aria-labelledby="youtube-title"
    >
      <img className="components-youtube-section-background" src="/youtube-section/background.png" alt="" />
      <img className="components-youtube-section-leftBull" src="/youtube-section/blurred-bull-02.png" alt="" aria-hidden="true" />
      <img className="components-youtube-section-rightBull" src="/youtube-section/blurred-bull-01.png" alt="" aria-hidden="true" />

      <div className="components-youtube-section-card">
        <div className="components-youtube-section-intro">
          <img className="components-youtube-section-mascot" src="/youtube-section/youtube-bull.png" alt="" />
          <div>
            <h2 id="youtube-title">o acf sports agora está no YouTube</h2>
            <p>a mesma resenha, ainda mais acessível e com a qualidade de sempre.</p>
          </div>
        </div>

        <div className="components-youtube-section-ctaBlock">
          <div>
            <h3>seja membro do canal</h3>
            <p>fique por dentro das novidades no youtube do soberano</p>
          </div>
          <a
            className="components-youtube-section-button"
            href="http://www.youtube.com/@ACFsportsTV"
            target="_blank"
            rel="noreferrer"
          >
            inscreva-se no canal do youtube
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M9 7H17V15"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </a>
        </div>

        <div className="components-youtube-section-network">
          <img src="/youtube-section/bull-logo.png" alt="" />
          <p>
            <span>rede</span>
            ACF soberano
          </p>
        </div>
      </div>
    </section>
  );
}
