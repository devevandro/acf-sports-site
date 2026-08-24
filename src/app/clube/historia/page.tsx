import { HistoryContent } from "@/components/HistoryContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function HistoryPage() {
  return (
    <main className="app-clube-historia-page-page">
      <TopCf />
      <MainMenu active="club" activeClub="history" />
      <header className="app-clube-historia-page-heading">
        <div>
          <p>clube</p>
          <h1>
            nossa historia<span>.</span>
          </h1>
        </div>
      </header>
      <HistoryContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
