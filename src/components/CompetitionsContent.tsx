"use client";

import { useRef, useState, type MouseEvent } from "react";
import { Calendar, ChevronDown, Clock, MapPin, Trophy, X } from "lucide-react";
import type { HomeCompetition } from "@/data/competitions";

const fallbackAcfLogo = "/header/symbol.png";
const bullMark = "/contact/bull.png";

type MatchDetail = {
  id: string;
  competition: string;
  date: string;
  time: string;
  location: string;
  homeTeam: { name: string; logo: string };
  awayTeam: { name: string; logo: string };
  status: "upcoming" | "finished";
  result?: string;
};

export type NextGameData = {
  competition: string;
  date: string;
  time: string;
  location: string;
  opponentName: string;
  opponentLogo: string;
} | null;

export type PreviousMatchData = Array<{
  id: string;
  competition: string;
  date: string;
  time: string;
  location: string;
  opponentName: string;
  opponentLogo: string;
  result: string;
}>;

const CLUB_NAME = "ACF Sports/Vila Mercado";

function TeamBadge({ logo, name, home }: { logo: string; name: string; home?: boolean }) {
  return (
    <div className="components-competitions-content-team">
      <span className={`components-competitions-content-teamLogo`}>
        <img src={logo} alt={name} />
      </span>
      <span>{name}</span>
    </div>
  );
}

