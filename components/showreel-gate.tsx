"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { ShowreelBandId } from "@/content/forms";
import { bandInterestLabel } from "@/content/forms";
import { site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { PosterTile } from "@/components/poster-tile";
import { Field, describedBy } from "@/components/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { GoldThread } from "@/components/ornament/gold-thread";
import { BandhaniPattern } from "@/components/ornament/bandhani";
import { trackEvent } from "@/lib/analytics";
import { inquiryClientErrors } from "@/lib/validate";
import type { ResolvedMedia } from "@/lib/resolve-media";
import { cn } from "@/lib/utils";

const YEARS = ["2026", "2027", "2028", "2029", "2030"] as const;
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

const shortName: Record<ShowreelBandId, string> = {
  gauri: "Gauri",
  rdx: "RDX",
  "daastan-e-ghazal": "Daastan-e-Ghazal",
  navratri: "Navratri",
  independent: "Independent band",
};

const headerTone: Record<ShowreelBandId, string> = {
  gauri: "bg-haldi text-kajal",
  rdx: "bg-rani-deep text-cream",
  "daastan-e-ghazal": "bg-neel text-cream",
  navratri: "bg-sindoor text-cream",
  independent: "bg-kajal text-cream",
};

const buttonTone: Record<ShowreelBandId, string> = {
  gauri: "bg-kajal text-cream",
  rdx: "bg-cream text-kajal",
  "daastan-e-ghazal": "bg-sona text-kajal",
  navratri: "bg-kajal text-cream",
  independent: "bg-cream text-kajal",
};

type GateConfig = {
  bandId: ShowreelBandId;
  body: string;
  poster: ResolvedMedia;
  url: string;
  external: boolean;
  filename: string;
};

type GateContext = GateConfig & {
  open: (placement: "hero" | "card", trigger: HTMLElement | null) => void;
};

const Ctx = createContext<GateContext | null>(null);

function useGate() {
  const value = useContext(Ctx);
  if (!value) throw new Error("Showreel controls must sit inside ShowreelProvider");
  return value;
}

export function ShowreelProvider({
  children,
  ...config
}: GateConfig & { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const value: GateContext = {
    ...config,
    open: (placement, trigger) => {
      triggerRef.current = trigger;
      trackEvent("showreel_open", { band: config.bandId, placement });
      setOpen(true);
    },
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {open ? (
        <ShowreelDialog
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />
      ) : null}
    </Ctx.Provider>
  );
}

export function ShowreelHeroButton() {
  const gate = useGate();
  const name = shortName[gate.bandId];
  return (
    <button
      type="button"
      className="mt-4 hidden min-h-11 items-center gap-2 text-base font-medium underline-offset-4 hover:underline md:inline-flex"
      onClick={(event) => gate.open("hero", event.currentTarget)}
    >
      <span aria-hidden="true">▶</span>
      Watch the {name} showreel
    </button>
  );
}

export function ShowreelCard() {
  const gate = useGate();
  const name = shortName[gate.bandId];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || sent) return;
        sent = true;
        trackEvent("showreel_cta_view", { band: gate.bandId });
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [gate.bandId]);

  return (
    <section id="showreel" ref={ref} className="site-wrap py-8" aria-labelledby="showreel-card-title">
      <div className={cn("grid overflow-hidden rounded-3xl md:grid-cols-2", headerTone[gate.bandId])}>
        <PosterTile item={gate.poster} className="min-h-64" />
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          {gate.bandId === "daastan-e-ghazal" ? <GoldThread /> : null}
          {gate.bandId === "navratri" ? <BandhaniPattern className="text-cream opacity-40" /> : null}
          <h3 id="showreel-card-title" className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight">
            See {name} before you decide
          </h3>
          <p className="max-w-md text-base leading-relaxed md:text-lg">{gate.body}</p>
          <button
            type="button"
            className={cn("inline-flex min-h-11 w-fit items-center rounded-full px-5 text-base font-medium", buttonTone[gate.bandId])}
            onClick={(event) => gate.open("card", event.currentTarget)}
          >
            Watch the {name} showreel
          </button>
        </div>
      </div>
    </section>
  );
}

