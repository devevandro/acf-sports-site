"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { HomeCompetition } from "@/data/competitions";

export function StandingsPanelClient({ competitions }: { competitions: HomeCompetition[] }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(competitions[0]?.id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedCompetition = competitions.find((c) => c.id === selectedId) ?? competitions[0];

  if (!selectedCompetition) {
    return (
      <div className="components-standings-panel-tableCard">
        <p className="components-standings-panel-empty">Nenhuma tabela disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="components-standings-panel-tableCard">
      <button
        className="components-standings-panel-selectButton flex items-center justify-between w-full"
        type="button"
        aria-expanded={dropdownOpen}
        aria-haspopup="listbox"
        onClick={() => setDropdownOpen((prev) => !prev)}
        disabled={competitions.length <= 1}
      >
        <span>{selectedCompetition.title}</span>
        {competitions.length > 1 && <ChevronDown size={16} />}
      </button>

      {dropdownOpen && competitions.length > 1 && (
        <div className="components-standings-panel-dropdownMenu" role="listbox" aria-label="Selecione a competição">
          {competitions.map((competition) => (
            <button
              key={competition.id}
              type="button"
              role="option"
              aria-selected={competition.id === selectedCompetition.id}
              className={`components-standings-panel-dropdownItem ${
                competition.id === selectedCompetition.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedId(competition.id);
                setDropdownOpen(false);
              }}
            >
              {competition.title}
            </button>
          ))}
        </div>
      )}

      <div className="components-standings-panel-tableScroll">
        <table className="components-standings-panel-table">
          <thead>
            <tr>
              <th className="components-standings-panel-clubColumn">Clubes</th>
              <th>Pts</th>
              <th>Jgs</th>
              <th>Sgs</th>
              <th>Vit</th>
              <th>De</th>
            </tr>
          </thead>
          <tbody>
            {selectedCompetition.standings.map((entry) => (
              <tr key={`${selectedCompetition.id}-${entry.position}`}>
                <td className="components-standings-panel-clubColumn" title={entry.team}>
                  <span>{entry.position.padStart(2, "0")}</span>
                  {entry.team}
                </td>
                <td className="components-standings-panel-points">{entry.points || "00"}</td>
                <td>{entry.played || "00"}</td>
                <td>{entry.goalDifference || "00"}</td>
                <td>{entry.wins || "00"}</td>
                <td>{entry.losses || "00"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
