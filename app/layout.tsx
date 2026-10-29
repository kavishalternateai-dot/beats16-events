import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Noto_Serif_Gujarati, Rozha_One, Tiro_Devanagari_Hindi } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsScript } from "@/components/analytics-script";
import { CtaBand } from "@/components/cta-band";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { MotionRoot } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { homeSeo } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const rozha = Rozha_One({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
  preload: false,
});

const gujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  weight: "400",
  variable: "--font-noto-gujarati",
  display: "swap",
  preload: false,
});

const homeMeta = pageMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...homeMeta,
  title: {
    default: homeSeo.title,
    template: "%s",
  },
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.name,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#D7263D",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${rozha.variable} ${tiro.variable} ${gujarati.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background pb-24 text-foreground md:pb-0">
        <MotionRoot>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Suspense fallback={<SiteHeaderFallback />}>
            <SiteHeader />
          </Suspense>
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <CtaBand />
          <SiteFooter />
          <MobileCtaBar />
          <AnalyticsScript />
        </MotionRoot>
      </body>
    </html>
  );
}
