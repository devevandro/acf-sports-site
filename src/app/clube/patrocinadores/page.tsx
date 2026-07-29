import { MainMenu } from "@/components/MainMenu";
import { SponsorsPageContent } from "@/components/SponsorsPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function PatrocinadoresPage() {
  return (
    <main className="app-clube-patrocinadores-page-page">
      <TopCf />
      <MainMenu active="clube" activeClub="patrocinadores" />
      <header className="app-clube-patrocinadores-page-heading">
        <div>
          <p>nossos parceiros</p>
          <h1>
            patrocinadores<span>.</span>
          </h1>
        </div>
      </header>
      <SponsorsPageContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