export function CompetitionsContent({
  nextGame,
  competitions,
  previousMatches,
  clubLogo
}: {
  nextGame: NextGameData;
  competitions: HomeCompetition[];
  previousMatches: PreviousMatchData;
  clubLogo?: string;
}) {
  const acfLogo = clubLogo || fallbackAcfLogo;
  const [selectedCompId, setSelectedCompId] = useState<string | undefined>(competitions[0]?.id);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activeModalMatch, setActiveModalMatch] = useState<MatchDetail | null>(null);
  const [isDraggingTable, setIsDraggingTable] = useState(false);
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0 });

  const handleTableDragStart = (event: MouseEvent<HTMLDivElement>) => {
    const wrap = tableWrapRef.current;
    if (!wrap) return;
    dragStateRef.current = { startX: event.pageX, startScrollLeft: wrap.scrollLeft };
    setIsDraggingTable(true);
  };

  const handleTableDragMove = (event: MouseEvent<HTMLDivElement>) => {
    const wrap = tableWrapRef.current;
    if (!wrap || !isDraggingTable) return;
    const delta = event.pageX - dragStateRef.current.startX;
    wrap.scrollLeft = dragStateRef.current.startScrollLeft - delta;
  };

  const handleTableDragEnd = () => {
    setIsDraggingTable(false);
  };

  const selectedComp = competitions.find((c) => c.id === selectedCompId) ?? competitions[0];
  const currentStandings = selectedComp?.standings ?? [];

  const nextMatchData: MatchDetail | null = nextGame
    ? {
        id: "next-db",
        competition: nextGame.competition,
        date: nextGame.date,
        time: nextGame.time,
        location: nextGame.location,
        homeTeam: { name: CLUB_NAME, logo: acfLogo },
        awayTeam: { name: nextGame.opponentName, logo: nextGame.opponentLogo },
        status: "upcoming"
      }
    : null;

  const previousMatchDetails: MatchDetail[] = previousMatches.map((match) => ({
    id: match.id,
    competition: match.competition,
    date: match.date,
    time: match.time,
    location: match.location,
    homeTeam: { name: CLUB_NAME, logo: acfLogo },
    awayTeam: { name: match.opponentName, logo: match.opponentLogo },
    status: "finished",
    result: match.result
  }));

  return (
    <section
      className="components-competitions-content-section"
      data-node-id="2396-21910"
      aria-label="Tabelas e jogos"
    >
      <img
        className="components-competitions-content-bullMark"
        src={bullMark}
        alt=""
        aria-hidden="true"
      />

      <div className="components-competitions-content-inner">
        <h2>Próxima Partida</h2>

        {nextMatchData ? (
          <article className="components-competitions-content-nextMatch">
            <div className="components-competitions-content-matchTeams">
              <TeamBadge logo="/squad/simble-black.png" name={nextMatchData.homeTeam.name} home />
              <strong>x</strong>
              <TeamBadge logo={nextMatchData.awayTeam.logo} name={nextMatchData.awayTeam.name} />
            </div>

            <div className="components-competitions-content-separator" />

            <div className="components-competitions-content-matchMeta">
              <p>{nextMatchData.competition}</p>
              <button
                type="button"
                className="components-competitions-content-details"
                onClick={() => setActiveModalMatch(nextMatchData)}
                aria-label="Ver mais detalhes da próxima partida"
              >
                <Calendar size={18} aria-hidden="true" />
                Ver mais detalhes da partida
              </button>
            </div>
          </article>
        ) : (
          <p className="components-competitions-content-noMatch">Nenhuma partida agendada no momento.</p>
        )}

        <hr className="components-competitions-content-sectionDivider" />

        <div className="components-competitions-content-contentGrid">
          {/* Partidas Anteriores */}
          <section
            className="components-competitions-content-previous"
            aria-labelledby="previous-title"
          >
            <h2 id="previous-title">Partidas Anteriores</h2>
            {previousMatchDetails.length > 0 ? (
              <div className="components-competitions-content-previousList">
                {previousMatchDetails.map((match) => (
                  <article
                    className="components-competitions-content-previousCard"
                    key={match.id}
                  >
                    <TeamBadge logo={match.homeTeam.logo} name={match.homeTeam.name} home />
                    <strong>{match.result}</strong>
                    <TeamBadge logo={match.awayTeam.logo} name={match.awayTeam.name} />

                    <div className="components-competitions-content-cardSeparator" />

                    <div className="components-competitions-content-previousMeta">
                      <p>{match.competition}</p>
                      <button
                        type="button"
                        className="components-competitions-content-details"
                        onClick={() => setActiveModalMatch(match)}
                        aria-label={`Ver mais detalhes da partida contra ${match.awayTeam.name}`}
                      >
                        <Calendar size={16} aria-hidden="true" />
                        Ver mais detalhes da partida
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="components-competitions-content-noMatch">
                Nenhuma partida anterior registrada no momento.
              </p>
            )}
          </section>

          {/* Tabela de Classificação */}
          <section
            className="components-competitions-content-tableBlock"
            aria-labelledby="standings-title"
          >
            {selectedComp ? (
              <>
                <div className="components-competitions-content-tableHeaderWrap">
                  <button
                    className="components-competitions-content-tableTitle"
                    type="button"
                    id="standings-title"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    disabled={competitions.length <= 1}
                  >
                    <span>{selectedComp.title}</span>
                    {competitions.length > 1 && (
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {dropdownOpen && competitions.length > 1 && (
                    <div
                      className="components-competitions-content-dropdownMenu"
                      role="listbox"
                      aria-label="Selecione a competição"
                    >
                      {competitions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          role="option"
                          aria-selected={option.id === selectedComp.id}
                          className={`components-competitions-content-dropdownItem ${
                            option.id === selectedComp.id ? "active" : ""
                          }`}
                          onClick={() => {
                            setSelectedCompId(option.id);
                            setDropdownOpen(false);
                          }}
                        >
                          {option.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`components-competitions-content-tableWrap ${
                    isDraggingTable ? "components-competitions-content-tableWrapDragging" : ""
                  }`}
                  ref={tableWrapRef}
                  onMouseDown={handleTableDragStart}
                  onMouseMove={handleTableDragMove}
                  onMouseUp={handleTableDragEnd}
                  onMouseLeave={handleTableDragEnd}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Clube</th>
                        <th>Pts</th>
                        <th>Jog</th>
                        <th>Vit</th>
                        <th>Emp</th>
                        <th>Der</th>
                        <th>Sg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStandings.map((entry) => {
                        const posNum = Number(entry.position);
                        const isRelegated = posNum > 6;
                        return (
                          <tr key={`${selectedComp.id}-${entry.position}`}>
                            <td>
                              <span
                                className={
                                  isRelegated
                                    ? "components-competitions-content-relegated"
                                    : ""
                                }
                              >
                                {entry.position.padStart(2, "0")}
                              </span>
                              {entry.team}
                            </td>
                            <td className="components-competitions-content-points">
                              {entry.points || "00"}
                            </td>
                            <td>{entry.played || "00"}</td>
                            <td>{entry.wins || "00"}</td>
                            <td>{entry.draws || "00"}</td>
                            <td>{entry.losses || "00"}</td>
                            <td>{entry.goalDifference || "00"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </>
            ) : (
              <p className="components-competitions-content-noMatch">
                Nenhuma tabela disponível no momento.
              </p>
            )}
          </section>
        </div>
      </div>

      {/* Modal de Detalhes da Partida */}
      {activeModalMatch && (
        <div
          className="components-competitions-modal-overlay"
          onClick={() => setActiveModalMatch(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-match-title"
        >
          <div
            className="components-competitions-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="components-competitions-modal-close"
              type="button"
              onClick={() => setActiveModalMatch(null)}
              aria-label="Fechar detalhes"
            >
              <X size={20} />
            </button>

            <header className="components-competitions-modal-header">
              <span className="components-competitions-modal-badge">
                <Trophy size={14} className="inline mr-1" />
                {activeModalMatch.competition}
              </span>
              <h3 id="modal-match-title">Detalhes do Confronto</h3>
            </header>

            <div className="components-competitions-modal-scoreboard">
              <div className="components-competitions-modal-team">
                <img src={activeModalMatch.homeTeam.logo} alt="" />
                <span>{activeModalMatch.homeTeam.name}</span>
              </div>
              <div className="components-competitions-modal-score">
                {activeModalMatch.status === "finished" ? (
                  <span>{activeModalMatch.result}</span>
                ) : (
                  <span>VS</span>
                )}
              </div>
              <div className="components-competitions-modal-team">
                <img src={activeModalMatch.awayTeam.logo} alt="" />
                <span>{activeModalMatch.awayTeam.name}</span>
              </div>
            </div>

            <div className="components-competitions-modal-infoList">
              <div className="components-competitions-modal-infoItem">
                <Calendar size={16} />
                <span>{activeModalMatch.date}</span>
              </div>
              <div className="components-competitions-modal-infoItem">
                <Clock size={16} />
                <span>{activeModalMatch.time} HS</span>
              </div>
              <div className="components-competitions-modal-infoItem">
                <MapPin size={16} />
                <span>{activeModalMatch.location}</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
