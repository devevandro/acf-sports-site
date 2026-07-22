"use client";

import { useState } from "react";
import styles from "./HeroNews.module.css";

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
      className={styles.hero}
      data-node-id="1234:7124"
      data-name="noticias"
      aria-label="Noticia em destaque"
    >
      <div className={styles.stage}>
        <img
          className={styles.background}
          src={activeSlide.image}
          alt={activeSlide.alt}
        />

        <a className={styles.storyCard} href="#noticias">
          <p className={styles.category}>{activeSlide.label}</p>
          <h1 className={styles.title}>{activeSlide.title}</h1>
          <p className={styles.summary}>{activeSlide.summary}</p>
        </a>
      </div>

      <div className={styles.thumbnails} aria-label="Selecionar destaque">
        {slides.map((slide, index) => (
          <button
            className={`${styles.thumbnail} ${index === activeSlideIndex ? styles.thumbnailActive : ""}`}
            key={slide.label}
            type="button"
            aria-label={slide.label}
            aria-pressed={index === activeSlideIndex}
            onClick={() => setActiveSlideIndex(index)}
          >
            <img className={styles.thumbnailImage} src={slide.image} alt="" />
            <span className={styles.progress} />
          </button>
        ))}
      </div>
    </section>
  );
}
