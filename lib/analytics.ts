"use client";

export type AnalyticsEvent = "form_submit" | "call_click" | "email_click" | "showreel_download";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
