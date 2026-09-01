"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type HomeRosterAthlete = {
  id: string;
  slug: string;
  name: string;
  number: string;
};

function buildSlides(athletes: HomeRosterAthlete[]): HomeRosterAthlete[][] {
  return athletes.reduce<HomeRosterAthlete[][]>((slides, athlete, index) => {
    if (index % 2 === 0) {
      slides.push([athlete]);
    } else {
      slides[slides.length - 1].push(athlete);
    }
    return slides;
  }, []);
}

const cardPath = `M8 1
  H248
  Q255 1 255 8
  V121
  L240 136
  V214
  L255 229
  V319
  L128 447
  L1 319
  V229
  L16 214
  V136
  L1 121
  V8
  Q1 1 8 1
  Z`;

function AthleteCard({ athlete, position }: { athlete: HomeRosterAthlete; position: number }) {
  return (
    <Link
      href={`/clube/elenco/${athlete.slug}`}
      className={`components-roster-section-athlete components-roster-section-athlete${position}`}
      aria-label={`Ver perfil de ${athlete.name}`}
    >
      <svg
        className="components-roster-section-athleteCard"
        viewBox="0 0 256 448"
        role="img"
        aria-label={`${athlete.name}, camisa ${athlete.number}, atleta do ACF Sports`}
      >
        <defs>
          <clipPath id={`roster-card-shape-${athlete.id}`}>
            <path d={cardPath} />
          </clipPath>
        </defs>

        <path d={cardPath} fill="#01121F" />

        <image
          href="/squad/player.png"
          width="256"
          height="448"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#roster-card-shape-${athlete.id})`}
        />

        <path
          className="components-roster-section-athleteStroke"
          d={cardPath}
          fill="none"
          stroke="#b83e25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="components-roster-section-athleteInfo" aria-hidden="true">
        <span className="components-roster-section-athleteName">{athlete.name}</span>
        <span className="components-roster-section-athleteNumber">{athlete.number}</span>
      </div>
    </Link>
  );
}

export function RosterSection({ athletes }: { athletes: HomeRosterAthlete[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const visibleAthletes = isMobile ? athletes.slice(0, 4) : athletes;
  const athleteSlides = buildSlides(visibleAthletes);

  const handleScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setActiveSlide(index);
  };

  const goToSlide = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({ left: index * viewport.clientWidth, behavior: "smooth" });
    setActiveSlide(index);
  };

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('/backgrounds/background-player.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "#f5f5f5",
      }}
      data-node-id="1278:3855"
      data-name="elenco"
      aria-labelledby="roster-title"
    >
      <div className="components-roster-section-inner">
        <h2 className="components-roster-section-title" id="roster-title">
          elenco<span>.</span>
        </h2>

        <div
          className="components-roster-section-athletes"
          ref={viewportRef}
          onScroll={handleScroll}
        >
          {athleteSlides.map((slide, slideIndex) => (
            <div className="components-roster-section-slide" key={`slide-${slideIndex}`}>
              {slide.map((athlete, athleteIndex) => (
                <AthleteCard
                  athlete={athlete}
                  position={slideIndex * 2 + athleteIndex + 1}
                  key={athlete.id}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="components-roster-section-dots" role="tablist" aria-label="Selecionar atletas">
          {athleteSlides.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Ver atletas ${index + 1}`}
              className={`components-roster-section-dot ${
                index === activeSlide ? "components-roster-section-dotActive" : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <img
          className="components-roster-section-centerBull"
          src="/squad/center-bull.jpg"
          alt=""
          aria-hidden="true"
        />

        <Link className="components-roster-section-button" href="/clube/elenco">
          ver elenco completo
          <ArrowUpRight size={20} className="font-extrabold" />
        </Link>
      </div>
    </section>
  );
}
