"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  bandInterests,
  eventTypes,
  functionOptions,
  hearAboutOptions,
  legacyBandInterests,
  legacyEventTypes,
  legacyHearAbout,
  matchOption,
} from "@/content/forms";
import { contactFormCopy } from "@/content/contact";
import { site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { ErrorSummary, Field, describedBy } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { inquiryClientErrors } from "@/lib/validate";

type Errors = Record<string, string>;

const blank = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventDay: "",
  eventMonth: "",
  eventYear: "",
  city: "",
  functions: [] as string[],
  interest: "",
  guestCount: "",
  organisation: "",
  message: "",
  heardAbout: "",
  source: "contact-page",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  companyWebsite: "",
};

const EVENT_YEARS = ["2026", "2027", "2028", "2029", "2030"] as const;

const MONTHS = [
  ["01", "January"],
  ["02", "February"],
  ["03", "March"],
  ["04", "April"],
  ["05", "May"],
  ["06", "June"],
  ["07", "July"],
  ["08", "August"],
  ["09", "September"],
  ["10", "October"],
  ["11", "November"],
  ["12", "December"],
] as const;

function composeDate(day: string, month: string, year: string) {
  if (!day && !month && !year) return "";
  if (year && month && day) return `${year}-${month}-${day}`;
  if (year && month) return `${year}-${month}`;
  return "";
}

function InquiryFallback({ mailto }: { mailto: string }) {
  return (
    <p className="text-sm leading-relaxed">
      If the form keeps failing, email{" "}
      <EmailLink href={mailto} location="inquiry_fallback" className="underline underline-offset-2">
        {site.email}
      </EmailLink>{" "}
      (opens your mail app with these details filled in) or call{" "}
      <PhoneLink location="inquiry_fallback" className="underline underline-offset-2 whitespace-nowrap">
        {site.phoneDisplay}
      </PhoneLink>
      .
    </p>
  );
}

function clip(value: string | null, max = 160) {
  return (value ?? "").replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max);
}

