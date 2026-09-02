"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { RosterPlayerCard, RosterStaffMember } from "@/data/players";

type AthleteCardProps = {
  person: RosterPlayerCard | RosterStaffMember;
  variant?: "athlete" | "staff";
};

const fallbackPhoto = "/squad/player-placeholder.png";
const REVEAL_TIMEOUT_MS = 2500;

export function AthleteCard({ person, variant = "athlete" }: AthleteCardProps) {
  const isPlayer = "number" in person;
  const photo = person.image || fallbackPhoto;
  const [revealed, setRevealed] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
    if (!isTouchDevice || revealed) return;

    event.preventDefault();
    setRevealed(true);
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setRevealed(false), REVEAL_TIMEOUT_MS);
  };

  const content = (
    <>
      <div className="components-roster-athlete-card-imageWrap">
        <img className="components-roster-athlete-card-image" src={photo} alt={person.name} />
      </div>
      <div className="components-roster-athlete-card-info">
        {isPlayer ? (
          <span className="components-roster-athlete-card-label">{formatNumber(person.number)}</span>
        ) : (
          <img className="components-roster-athlete-card-staffIcon" src="/header/symbol.png" alt="" aria-hidden="true" />
        )}
        <div>
          <h3 className="components-roster-athlete-card-title">{person.nickname}</h3>
          <p className="components-roster-athlete-card-text">{isPlayer ? person.positionLabel : person.role}</p>
        </div>
      </div>
    </>
  );

  if (isPlayer) {
    return (
      <Link
        className={`components-roster-athlete-card-card components-roster-athlete-card-linkCard${
          revealed ? " components-roster-athlete-card-revealed" : ""
        }`}
        href={`/clube/elenco/${person.slug}`}
        onClick={handleClick}
      >
        {content}
      </Link>
    );
  }

  return <article className="components-roster-athlete-card-card components-roster-athlete-card-staff">{content}</article>;
}

function formatNumber(value: string) {
  return /^\d+$/.test(value) ? value.padStart(2, "0") : value;
}
