"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SponsorButtonContent() {
  return (
    <>
      <img
        className="components-sponsor-float-button-icon"
        src="/sponsor/bull-float-button.svg"
        alt=""
        aria-hidden="true"
      />
      <span className="components-sponsor-float-button-text">
        <span>incentivar</span>
        <span>sem plano</span>
      </span>
    </>
  );
}

export function SponsorFloatButton() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const isNoticePage = pathname === "/comunicado";

  useEffect(() => {
    if (isNoticePage) return;
    const footer = document.querySelector("footer");
    if (!footer) return;

    let ticking = false;
    const checkFooterVisible = () => {
      ticking = false;
      const rect = footer.getBoundingClientRect();
      setHidden(rect.top < window.innerHeight);
    };
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkFooterVisible);
    };

    checkFooterVisible();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isNoticePage]);

  if (isNoticePage) return null;

  return (
    <Link
      href="/clube/patrocinadores"
      className={`components-sponsor-float-button-button${hidden ? " components-sponsor-float-button-hidden" : ""}`}
      aria-label="Incentivar sem plano — conheça os patrocinadores do ACF Sports"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
    >
      <SponsorButtonContent />
    </Link>
  );
}

export function SponsorDockedButton() {
  return (
    <Link
      href="/clube/patrocinadores"
      className="components-sponsor-float-button-docked"
      aria-label="Incentivar sem plano — conheça os patrocinadores do ACF Sports"
    >
      <SponsorButtonContent />
    </Link>
  );
}
