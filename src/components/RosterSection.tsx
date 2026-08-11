import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const athleteCards = [
  { id: 1, name: "Carlos", number: "01" },
  { id: 2, name: "David", number: "06" },
  { id: 3, name: "Rafael", number: "10" },
  { id: 4, name: "Marcos", number: "18" },
  { id: 5, name: "Felipe", number: "23" },
];

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

export function RosterSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "1048px",
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

        <div className="components-roster-section-athletes">
          {athleteCards.map((athlete) => (
            <article
              className={`components-roster-section-athlete ${`components-roster-section-athlete${athlete.id}`}`}
              key={athlete.id}
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
            </article>
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
