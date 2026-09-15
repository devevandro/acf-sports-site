"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLUB_NAME = "ACF Sports/Vila Mercado";
const fallbackOpponentLogo = "/header/symbol.png";

type Team = {
  name: string;
  logo: string;
};

type MatchCardProps = {
  date: string;
  home: Team;
  away: Team;
  location?: string;
};

function MatchCard({ date, home, away, location }: MatchCardProps) {
  return (
    <article className="components-games-panel-matchCard components-games-panel-upcomingCard">
      <div className="components-games-panel-matchDate components-games-panel-upcomingDate" title={date}>
        {date}
      </div>
      <div className="components-games-panel-matchBody">
        <div className="components-games-panel-matchTeams">
          <div className="components-games-panel-team">
            <img src={home.logo} alt={home.name} className="w-8 h-8 object-contain" />
            <span title={home.name}>{home.name}</span>
          </div>
          <div className="components-games-panel-score">x</div>
          <div className="components-games-panel-team">
            <img src={away.logo} alt={away.name} className="w-8 h-8 object-contain" />
            <span title={away.name}>{away.name}</span>
          </div>
        </div>
        {location && (
          <div className="components-games-panel-matchLocation" title={location}>
            {location}
          </div>
        )}
      </div>
    </article>
  );
}

export type UpcomingGameData = {
  id: string;
  opponent: string;
  opponentLogo: string | null;
  location: string;
  formattedDate: string;
};

export function GamesUpcomingCarousel({
  games,
  acfLogo
}: {
  games: UpcomingGameData[];
  acfLogo: string;
}) {
  const [index, setIndex] = useState(0);
  const currentGame = games[index];
  if (!currentGame) return null;

  return (
    <div className="components-games-panel-upcomingCarousel">
      <MatchCard
        date={currentGame.formattedDate}
        home={{ name: CLUB_NAME, logo: acfLogo }}
        away={{ name: currentGame.opponent, logo: currentGame.opponentLogo ?? fallbackOpponentLogo }}
        location={currentGame.location}
      />
      {games.length > 1 && (
        <div className="components-games-panel-upcomingNav">
          <button
            type="button"
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            disabled={index === 0}
            aria-label="Partida anterior"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => Math.min(prev + 1, games.length - 1))}
            disabled={index === games.length - 1}
            aria-label="Próxima partida"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
