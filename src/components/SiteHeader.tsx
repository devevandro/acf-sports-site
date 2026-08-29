import { MainMenu } from "@/components/MainMenu";
import { getTeamInfo } from "@/data/teamInfo";

type SiteHeaderProps = {
  active?: "home" | "news" | "club" | "sponsors" | "contact";
  activeClub?: "history" | "roster" | "competitions";
};

export async function SiteHeader({ active, activeClub }: SiteHeaderProps) {
  const teamInfo = await getTeamInfo();

  return <MainMenu active={active} activeClub={activeClub} logoSrc={teamInfo.symbol} />;
}
