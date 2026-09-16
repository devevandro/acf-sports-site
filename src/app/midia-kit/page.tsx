import type { Metadata } from "next";
import { MediaKitContent } from "@/components/MediaKitContent";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Página oculta: não faz parte do menu principal e não deve ser indexada por buscadores.
export const metadata: Metadata = {
  title: "Mídia Kit | ACF Sports",
  description: "Dados de audiência do site oficial do ACF Sports para conversas com patrocinadores.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const revalidate = 60;

export default async function MediaKitPage() {
  return (
    <main className="app-midia-kit-page-page">
      <SiteHeader />
      <header className="app-midia-kit-page-heading">
        <div>
          <p>patrocínio</p>
          <h1>
            mídia kit<span>.</span>
          </h1>
        </div>
      </header>
      <MediaKitContent />
      <SiteFooter />
    </main>
  );
}
