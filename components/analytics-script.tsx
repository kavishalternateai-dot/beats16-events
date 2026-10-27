import Script from "next/script";

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function AnalyticsScript() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
  if (!GA_ID_PATTERN.test(gaId)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
      </Script>
    </>
  );
}
