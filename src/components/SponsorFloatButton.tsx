import Link from "next/link";

export function SponsorFloatButton() {
  return (
    <Link
      href="/clube/patrocinadores"
      className="components-sponsor-float-button-button"
      aria-label="Incentivar sem plano — conheça os patrocinadores do ACF Sports"
    >
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
    </Link>
  );
}
