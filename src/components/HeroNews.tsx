"use client";

import { useState } from "react";

const slides = [
  {
    image: "/carousel-01.png",
    label: "Jogos Abertos",
    title: "ACF Sports Tem Teste de Fogo Contra os Fortes Meninos de Ouro",
    summary: "A equipe quadricolor, tem estreia agendada para dia 05/11, já com grande clássico",
    alt: "Jogadores da ACF Sports comemorando em campo com bandeira",
  },
  {
    image: "/carouse-02.png",
    label: "Novidades",
    title: "ACF Sports Abre Novas Conversas Para Fortalecer o Projeto",
    summary: "Parcerias e bastidores movimentam a preparação da equipe para os próximos desafios",
    alt: "Pessoa sorrindo em arte promocional com elementos gráficos",
  },
  {
    image: "/carousel-03.png",
    label: "Mascote",
    title: "Mascote da ACF Sports Ganha Destaque na Identidade do Clube",
    summary: "O touro Ber reforça a presença visual da equipe dentro e fora das competições",
    alt: "Mascote touro da ACF Sports em diferentes poses",
  }
];

export function HeroNews() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];

  return (
    <section
      className="components-hero-news-hero"
      data-node-id="1234:7124"
      data-name="noticias"
      aria-label="Noticia em destaque"
    >
      <div className="components-hero-news-stage">
        <img
          className="components-hero-news-background"
          src={activeSlide.image}
          alt={activeSlide.alt}
        />

        <a className="components-hero-news-storyCard" href="#noticias">
          <p className="components-hero-news-category">{activeSlide.label}</p>
          <h1 className="components-hero-news-title">{activeSlide.title}</h1>
          <p className="components-hero-news-summary">{activeSlide.summary}</p>
        </a>
      </div>

      <div className="components-hero-news-thumbnails" aria-label="Selecionar destaque">
        {slides.map((slide, index) => (
          <button
            className={`components-hero-news-thumbnail ${index === activeSlideIndex ? "components-hero-news-thumbnailActive" : ""}`}
            key={slide.label}
            type="button"
            aria-label={slide.label}
            aria-pressed={index === activeSlideIndex}
            onClick={() => setActiveSlideIndex(index)}
          >
            <img className="components-hero-news-thumbnailImage" src={slide.image} alt="" />
            <span className="components-hero-news-progress" />
          </button>
        ))}
      </div>
    </section>
  );
}
