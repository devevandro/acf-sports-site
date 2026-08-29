"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PINNED_CAROUSEL_NEWS_ID, type NewsItem } from "@/data/news";

function buildCarouselSlides(news: NewsItem[]): NewsItem[] {
  const pinned = news.find((item) => item.id === PINNED_CAROUSEL_NEWS_ID);
  const others = news.filter((item) => item.highlight && item.id !== PINNED_CAROUSEL_NEWS_ID);

  if (!pinned) {
    return others;
  }

  const slides = [...others];
  slides.splice(Math.min(3, slides.length), 0, pinned);
  return slides;
}

export function HeroNews({ news }: { news: NewsItem[] }) {
  const slides = buildCarouselSlides(news);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = slides[activeSlideIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    }, 12000);

    return () => clearInterval(timer);
  }, [activeSlideIndex, slides.length]);

  if (slides.length === 0 || !activeSlide) {
    return null;
  }

  return (
    <div className="components-hero-news-wrapper">
      <section
        className="components-hero-news-hero"
        data-node-id="1234:7124"
        data-name="noticias"
        aria-label="Notícia em destaque"
      >
        <div className="components-hero-news-stage">
          <img
            key={activeSlide.image}
            className="components-hero-news-background"
            src={activeSlide.image}
            alt={activeSlide.title}
          />

          <div className="components-hero-news-scrim" />

          {activeSlide.id === PINNED_CAROUSEL_NEWS_ID ? (
            <div key={activeSlide.id} className="components-hero-news-storyCard">
              <h1 className="components-hero-news-title">{activeSlide.title}</h1>
              <Link className="components-hero-news-ctaButton" href="/clube/patrocinadores">
                Ver Planos <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <Link key={activeSlide.id} className="components-hero-news-storyCard" href={`/noticias/${activeSlide.id}`}>
              <h1 className="components-hero-news-title">{activeSlide.title}</h1>
              <span className="components-hero-news-ctaButton">
                Ler Notícia <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>

        <div className="components-hero-news-thumbnails" aria-label="Selecionar destaque">
          {slides.map((slide, index) => {
            const isActive = index === activeSlideIndex;
            return (
              <button
                className={`components-hero-news-thumbnail ${isActive ? "components-hero-news-thumbnailActive" : ""}`}
                key={slide.id}
                type="button"
                aria-label={slide.tag}
                aria-pressed={isActive}
                onClick={() => setActiveSlideIndex(index)}
              >
                <img
                  className="components-hero-news-thumbnailImage"
                  src={slide.image}
                  alt=""
                />
                {isActive && (
                  <span
                    key={activeSlideIndex}
                    className="components-hero-news-progress"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
