import { HistoryContent } from "@/components/HistoryContent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";
import { getTeamHistory } from "@/data/teamHistory";

export const revalidate = 60;

export default async function HistoryPage() {
  const history = await getTeamHistory();

  return (
    <main className="app-clube-historia-page-page">
      <TopCf />
      <SiteHeader active="club" activeClub="history" />
      <header className="app-clube-historia-page-heading">
        <div>
          <p>clube</p>
          <h1>
            nossa historia<span>.</span>
          </h1>
        </div>
      </header>
      <HistoryContent history={history} />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
