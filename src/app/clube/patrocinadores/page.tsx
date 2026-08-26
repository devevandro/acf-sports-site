import { SiteHeader } from "@/components/SiteHeader";
import { SponsorsPageContent } from "@/components/SponsorsPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function SponsorsPage() {
  return (
    <main className="app-clube-patrocinadores-page-page">
      <TopCf />
      <SiteHeader active="sponsors" />
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
