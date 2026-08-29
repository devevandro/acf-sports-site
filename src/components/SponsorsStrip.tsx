
const sponsorList = [
  "Parceiro Oficial 1",
  "Soberano Store",
  "Patrocinador Master",
  "Academia Fit",
  "DM Tech",
  "EBC Cons",
  "CP Futsal",
  "ACF Sports",
];

const SPONSORS_STRIP_ENABLED = false;

export function SponsorsStrip() {
  if (!SPONSORS_STRIP_ENABLED) {
    return null;
  }

  return (
    <section
      className="components-sponsors-strip-strip"
      style={{
        position: "relative",
        width: "100%",
        height: "184px",
        overflow: "hidden",
        backgroundImage: "url('/backgrounds/background-sponsor.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "#ffffff",
      }}
      data-node-id="1718:11201"
      data-name="patrocinio"
      aria-labelledby="sponsors-title"
    >
      <div className="components-sponsors-strip-decorText" aria-hidden="true">
        <span>a</span>
        <span>c</span>
        <span>f</span>
        <strong>acf sports</strong>
      </div>

      <div className="components-sponsors-strip-inner">
        <h2 id="sponsors-title">patrocinadores</h2>
        <div className="components-sponsors-strip-track">
          {[...sponsorList, ...sponsorList, ...sponsorList].map((name, index) => (
            <div className="components-sponsors-strip-logoCard flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded border border-white/20 text-xs font-bold text-white uppercase tracking-wider min-w-30" key={`${name}-${index}`}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
