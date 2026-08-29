const headerGifs = [
  { src: "/gif/cf_gif.gif", duration: 13400 },
  { src: "/gif/25-anos.gif", duration: 10010 },
];

export function TopCf() {
  return (
    <div className="components-top-cf-topCf w-full overflow-hidden relative" data-name="Top Header">
      <img
        alt="Header"
        className="w-full h-full object-cover"
        src={headerGifs[0].src}
      />
    </div>
  );
}
