"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function NewsHeroImage({ src, alt }: { src: string; alt: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <img
        className={`components-news-detail-heroImage${isMobile ? " components-news-detail-heroImageZoomable" : ""}`}
        src={src}
        alt={alt}
        onClick={() => {
          if (isMobile) setIsOpen(true);
        }}
      />

      {isOpen && (
        <div
          className="components-news-detail-imageLightbox"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="components-news-detail-imageLightboxClose"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar imagem ampliada"
          >
            <X size={22} />
          </button>
          <img className="components-news-detail-imageLightboxImg" src={src} alt={alt} />
        </div>
      )}
    </>
  );
}
