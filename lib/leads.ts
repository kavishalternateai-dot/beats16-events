import { site } from "@/content/site";
import type { InquiryInput, ShowreelInput } from "@/lib/validate";

export type LeadRecord =
  | {
      kind: "inquiry";
      at: string;
      name: string;
      phone: string;
      email: string;
      eventType: string;
      eventDate: string;
      city: string;
      functions: string;
      interest: string;
      guestCount: string;
      organisation: string;
      message: string;
      heardAbout: string;
      source: string;
      utmSource: string;
      utmMedium: string;
      utmCampaign: string;
    }
  | {
      kind: "showreel";
      at: string;
      name: string;
      phone: string;
      email: string;
      band: string;
    };

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function inquiryLead(input: InquiryInput): LeadRecord {
  return {
    kind: "inquiry",
    at: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    eventType: input.eventType,
    eventDate: input.eventDate,
    city: input.city,
    functions: input.functions.join(", "),
    interest: input.interest,
    guestCount: input.guestCount,
    organisation: input.organisation,
    message: input.message,
    heardAbout: input.heardAbout,
    source: input.source,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
  };
}

export function showreelLead(input: ShowreelInput): LeadRecord {
  return {
    kind: "showreel",
    at: new Date().toISOString(),
    name: input.name,
    phone: input.phone,
    email: input.email,
    band: input.band,
  };
}

function leadText(lead: LeadRecord): string {
  const lines = Object.entries(lead).map(([key, value]) => `${key}: ${value}`);
  return lines.join("\n");
}

const WEBHOOK_TIMEOUT_MS = 8000;

/**
 * Logs every lead. Two optional sinks run independently:
 * Resend (unchanged) when its three variables are set, and
 * LEADS_WEBHOOK_URL when that is set.
 * The request fails only when a configured sink fails and none succeeded.
 */
export async function recordLead(lead: LeadRecord): Promise<{ emailed: boolean; webhooked: boolean }> {
  console.info(`[beats16 lead] ${JSON.stringify(lead)}`);

  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim() ?? "";
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  const resendReady = Boolean(apiKey && to && from);

  const webhookAttempt = webhookUrl ? deliverWebhook(lead, webhookUrl) : Promise.resolve(false);
  const resendAttempt = resendReady ? deliverResend(lead, apiKey!, from!, to!) : Promise.resolve(false);
  const [webhookResult, resendResult] = await Promise.allSettled([webhookAttempt, resendAttempt]);

  const webhooked = webhookResult.status === "fulfilled" && webhookResult.value === true;
  const emailed = resendResult.status === "fulfilled" && resendResult.value === true;

  if (webhookResult.status === "rejected") {
    console.error("[beats16 lead] Webhook failed.", webhookResult.reason);
  }
  if (resendResult.status === "rejected") {
    console.error("[beats16 lead] Resend failed.", resendResult.reason);
  }

  const configured = Boolean(webhookUrl || resendReady);
  if (configured && !webhooked && !emailed) {
    throw new Error("Lead delivery failed");
  }

  return { emailed, webhooked };
}

async function deliverWebhook(lead: LeadRecord, url: string): Promise<true> {
  const secret = process.env.LEADS_WEBHOOK_SECRET?.trim();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (secret) headers["X-Beats16-Secret"] = secret;
  const body = JSON.stringify(lead);
  const signal = AbortSignal.timeout(WEBHOOK_TIMEOUT_MS);

  let response = await fetch(url, {
    method: "POST",
    headers,
    body,
    redirect: "manual",
    signal,
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location) {
      throw new Error(`Lead webhook redirect ${response.status} had no location`);
    }
    response = await fetch(location, {
      method: "POST",
      headers,
      body,
      redirect: "follow",
      signal,
    });
  }

  const detail = await response.text();
  if (!response.ok) {
    throw new Error(`Lead webhook failed ${response.status}: ${detail.slice(0, 300)}`);
  }

  if (detail.trim()) {
    try {
      const parsed = JSON.parse(detail) as { ok?: boolean };
      if (parsed.ok === false) {
        throw new Error("Lead webhook rejected the lead");
      }
    } catch (error) {
      if (error instanceof SyntaxError) return true;
      throw error;
    }
  }

  return true;
}

async function deliverResend(lead: LeadRecord, apiKey: string, from: string, to: string): Promise<true> {
  const subject =
    lead.kind === "inquiry"
      ? `Inquiry: ${singleLine(lead.name)} — ${singleLine(lead.city)}`
      : `Showreel: ${singleLine(lead.name)} — ${singleLine(lead.band)}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: subject.slice(0, 180),
      text: `${leadText(lead)}\n\nSent from ${site.url}`,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error(`[beats16 lead] Resend failed ${response.status}: ${detail.slice(0, 500)}`);
    throw new Error("Resend request failed");
  }

  if (lead.kind === "inquiry") {
    try {
      await sendVisitorConfirmation(apiKey, from, lead);
    } catch (error) {
      console.error("[beats16 lead] Visitor confirmation was not sent.", error);
    }
  }

  return true;
}

async function sendVisitorConfirmation(apiKey: string, from: string, lead: Extract<LeadRecord, { kind: "inquiry" }>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [lead.email],
      reply_to: site.email,
      subject: "We received your inquiry — Beats16",
      text: [
        `Hello ${singleLine(lead.name)},`,
        "",
        "Congratulations on your upcoming celebration, and thank you for thinking of Beats16.",
        "",
        "Our founder, Tushar Sonigra, personally reviews every inquiry and will get back to you by phone or email.",
        "",
        "A copy of what you sent:",
        leadText(lead),
        "",
        site.pricing,
        "",
        site.name,
        site.email,
        site.phoneDisplay,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend confirmation failed ${response.status}: ${detail.slice(0, 300)}`);
  }
}