function ShowreelDialog({ onClose }: { onClose: () => void }) {
  const gate = useGate();
  const name = shortName[gate.bandId];
  const label = bandInterestLabel[gate.bandId as keyof typeof bandInterestLabel] ?? name;
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [reduce, setReduce] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [blocked, setBlocked] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.showreelOpen = "true";
    window.dispatchEvent(new Event("beats16-showreel"));
    nameRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.showreelOpen;
      window.dispatchEvent(new Event("beats16-showreel"));
    };
  }, []);

  function close() {
    onClose();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const items = [...dialogRef.current.querySelectorAll<HTMLElement>("a,button,input,select,textarea")].filter(
      (item) => !item.hasAttribute("disabled") && item.tabIndex !== -1,
    );
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const local = inquiryClientErrors({ name: nameValue, phone, email: "skip@beats16.invalid", eventType: "Wedding", city: "Mumbai" });
    const next: Record<string, string> = {};
    if (local.name) next.name = local.name;
    if (local.phone) next.phone = local.phone;
    if ((month && !year) || (!month && year)) next.eventDate = "Choose a month and year, or leave this blank.";
    setErrors(next);
    if (Object.keys(next).length) {
      const field = next.name ? "showreel-name" : next.phone ? "showreel-phone" : "showreel-month";
      document.getElementById(field)?.focus();
      return;
    }
    setPending(true);
    setFormError("");
    const params = new URLSearchParams(window.location.search);
    const eventDate = month && year ? `${year}-${month}` : "";
    trackEvent("showreel_submit", { band: gate.bandId });
    try {
      const response = await fetch("/api/showreel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          phone,
          band: gate.bandId,
          eventDate,
          source: "showreel",
          page: window.location.pathname,
          utmSource: params.get("utm_source") ?? "",
          utmMedium: params.get("utm_medium") ?? "",
          utmCampaign: params.get("utm_campaign") ?? "",
          companyWebsite,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; downloadUrl?: string; external?: boolean; errors?: Record<string, string> };
      if (!response.ok || !data.ok || !data.downloadUrl) {
        trackEvent("showreel_lead_error", { band: gate.bandId, status: String(response.status) });
        setFormError(data.errors?.form || `We couldn't send this online. Please email ${site.email} or call ${site.phoneDisplay}. Your details are still in the form.`);
        errorRef.current?.focus();
        return;
      }
      trackEvent("showreel_lead_success", { band: gate.bandId });
      trackEvent("showreel_download", { band: gate.bandId });
      const video = /\.(mp4|webm)(\?|$)/i.test(data.downloadUrl);
      if (video) setVideoUrl(data.downloadUrl);
      else if (data.external) {
        const opened = window.open(data.downloadUrl, "_blank", "noopener");
        if (!opened) setBlocked(true);
        setExternalUrl(data.downloadUrl);
      } else setExternalUrl(data.downloadUrl);
    } catch {
      trackEvent("showreel_lead_error", { band: gate.bandId, status: "0" });
      setFormError(`The form did not send. Please try again, or email ${site.email} or call ${site.phoneDisplay}.`);
      errorRef.current?.focus();
    } finally {
      setPending(false);
    }
  }

  const enquire = `/contact?${new URLSearchParams({ band: label, source: `${gate.bandId}-showreel` }).toString()}#inquiry-form`;
  const done = Boolean(videoUrl || externalUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center" onKeyDown={onKeyDown}>
      <button type="button" className="absolute inset-0 bg-kajal/60" aria-label="Close showreel form" onClick={close} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-[1] flex max-h-[90dvh] w-full flex-col overflow-hidden bg-cream text-kajal md:max-w-[480px] md:rounded-3xl",
          reduce ? "" : "md:scale-100",
        )}
      >
        <div className={cn("relative px-5 pt-3 pb-4", headerTone[gate.bandId])}>
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-current opacity-40 md:hidden" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} className="font-display text-[clamp(2rem,6vw,2.5rem)] leading-none tracking-tight">
              Get the {name} showreel
            </h2>
            <button type="button" className="grid size-11 shrink-0 place-items-center rounded-full text-2xl leading-none" onClick={close} aria-label="Close">
              ×
            </button>
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate aria-busy={pending} className="grid gap-4 overflow-y-auto px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {formError ? (
            <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm outline-none">
              <p>{formError}</p>
              <p className="mt-2">
                Email <EmailLink location="showreel_fallback" className="underline underline-offset-2" /> or call{" "}
                <PhoneLink location="showreel_fallback" className="underline underline-offset-2" />.
              </p>
            </div>
          ) : null}
          {done ? (
            <div className="grid gap-4">
              {videoUrl ? (
                <video
                  controls
                  playsInline
                  autoPlay={!reduce}
                  muted={!reduce}
                  className="w-full rounded-2xl bg-kajal"
                  onPlay={() => trackEvent("showreel_play", { band: gate.bandId })}
                >
                  <source src={videoUrl} />
                </video>
              ) : null}
              {externalUrl ? (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={/\.(mp4|webm)(\?|$)/i.test(externalUrl) ? gate.filename : undefined}
                  className={cn("inline-flex min-h-11 items-center justify-center rounded-full px-5 font-medium", buttonTone[gate.bandId])}
                  onClick={() => trackEvent("showreel_download_click", { band: gate.bandId })}
                >
                  {blocked ? "Open the showreel" : "Download"}
                </a>
              ) : null}
              <Link
                href={enquire}
                className="font-medium underline underline-offset-4"
                onClick={() => trackEvent("showreel_enquire_click", { band: gate.bandId })}
              >
                Want {name} for your date? Enquire now
              </Link>
            </div>
          ) : (
            <>
              <Field id="showreel-name" label="Your name *" error={errors.name}>
                <Input
                  ref={nameRef}
                  id="showreel-name"
                  name="name"
                  autoComplete="name"
                  value={nameValue}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={describedBy("showreel-name", false, errors.name)}
                  onChange={(event) => setNameValue(event.target.value)}
                  onBlur={() => {
                    const found = inquiryClientErrors({ name: nameValue, phone: "9820133078", email: "skip@beats16.invalid", eventType: "Wedding", city: "Mumbai" });
                    if (found.name) setErrors((current) => ({ ...current, name: found.name }));
                  }}
                />
              </Field>
              <Field id="showreel-phone" label="Phone *" hint="Tushar ji may call you on this number." error={errors.phone}>
                <Input
                  id="showreel-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={describedBy("showreel-phone", true, errors.phone)}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Field>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium">When is your celebration? (optional)</legend>
                <div className="grid grid-cols-2 gap-3">
                  <NativeSelect id="showreel-month" value={month} aria-label="Month" onChange={(event) => setMonth(event.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map(([value, monthName]) => (
                      <option key={value} value={value}>
                        {monthName}
                      </option>
                    ))}
                  </NativeSelect>
                  <NativeSelect id="showreel-year" value={year} aria-label="Year" onChange={(event) => setYear(event.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
                {errors.eventDate ? <p className="text-sm text-destructive">{errors.eventDate}</p> : null}
              </fieldset>
              <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="showreel-company">Company website</label>
                <input id="showreel-company" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} />
              </div>
              <button type="submit" disabled={pending} className={cn("inline-flex min-h-11 items-center justify-center rounded-full px-5 font-medium", buttonTone[gate.bandId])}>
                {pending ? "Opening showreel…" : `Watch the ${name} showreel`}
              </button>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We&apos;ll only use your details to share this showreel and reply about your celebration. Tushar ji may call you; no marketing messages.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
