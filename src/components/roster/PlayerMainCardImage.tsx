import type { Athlete } from "@/data/roster";

type PlayerMainCardImageProps = {
  name: string;
  nickname: string;
  photo: string;
  number: number;
  position: Athlete["position"];
  category: Athlete["category"];
};

export function PlayerMainCardImage({
  name,
  nickname,
  photo,
  number,
  position,
  category,
}: PlayerMainCardImageProps) {
  const src = createCardImage({
    name,
    nickname,
    photo,
    number,
    position,
    category,
  });

  return <img className="components-roster-player-main-card-image-cardImage" src={src} alt={`Card do jogador ${name}`} />;
}

function createCardImage(props: PlayerMainCardImageProps) {
  const positionLabel = positionLabels[props.position];
  const categoryLabel = props.category === "futsal" ? "Futsal" : "Campo";
  const safeName = escapeXml(props.name);
  const safeNickname = escapeXml(props.nickname);
  const safePosition = escapeXml(positionLabel);
  const safeCategory = escapeXml(categoryLabel);

  const svg = `
    <svg width="468" height="640" viewBox="0 0 468 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="70" y1="12" x2="426" y2="640" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#07243D"/>
          <stop offset="0.62" stop-color="#020C14"/>
          <stop offset="1" stop-color="#121212"/>
        </linearGradient>
        <linearGradient id="orange" x1="48" y1="56" x2="420" y2="620" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF3203"/>
          <stop offset="1" stop-color="#8F301D"/>
        </linearGradient>
        <linearGradient id="fade" x1="234" y1="360" x2="234" y2="602" gradientUnits="userSpaceOnUse">
          <stop stop-color="#020C14" stop-opacity="0"/>
          <stop offset="0.62" stop-color="#020C14" stop-opacity="0.92"/>
          <stop offset="1" stop-color="#020C14"/>
        </linearGradient>
        <clipPath id="photoClip">
          <path d="M58 42H410V428L234 548L58 428V42Z"/>
        </clipPath>
      </defs>
      <rect width="468" height="640" rx="8" fill="#020C14"/>
      <path d="M20 20H448V620H20V20Z" fill="url(#bg)" stroke="url(#orange)" stroke-width="3"/>
      <path d="M42 34H426V450L234 584L42 450V34Z" fill="#051829" stroke="#FF3203" stroke-width="2"/>
      <path d="M72 64H396V428L234 540L72 428V64Z" fill="#08243B" opacity="0.72"/>
      <image href="${props.photo}" x="58" y="42" width="352" height="506" preserveAspectRatio="xMidYMin slice" clip-path="url(#photoClip)"/>
      <rect x="42" y="344" width="384" height="240" fill="url(#fade)"/>
      <path d="M42 450L234 584L426 450V584H42V450Z" fill="#020C14" opacity="0.96"/>
      <circle cx="92" cy="510" r="38" fill="url(#orange)"/>
      <text x="92" y="523" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="34" font-weight="800" fill="#F5F5F5">${props.number}</text>
      <text x="146" y="486" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="700" fill="#F5F5F5">${safeName}</text>
      <text x="146" y="520" font-family="Outfit, Arial, sans-serif" font-size="22" font-weight="600" fill="#FF3203">${safeNickname}</text>
      <text x="146" y="552" font-family="Outfit, Arial, sans-serif" font-size="17" font-weight="500" fill="#B3B3B3">${safePosition} / ${safeCategory}</text>
      <text x="234" y="606" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="18" font-weight="700" fill="#FF3203">ACF SPORTS</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const positionLabels: Record<Athlete["position"], string> = {
  goleiro: "Goleiro",
  defensor: "Defensor",
  "meio-campo": "Meio-campo",
  atacante: "Atacante",
};