export function InquiryForm({
  initial,
}: {
  initial?: {
    event?: string | null;
    band?: string | null;
    heard?: string | null;
    source?: string | null;
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
  };
} = {}) {
  const router = useRouter();
  const [values, setValues] = useState({
    ...blank,
    eventType: matchOption(initial?.event ?? null, eventTypes, legacyEventTypes),
    interest: matchOption(initial?.band ?? null, bandInterests, legacyBandInterests),
    heardAbout: matchOption(initial?.heard ?? null, hearAboutOptions, legacyHearAbout),
    source: clip(initial?.source ?? null) || "contact-page",
    utmSource: clip(initial?.utmSource ?? null),
    utmMedium: clip(initial?.utmMedium ?? null),
    utmCampaign: clip(initial?.utmCampaign ?? null),
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduce, setReduce] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!Object.values(errors).some(Boolean)) return;
    summaryRef.current?.focus();
    summaryRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [errors, reduce]);

  function set<K extends keyof typeof blank>(key: K, value: (typeof blank)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleFunction(name: string) {
    setValues((current) => ({
      ...current,
      functions: current.functions.includes(name)
        ? current.functions.filter((item) => item !== name)
        : [...current.functions, name],
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailed(false);
    setPending(true);
    setErrors({});

    const eventDate = composeDate(values.eventDay, values.eventMonth, values.eventYear);
    const local = inquiryClientErrors(values);
    if ((values.eventDay || values.eventMonth || values.eventYear) && !eventDate) {
      local.eventDate = "Enter the date as dd/mm/yyyy, or choose a month and year. Or leave it blank.";
    }
    if (Object.keys(local).length > 0) {
      setErrors(local);
      setPending(false);
      return;
    }

    const offline = `The form did not send. Please try again, or email ${site.email} or call ${site.phoneDisplay}.`;
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, eventDate }),
      });
      const data = (await response.json()) as { ok?: boolean; errors?: Errors };
      if (!response.ok || !data.ok) {
        const next = data.errors ?? { form: offline };
        setErrors(next);
        setFailed(Boolean(next.form) || response.status !== 400);
        return;
      }
      trackEvent("form_submit", { form: "inquiry" });
      router.push("/thank-you");
    } catch {
      setFailed(true);
      setErrors({ form: offline });
    } finally {
      setPending(false);
    }
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Inquiry for Beats16")}&body=${encodeURIComponent(
    [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Event type: ${values.eventType}`,
      `Event date: ${composeDate(values.eventDay, values.eventMonth, values.eventYear)}`,
      `City or venue: ${values.city}`,
      `Functions: ${values.functions.join(", ")}`,
      `Band interest: ${values.interest}`,
      `Guests: ${values.guestCount}`,
      `Organisation: ${values.organisation}`,
      `Heard about us: ${values.heardAbout}`,
      "",
      values.message,
    ].join("\n"),
  )}`;

  return (
    <form
      id="inquiry-form"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="inquiry-heading"
      aria-busy={pending}
      className="grid scroll-mt-28 gap-5"
    >
      <div>
        <h2 id="inquiry-heading" className="font-heading text-3xl tracking-tight md:text-4xl">
          {contactFormCopy.heading}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed">{contactFormCopy.intro}</p>
      </div>

      <ErrorSummary ref={summaryRef} errors={errors}>
        {failed ? <InquiryFallback mailto={mailto} /> : null}
      </ErrorSummary>

      <Field id="name" label="Your name *" error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name", false, errors.name)}
          onChange={(event) => set("name", event.target.value)}
        />
      </Field>

      <Field id="phone" label="Phone number *" hint={contactFormCopy.phoneHint} error={errors.phone}>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={values.phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy("phone", true, errors.phone)}
          onChange={(event) => set("phone", event.target.value)}
        />
      </Field>

      <Field id="email" label="Email *" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email", false, errors.email)}
          onChange={(event) => set("email", event.target.value)}
        />
      </Field>

      <Field id="eventType" label="Event type *" error={errors.eventType}>
        <NativeSelect
          id="eventType"
          name="eventType"
          required
          value={values.eventType}
          aria-invalid={errors.eventType ? true : undefined}
          aria-describedby={describedBy("eventType", false, errors.eventType)}
          onChange={(event) => set("eventType", event.target.value)}
        >
          <option value="">Choose one</option>
          {eventTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <fieldset className="grid gap-2" aria-describedby={describedBy("eventDate", true, errors.eventDate)}>
        <legend className="text-sm font-medium">Event date</legend>
        <p id="eventDate-hint" className="text-sm leading-relaxed text-muted-foreground">
          {contactFormCopy.dateHint}
        </p>
        <div className="grid grid-cols-3 gap-2">
          <NativeSelect
            id="eventDate"
            name="eventDay"
            aria-label="Day"
            value={values.eventDay}
            onChange={(event) => set("eventDay", event.target.value)}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0")).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect
            name="eventMonth"
            aria-label="Month"
            value={values.eventMonth}
            onChange={(event) => set("eventMonth", event.target.value)}
          >
            <option value="">Month</option>
            {MONTHS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </NativeSelect>
          <NativeSelect
            name="eventYear"
            aria-label="Year"
            value={values.eventYear}
            onChange={(event) => set("eventYear", event.target.value)}
          >
            <option value="">Year</option>
            {EVENT_YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </NativeSelect>
        </div>
        {errors.eventDate ? (
          <p id="eventDate-error" className="text-sm text-destructive">
            {errors.eventDate}
          </p>
        ) : null}
      </fieldset>

      <Field id="city" label="City / venue *" error={errors.city}>
        <Input
          id="city"
          name="city"
          required
          placeholder={contactFormCopy.cityPlaceholder}
          value={values.city}
          aria-invalid={errors.city ? true : undefined}
          aria-describedby={describedBy("city", false, errors.city)}
          onChange={(event) => set("city", event.target.value)}
        />
      </Field>

      <fieldset className="grid gap-2" aria-describedby={errors.functions ? "functions-error" : undefined}>
        <legend className="text-sm font-medium">Functions</legend>
        <ul className="mt-1 grid gap-1 sm:grid-cols-2">
          {functionOptions.map((option) => (
            <li key={option}>
              <label className="flex min-h-11 items-center gap-3 text-sm leading-snug">
                <input
                  type="checkbox"
                  name="functions"
                  value={option}
                  checked={values.functions.includes(option)}
                  className="size-4 accent-primary"
                  onChange={() => toggleFunction(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        {errors.functions ? (
          <p id="functions-error" className="text-sm text-destructive">
            {errors.functions}
          </p>
        ) : null}
      </fieldset>

      <Field id="interest" label="Band interest" hint="Optional." error={errors.interest}>
        <NativeSelect
          id="interest"
          name="interest"
          value={values.interest}
          aria-invalid={errors.interest ? true : undefined}
          aria-describedby={describedBy("interest", true, errors.interest)}
          onChange={(event) => set("interest", event.target.value)}
        >
          <option value="">Choose one, if you know</option>
          {bandInterests.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <Field id="guestCount" label="Approximate number of guests" hint="Optional." error={errors.guestCount}>
        <Input
          id="guestCount"
          name="guestCount"
          type="number"
          inputMode="numeric"
          min={1}
          value={values.guestCount}
          aria-invalid={errors.guestCount ? true : undefined}
          aria-describedby={describedBy("guestCount", true, errors.guestCount)}
          onChange={(event) => set("guestCount", event.target.value)}
        />
      </Field>

      <Field
        id="organisation"
        label="Organisation / company"
        hint="Optional. For planners, venues, event companies, community groups and corporates."
        error={errors.organisation}
      >
        <Input
          id="organisation"
          name="organisation"
          autoComplete="organization"
          value={values.organisation}
          aria-invalid={errors.organisation ? true : undefined}
          aria-describedby={describedBy("organisation", true, errors.organisation)}
          onChange={(event) => set("organisation", event.target.value)}
        />
      </Field>

      <Field id="message" label="Anything else we should know?" hint="Optional." error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true, errors.message)}
          onChange={(event) => set("message", event.target.value)}
        />
      </Field>

      <Field id="heardAbout" label="How did you hear about us?" hint="Optional." error={errors.heardAbout}>
        <NativeSelect
          id="heardAbout"
          name="heardAbout"
          value={values.heardAbout}
          aria-invalid={errors.heardAbout ? true : undefined}
          aria-describedby={describedBy("heardAbout", true, errors.heardAbout)}
          onChange={(event) => set("heardAbout", event.target.value)}
        >
          <option value="">Choose one</option>
          {hearAboutOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={(event) => set("companyWebsite", event.target.value)}
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <Button type="submit" size="cta" disabled={pending}>
          {pending ? "Sending…" : contactFormCopy.submit}
        </Button>
        <p className="text-sm text-muted-foreground">{contactFormCopy.privacy}</p>
      </div>

      {failed ? <InquiryFallback mailto={mailto} /> : null}
    </form>
  );
}
