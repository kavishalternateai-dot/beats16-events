import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsScript } from "@/components/analytics-script";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { MotionRoot } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, SiteHeaderFallback } from "@/components/site-header";
import { homeSeo } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background pb-20 text-foreground md:pb-0">
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
          <SiteFooter />
          <MobileCtaBar />
          <AnalyticsScript />
        </MotionRoot>
      </body>
    </html>
  );
}
