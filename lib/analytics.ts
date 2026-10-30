"use client";

export type AnalyticsEvent =
  | "form_submit"
  | "call_click"
  | "email_click"
  | "sticky_enquire_click"
  | "showreel_cta_view"
  | "showreel_open"
  | "showreel_submit"
  | "showreel_lead_success"
  | "showreel_download"
  | "showreel_lead_error"
  | "showreel_play"
  | "showreel_download_click"
  | "showreel_enquire_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
