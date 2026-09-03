import { SiteHeader } from "@/components/SiteHeader";
import { SponsorsPageContent } from "@/components/SponsorsPageContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export const revalidate = 60;

export default async function SponsorsPage() {
  return (
    <main className="app-clube-patrocinadores-page-page">
      <TopCf />
      <SiteHeader active="sponsors" />
      <header className="app-clube-patrocinadores-page-heading">
        <div>
          <p>faça parte do ACF</p>
          <h1>
            seja um parceiro<span>.</span>
          </h1>
        </div>
      </header>
      <SponsorsPageContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
