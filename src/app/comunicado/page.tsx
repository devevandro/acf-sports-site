import type { Metadata } from "next";
import { NoticeContent } from "@/components/NoticeContent";
import { getTeamInfo } from "@/data/teamInfo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Comunicado | ACF Sports",
  description:
    "O site do ACF Sports entrou em pré-temporada para reformulação e melhorias. Voltamos em breve, com tudo para 2027, a celebração de 25 anos do ACF.",
};

export default async function NoticePage() {
  const teamInfo = await getTeamInfo();

  return (
    <main className="app-comunicado-page-page">
      <NoticeContent
        socialLinks={{
          instagram: teamInfo.instagram,
          facebook: teamInfo.facebook,
          youtube: teamInfo.youtube,
        }}
      />
    </main>
  );
}
