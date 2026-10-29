import {
  bandInterests,
  eventTypes,
  functionOptions,
  hearAboutOptions,
  showreelBands,
  type ShowreelBandId,
} from "@/content/forms";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DAY = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_MONTH = /^(\d{4})-(\d{2})$/;
const DMY = /^(\d{2})\/(\d{2})\/(\d{4})$/;
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

function realDay(year: number, month: number, day: number) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

/** Accepts a blank date, YYYY-MM, YYYY-MM-DD, or dd/mm/yyyy. Stores ISO. */
export function normaliseEventDate(value: string): string | null {
  if (!value) return "";
  const dmy = DMY.exec(value);
  const iso = dmy ? `${dmy[3]}-${dmy[2]}-${dmy[1]}` : value;
  const month = ISO_MONTH.exec(iso);
  if (month && !ISO_DAY.test(iso)) {
    const year = Number(month[1]);
    const mon = Number(month[2]);
    if (year < 2000 || year > 2100 || mon < 1 || mon > 12) return null;
    return `${month[1]}-${month[2]}`;
  }
  const day = ISO_DAY.exec(iso);
  if (!day) return null;
  const year = Number(day[1]);
  const mon = Number(day[2]);
  const date = Number(day[3]);
  if (!realDay(year, mon, date)) return null;
  return `${day[1]}-${day[2]}-${day[3]}`;
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
  const eventDate = normaliseEventDate(data.eventDate);
  if (eventDate == null) {
    errors.eventDate = "Enter a date as dd/mm/yyyy, or leave this blank.";
  } else {
    data.eventDate = eventDate;
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
