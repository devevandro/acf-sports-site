"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Clock,
  MapPin,
  Trophy,
  X,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

const acfLogo = "/header/symbol.png";
const bullMark = "/contact/bull.png";

type MatchDetail = {
  id: string;
  competition: string;
  date: string;
  time: string;
  location: string;
  homeTeam: { name: string; logo: string; score: number };
  awayTeam: { name: string; logo: string; score: number };
  status: "upcoming" | "finished";
  highlights?: string[];
  referee?: string;
};

const nextMatchData: MatchDetail = {
  id: "next-1",
  competition: "Citadino Segunda Divisão / 2026",
  date: "11 de Fevereiro, 2026",
  time: "20:00",
  location: "Ginásio de Esportes Cornélio Procópio",
  homeTeam: { name: "ACF Sport Club", logo: acfLogo, score: 0 },
  awayTeam: { name: "Real Figueira", logo: acfLogo, score: 0 },
  status: "upcoming",
  highlights: [
    "Confronto válido pela 3ª rodada da fase de grupos",
    "Entrada gratuita para sócios adimplentes",
    "Transmissão ao vivo nas redes oficiais"
  ],
  referee: "Marcos Antonio Silva"
};

const previousMatchesData: MatchDetail[] = [
  {
    id: "prev-1",
    competition: "Citadino Segunda Divisão / 2026",
    date: "04 de Fevereiro, 2026",
    time: "20:30",
    location: "Ginásio Municipal de Esportes",
    homeTeam: { name: "ACF Sport Club", logo: acfLogo, score: 1 },
    awayTeam: { name: "Real Figueira", logo: acfLogo, score: 1 },
    status: "finished",
    highlights: [
      "Gol de empate nos minutos finais",
      "Destaque para a atuação defensiva da ACF",
      "Público estimado: 850 torcedores"
    ],
    referee: "Carlos Eduardo Santos"
  },
  {
    id: "prev-2",
    competition: "Citadino Segunda Divisão / 2026",
    date: "28 de Janeiro, 2026",
    time: "19:45",
    location: "Arena Central Cornélio",
    homeTeam: { name: "ACF Sport Club", logo: acfLogo, score: 5 },
    awayTeam: { name: "Vila Real", logo: acfLogo, score: 1 },
    status: "finished",
    highlights: [
      "Goleada convincente da ACF em casa",
      "Hat-trick do pivô principal",
      "Domínio amplo da posse de bola"
    ],
    referee: "Roberto Lima"
  },
  {
    id: "prev-3",
    competition: "Citadino Segunda Divisão / 2026",
    date: "21 de Janeiro, 2026",
    time: "20:00",
    location: "Ginásio Sol Nascente",
    homeTeam: { name: "ACF Sport Club", logo: acfLogo, score: 4 },
    awayTeam: { name: "EBC Construtor", logo: acfLogo, score: 6 },
    status: "finished",
    highlights: [
      "Jogo movimentado com 10 gols marcados",
      "Reação da ACF no segundo tempo",
      "Partida com ritmo muito forte"
    ],
    referee: "Fernando Souza"
  }
];

type CompetitionOption = {
  id: string;
  name: string;
};

const competitionOptions: CompetitionOption[] = [
  { id: "citadino-1", name: "Citadino Primeira Divisão - Cp" },
  { id: "citadino-2", name: "Citadino Segunda Divisão / 2026" },
  { id: "copa-cornelio", name: "Copa Cornélio Futsal 2026" }
];

const standingsData: Record<string, Array<[string, string, string, string, string, string, string, string, string, string]>> = {
  "citadino-1": [
    ["01", "ACF Sport Club", "18", "07", "05", "03", "00", "28", "12", "+16"],
    ["02", "Azul Clube", "16", "07", "05", "01", "01", "22", "14", "+8"],
    ["03", "Guarani", "14", "07", "04", "02", "01", "19", "15", "+4"],
    ["04", "Limitados F.C", "11", "07", "03", "02", "02", "16", "16", "0"],
    ["05", "Real Meleiro", "09", "07", "02", "03", "02", "14", "17", "-3"],
    ["06", "Storge Deco.", "07", "07", "02", "01", "04", "13", "19", "-6"],
    ["07", "Vila Nova", "04", "07", "01", "01", "05", "10", "21", "-11"],
    ["08", "Zico Pinturas", "02", "07", "00", "02", "05", "08", "26", "-18"]
  ],
  "citadino-2": [
    ["01", "Real Figueira", "16", "06", "05", "01", "00", "20", "08", "+12"],
    ["02", "ACF Sport Club", "14", "06", "04", "02", "00", "18", "09", "+9"],
    ["03", "EBC Construtor", "12", "06", "04", "00", "02", "17", "12", "+5"],
    ["04", "Vila Real", "09", "06", "03", "00", "03", "13", "14", "-1"],
    ["05", "União Futsal", "06", "06", "02", "00", "04", "11", "16", "-5"],
    ["06", "Progresso FC", "04", "06", "01", "01", "04", "09", "17", "-8"],
    ["07", "Atlético CP", "03", "06", "01", "00", "05", "07", "15", "-8"],
    ["08", "Comercial FC", "01", "06", "00", "01", "05", "05", "18", "-13"]
  ],
  "copa-cornelio": [
    ["01", "ACF Sport Club", "12", "04", "04", "00", "00", "15", "04", "+11"],
    ["02", "EBC Construtor", "09", "04", "03", "00", "01", "12", "07", "+5"],
    ["03", "Vila Real", "06", "04", "02", "00", "02", "09", "10", "-1"],
    ["04", "Guarani", "03", "04", "01", "00", "03", "06", "11", "-5"],
    ["05", "Real Meleiro", "00", "04", "00", "00", "04", "04", "14", "-10"]
  ]
};

