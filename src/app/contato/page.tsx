import { ContactContent } from "@/components/ContactContent";
import { MainMenu } from "@/components/MainMenu";
import { SiteFooter } from "@/components/SiteFooter";
import { SponsorsStrip } from "@/components/SponsorsStrip";
import { TopCf } from "@/components/TopCf";

export default function ContactPage() {
  return (
    <main className="app-contato-page-page">
      <TopCf />
      <MainMenu active="contact" />
      <header className="app-contato-page-heading">
        <div>
          <p>social</p>
          <h1>
            contato<span>.</span>
          </h1>
        </div>
      </header>
      <ContactContent />
      <SponsorsStrip />
      <SiteFooter />
    </main>
  );
}
