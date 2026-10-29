"use client";

import { useState } from "react";
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
import { EmailLink } from "@/components/contact-links";
import { ErrorSummary, Field, describedBy } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

type Errors = Record<string, string>;

const blank = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
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

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { ok?: boolean; errors?: Errors };
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? { form: "The form did not send. Please try again, or email us." });
        setFailed(response.status >= 500);
        return;
      }
      trackEvent("form_submit", { form: "inquiry" });
      router.push("/thank-you");
    } catch {
      setFailed(true);
      setErrors({ form: "The form did not send. Please try again, or email us." });
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
      `Event date: ${values.eventDate}`,
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
      className="grid scroll-mt-28 gap-5"
    >
      <div>
        <h2 id="inquiry-heading" className="font-heading text-3xl tracking-tight md:text-4xl">
          {contactFormCopy.heading}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed">{contactFormCopy.intro}</p>
      </div>

      <ErrorSummary errors={errors} />

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

      <Field id="eventDate" label="Event date" hint={contactFormCopy.dateHint} error={errors.eventDate}>
        <Input
          id="eventDate"
          name="eventDate"
          type="date"
          value={values.eventDate}
          aria-invalid={errors.eventDate ? true : undefined}
          aria-describedby={describedBy("eventDate", true, errors.eventDate)}
          onChange={(event) => set("eventDate", event.target.value)}
        />
      </Field>

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

      {failed ? (
        <p className="text-sm leading-relaxed">
          If the form keeps failing, email{" "}
          <EmailLink href={mailto} location="inquiry_fallback" className="underline underline-offset-2">
            {site.email}
          </EmailLink>{" "}
          and the note above will be waiting in your mail app. You can also call {site.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}
