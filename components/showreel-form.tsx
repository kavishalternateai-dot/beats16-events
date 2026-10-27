"use client";

import { useState } from "react";
import Link from "next/link";
import { showreelBands, type ShowreelBandId } from "@/content/forms";
import { site } from "@/content/site";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { ErrorSummary, Field, describedBy } from "@/components/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { trackEvent } from "@/lib/analytics";

type Errors = Record<string, string>;

type Delivery = {
  downloadUrl: string;
  placeholder: boolean;
  external: boolean;
  filename: string;
};

function deliverDownload(delivery: Delivery) {
  const anchor = document.createElement("a");
  anchor.href = delivery.downloadUrl;
  if (delivery.external) {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  } else {
    anchor.download = delivery.filename;
  }
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function ShowreelForm({
  defaultBand,
  heading = "Download showreel",
  intro = "Name, email, phone, and the band. The file starts downloading after you send this. Until a real showreel is linked, the file is a labeled placeholder.",
  note,
}: {
  defaultBand: ShowreelBandId;
  heading?: string;
  intro?: string;
  note?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [band, setBand] = useState<ShowreelBandId>(defaultBand);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailed(false);
    setPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/showreel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, band, companyWebsite }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        errors?: Errors;
        downloadUrl?: string;
        placeholder?: boolean;
        external?: boolean;
        filename?: string;
      };
      if (!response.ok || !data.ok || !data.downloadUrl || !data.filename) {
        setErrors(data.errors ?? { form: "The download did not start. Please try again, or email us." });
        setFailed(response.status >= 500);
        return;
      }
      const nextDelivery: Delivery = {
        downloadUrl: data.downloadUrl,
        placeholder: Boolean(data.placeholder),
        external: Boolean(data.external),
        filename: data.filename,
      };
      trackEvent("showreel_download", { band });
      deliverDownload(nextDelivery);
      setDelivery(nextDelivery);
    } catch {
      setFailed(true);
      setErrors({ form: "The download did not start. Please try again, or email us." });
    } finally {
      setPending(false);
    }
  }

  if (delivery) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 md:p-6" role="status">
        <h3 className="font-heading text-2xl">Your download should have started.</h3>
        <p className="mt-3 leading-relaxed">
          If it did not, use the link below. We have your name, email, and phone with this request.
        </p>
        {delivery.placeholder ? (
          <p className="mt-3 leading-relaxed">
            This file is a placeholder showreel. The real film will replace it later. You can still
            keep this copy.
          </p>
        ) : null}
        <p className="mt-4">
          <a
            href={delivery.downloadUrl}
            className="font-medium underline underline-offset-2"
            {...(delivery.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : { download: delivery.filename })}
          >
            Download again
          </a>
        </p>
        <div className="mt-6 border-t border-border pt-5">
          <h4 className="font-medium">If you already have a date</h4>
          <p className="mt-2 leading-relaxed">
            Call <PhoneLink location="showreel_success" className="underline underline-offset-2" /> or
            email <EmailLink location="showreel_success" className="underline underline-offset-2" />, or
            send the <Link href="/contact" className="underline underline-offset-2">inquiry form</Link>.
            We reply personally.
          </p>
          <p className="mt-3 leading-relaxed">{site.pricing}</p>
        </div>
      </div>
    );
  }

  return (
    <form id="showreel" onSubmit={onSubmit} noValidate className="grid scroll-mt-28 gap-4 rounded-lg border border-border bg-card p-5 md:p-6">
      <div>
        <h2 className="font-heading text-3xl tracking-tight">{heading}</h2>
        <p className="mt-3 leading-relaxed">{intro}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Until a real showreel is linked, the file is a labeled placeholder.
        </p>
      </div>
      <ErrorSummary errors={errors} />
      <Field id="name" label="Name" error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name", false, errors.name)}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email", false, errors.email)}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field id="phone" label="Phone" error={errors.phone}>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy("phone", false, errors.phone)}
          onChange={(event) => setPhone(event.target.value)}
        />
      </Field>
      <Field id="band" label="Which band" error={errors.band}>
        <NativeSelect
          id="band"
          name="band"
          required
          value={band}
          aria-invalid={errors.band ? true : undefined}
          aria-describedby={describedBy("band", false, errors.band)}
          onChange={(event) => setBand(event.target.value as ShowreelBandId)}
        >
          {showreelBands.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="showreel-company">Company website</label>
        <input
          id="showreel-company"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyWebsite}
          onChange={(event) => setCompanyWebsite(event.target.value)}
        />
      </div>
      <Button type="submit" size="cta" disabled={pending}>
        {pending ? "Preparing download…" : "Download showreel"}
      </Button>
      {note ? <p className="text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
      {failed ? (
        <p className="text-sm leading-relaxed">
          If this keeps failing, email <EmailLink location="showreel_fallback" className="underline underline-offset-2" /> or
          call <PhoneLink location="showreel_fallback" className="underline underline-offset-2" />.
        </p>
      ) : null}
    </form>
  );
}