function TeamBadge({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="components-competitions-content-team">
      <img src={logo} alt={name} />
      <span>{name}</span>
    </div>
  );
}

export function CompetitionsContent() {
  const [selectedCompId, setSelectedCompId] = useState<string>("citadino-1");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activeModalMatch, setActiveModalMatch] = useState<MatchDetail | null>(null);

  const selectedComp = competitionOptions.find((c) => c.id === selectedCompId) || competitionOptions[0];
  const currentStandings = standingsData[selectedCompId] || standingsData["citadino-1"];

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

        <article className="components-competitions-content-nextMatch">
          <div className="components-competitions-content-matchTeams">
            <TeamBadge logo={nextMatchData.homeTeam.logo} name={nextMatchData.homeTeam.name} />
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

        <hr className="components-competitions-content-sectionDivider" />

        <div className="components-competitions-content-contentGrid">
          {/* Partidas Anteriores */}
          <section
            className="components-competitions-content-previous"
            aria-labelledby="previous-title"
          >
            <h2 id="previous-title">Partidas Anteriores</h2>
            <div className="components-competitions-content-previousList">
              {previousMatchesData.map((match) => (
                <article
                  className="components-competitions-content-previousCard"
                  key={match.id}
                >
                  <TeamBadge logo={match.homeTeam.logo} name={match.homeTeam.name} />
                  <strong>
                    {match.homeTeam.score} x {match.awayTeam.score}
                  </strong>
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
          </section>

          {/* Tabela de Classificação */}
          <section
            className="components-competitions-content-tableBlock"
            aria-labelledby="standings-title"
          >
            <div className="components-competitions-content-tableHeaderWrap">
              <button
                className="components-competitions-content-tableTitle"
                type="button"
                id="standings-title"
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span>{selectedComp.name}</span>
                <ChevronDown
                  size={24}
                  className={`transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <div
                  className="components-competitions-content-dropdownMenu"
                  role="listbox"
                  aria-label="Selecione a competição"
                >
                  {competitionOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      role="option"
                      aria-selected={option.id === selectedCompId}
                      className={`components-competitions-content-dropdownItem ${
                        option.id === selectedCompId ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCompId(option.id);
                        setDropdownOpen(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="components-competitions-content-tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Clube</th>
                    <th>Pts</th>
                    <th>Jog</th>
                    <th>Vit</th>
                    <th>Emp</th>
                    <th>Der</th>
                    <th>Gm</th>
                    <th>Gc</th>
                    <th>Sg</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStandings.map((row) => {
                    const posNum = Number(row[0]);
                    const isRelegated = posNum > 6;
                    return (
                      <tr key={`${selectedCompId}-${row[0]}`}>
                        <td>
                          <span
                            className={
                              isRelegated
                                ? "components-competitions-content-relegated"
                                : ""
                            }
                          >
                            {row[0]}
                          </span>
                          {row[1]}
                        </td>
                        <td className="components-competitions-content-points">
                          {row[2]}
                        </td>
                        <td>{row[3]}</td>
                        <td>{row[4]}</td>
                        <td>{row[5]}</td>
                        <td>{row[6]}</td>
                        <td>{row[7]}</td>
                        <td>{row[8]}</td>
                        <td>{row[9]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="components-competitions-content-legend">
              <span>
                <i className="components-competitions-content-promotedDot" />
                Classificados para próxima fase
              </span>
              <span>
                <i className="components-competitions-content-relegatedDot" />
                Rebaixados para a segunda divisão
              </span>
            </div>
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
                  <span>
                    {activeModalMatch.homeTeam.score} - {activeModalMatch.awayTeam.score}
                  </span>
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

            {activeModalMatch.highlights && (
              <div className="components-competitions-modal-highlights">
                <h4>Observações da Partida</h4>
                <ul>
                  {activeModalMatch.highlights.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={14} className="text-amber-500 inline mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
