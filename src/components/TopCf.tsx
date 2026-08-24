"use client";

import { useEffect, useState } from "react";

const headerGifs = [
  { src: "/gif/acf-na-veia.gif", duration: 13400 },
  { src: "/gif/25-anos.gif", duration: 10010 },
];

export function TopCf() {
  const [activeGifIndex, setActiveGifIndex] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveGifIndex((currentIndex) => (currentIndex + 1) % headerGifs.length);
    }, headerGifs[activeGifIndex].duration);

    return () => window.clearTimeout(timeoutId);
  }, [activeGifIndex]);

  return (
    <div className="components-top-cf-topCf w-full overflow-hidden relative" data-name="Top Header">
      <img
        alt="Header"
        className="w-full h-full object-cover"
        src={headerGifs[activeGifIndex].src}
      />
    </div>
  );
}
