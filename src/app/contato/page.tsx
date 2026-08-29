import { ContactContent } from "@/components/ContactContent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getTeamInfo } from "@/data/teamInfo";

export const revalidate = 60;

export default async function ContactPage() {
  const teamInfo = await getTeamInfo();

  return (
    <main className="app-contato-page-page">
      <TopCf />
      <SiteHeader active="contact" />
      <header className="app-contato-page-heading">
        <div>
          <p>social</p>
          <h1>
            contato<span>.</span>
          </h1>
        </div>
      </header>
      <ContactContent teamInfo={teamInfo} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
