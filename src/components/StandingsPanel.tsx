
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const rows = [
  ["01", "ACF S.C"],
  ["02", "EBC Cons"],
  ["03", "DM Tech"],
  ["04", "Real Mel"],
  ["05", "Azul Clube"],
  ["06", "Sibim Unt"]
];

export function StandingsPanel() {
  return (
    <aside className="components-standings-panel-panel" data-node-id="1888:10656" aria-labelledby="standings-title">
      <header className="components-standings-panel-header">
        <h2 id="standings-title">
          tabelas<span>.</span>
        </h2>
        <Link href="/clube/competicoes" className="inline-flex items-center gap-1">
          ver mais
          <ArrowUpRight size={16} />
        </Link>
      </header>

      <div className="components-standings-panel-tableCard">
        <button className="components-standings-panel-selectButton flex items-center justify-between w-full" type="button">
          <span>Segunda Divisão</span>
          <ChevronDown size={16} />
        </button>

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
            {rows.map(([position, club]) => (
              <tr key={position}>
                <td className="components-standings-panel-clubColumn">
                  <span>{position}</span>
                  {club}
                </td>
                <td className="components-standings-panel-points">00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
                <td>00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}

