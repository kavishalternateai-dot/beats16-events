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

/**
 * Logs every lead. Sends email only when Resend is fully configured.
 * Returns emailed: false when email is not configured (the log is the record).
 * Throws when Resend is configured and the request fails.
 */
export async function recordLead(lead: LeadRecord): Promise<{ emailed: boolean }> {
  console.info(`[beats16 lead] ${JSON.stringify(lead)}`);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.INQUIRY_TO_EMAIL?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return { emailed: false };
  }

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

  return { emailed: true };
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
