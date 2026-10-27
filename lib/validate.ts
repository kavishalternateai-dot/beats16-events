import {
  bandInterests,
  eventTypes,
  functionOptions,
  hearAboutOptions,
  showreelBands,
  type ShowreelBandId,
} from "@/content/forms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SHOWREEL_IDS = new Set<string>(showreelBands.map((band) => band.id));

export type FieldErrors = Record<string, string>;

export type InquiryInput = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  city: string;
  functions: string[];
  interest: string;
  guestCount: string;
  organisation: string;
  message: string;
  heardAbout: string;
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  companyWebsite: string;
};

export type ShowreelInput = {
  name: string;
  phone: string;
  email: string;
  band: ShowreelBandId;
  companyWebsite: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function hidden(value: unknown, max = 160): string {
  return text(value)
    .replace(/[\u0000-\u001f]+/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, max);
}

function checkName(value: string, errors: FieldErrors) {
  if (value.length < 2) errors.name = "Please enter your name.";
  else if (value.length > 80) errors.name = "Name must be 80 characters or fewer.";
}

function checkPhone(value: string, errors: FieldErrors) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15 || value.length > 24) {
    errors.phone = "Please enter a phone number we can call.";
  }
}

function checkEmail(value: string, errors: FieldErrors) {
  if (value.length > 120 || !EMAIL_PATTERN.test(value)) {
    errors.email = "Please enter an email address.";
  }
}

function oneOf(value: string, allowed: readonly string[], field: string, errors: FieldErrors, label: string) {
  if (!allowed.includes(value)) errors[field] = label;
}

function functionList(value: unknown): string[] {
  const raw = Array.isArray(value)
    ? value.map((item) => text(item))
    : text(value)
      ? text(value).split(",")
      : [];
  return [...new Set(raw.map((item) => item.trim()).filter(Boolean))];
}

export function validateInquiry(
  payload: unknown,
): { ok: true; data: InquiryInput } | { ok: false; errors: FieldErrors } {
  const body = asRecord(payload);
  if (!body) return { ok: false, errors: { form: "Please send the form again." } };

  const data: InquiryInput = {
    name: text(body.name),
    phone: text(body.phone),
    email: text(body.email),
    eventType: text(body.eventType),
    eventDate: text(body.eventDate),
    city: text(body.city),
    functions: functionList(body.functions),
    interest: text(body.interest),
    guestCount: text(body.guestCount),
    organisation: text(body.organisation),
    message: text(body.message),
    heardAbout: text(body.heardAbout),
    source: hidden(body.source) || "contact-page",
    utmSource: hidden(body.utmSource),
    utmMedium: hidden(body.utmMedium),
    utmCampaign: hidden(body.utmCampaign),
    companyWebsite: text(body.companyWebsite),
  };

  const errors: FieldErrors = {};
  checkName(data.name, errors);
  checkPhone(data.phone, errors);
  checkEmail(data.email, errors);
  oneOf(data.eventType, eventTypes, "eventType", errors, "Choose an event type.");
  if (data.eventDate && (!DATE_PATTERN.test(data.eventDate) || Number.isNaN(Date.parse(`${data.eventDate}T00:00:00Z`)))) {
    errors.eventDate = "Enter a date, or leave this blank.";
  }
  if (data.city.length < 2 || data.city.length > 160) {
    errors.city = "Tell us the city or venue.";
  }
  if (data.functions.some((item) => !functionOptions.includes(item as (typeof functionOptions)[number]))) {
    errors.functions = "Choose functions from the list, or leave them blank.";
  }
  if (data.interest) {
    oneOf(data.interest, bandInterests, "interest", errors, "Choose a band, or leave this blank.");
  }
  if (data.guestCount && (!/^\d{1,6}$/.test(data.guestCount) || Number(data.guestCount) < 1)) {
    errors.guestCount = "Enter a number of guests, or leave this blank.";
  }
  if (data.organisation.length > 160) {
    errors.organisation = "Organisation must be 160 characters or fewer.";
  }
  if (data.message.length > 4000) errors.message = "Message must be 4,000 characters or fewer.";
  if (data.heardAbout) {
    oneOf(data.heardAbout, hearAboutOptions, "heardAbout", errors, "Choose how you heard about us, or leave this blank.");
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

export function validateShowreel(
  payload: unknown,
): { ok: true; data: ShowreelInput } | { ok: false; errors: FieldErrors } {
  const body = asRecord(payload);
  if (!body) return { ok: false, errors: { form: "Please send the form again." } };

  const band = text(body.band);
  const data = {
    name: text(body.name),
    phone: text(body.phone),
    email: text(body.email),
    band,
    companyWebsite: text(body.companyWebsite),
  };

  const errors: FieldErrors = {};
  checkName(data.name, errors);
  checkPhone(data.phone, errors);
  checkEmail(data.email, errors);
  if (!SHOWREEL_IDS.has(band)) errors.band = "Choose a band.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { ...data, band: band as ShowreelBandId } };
}
