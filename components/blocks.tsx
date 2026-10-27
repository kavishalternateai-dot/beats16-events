import Link from "next/link";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { HeroItem, Reveal } from "@/components/motion";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const sectionTitleClass =
  "font-heading text-3xl leading-[1.15] tracking-[-0.028em] md:text-4xl";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16", className)}>{children}</div>;
}

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  actions?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const onDark = tone === "dark";

  return (
    <header className="max-w-3xl">
      <HeroItem>
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.2em] uppercase",
            onDark ? "text-[#e4c88a]" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      </HeroItem>
      <HeroItem draw delay={0.08} className="mt-4">
        <div className={cn("gold-rule", onDark && "gold-rule-light")} />
      </HeroItem>
      <HeroItem prominent delay={0.12}>
        <h1
          className={cn(
            "mt-4 font-heading text-4xl leading-[1.02] text-balance md:text-6xl",
            onDark && "text-[#f7f1e6]",
          )}
        >
          {title}
        </h1>
      </HeroItem>
      <HeroItem prominent delay={0.2}>
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed text-pretty md:text-xl",
            onDark ? "text-[#f7f1e6]/88" : "text-foreground/90",
          )}
        >
          {lede}
        </p>
      </HeroItem>
      {actions ? (
        <HeroItem prominent delay={0.28} className="mt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
        </HeroItem>
      ) : null}
    </header>
  );
}

export function ProofStrip({
  items = site.proof,
  label,
  labelId,
}: {
  items?: readonly { value: string; detail: string }[];
  label?: string;
  labelId?: string;
}) {
  return (
    <div>
      {label ? (
        <h2 id={labelId} className="text-sm font-semibold text-muted-foreground">
          {label}
        </h2>
      ) : null}
      <dl className="grid gap-6 border-y border-[color-mix(in_srgb,var(--gold)_45%,var(--border))] py-6 sm:grid-cols-3 md:gap-8 md:py-7">
        {items.map((item, index) => (
          <Reveal as="div" key={item.value} delay={index * 0.06}>
            <dt className="font-heading text-4xl leading-none tracking-[-0.03em] text-primary">{item.value}</dt>
            <dd className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}

export function ScopeNote() {
  return (
    <p className="max-w-2xl text-lg leading-relaxed">
      We play Indian weddings and traditional festivals only. If you are planning a different
      ceremony, we will tell you directly, and politely, that it is not something we take.
    </p>
  );
}

export function PricingLine() {
  return (
    <blockquote className="max-w-2xl border-l border-gold pl-5 text-lg leading-relaxed">
      {site.pricing}
    </blockquote>
  );
}

export function InquireActions({ showreelHref }: { showreelHref?: string }) {
  return (
    <>
      {showreelHref ? (
        <Link href={showreelHref} className={cn(buttonVariants({ size: "cta" }))}>
          Download showreel
        </Link>
      ) : null}
      <Link href="/contact" className={cn(buttonVariants({ size: "cta", variant: showreelHref ? "outline" : "default" }))}>
        Inquire
      </Link>
    </>
  );
}

export function InquiryClose({
  title,
  text,
  cta = "Fill the inquiry form",
  href = "/contact#inquiry-form",
}: {
  title: string;
  text: string;
  cta?: string;
  href?: string;
}) {
  return (
    <Reveal as="aside" className="closing-panel closing-rhythm px-6 py-9 md:px-12 md:py-12">
      <h2 className={cn(sectionTitleClass, "leading-tight text-[#f7f1e6]")}>{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#f7f1e6]/88">{text}</p>
      <Link
        href={href}
        className={cn(buttonVariants({ size: "cta" }), "mt-6 h-auto bg-[#f7f1e6] whitespace-normal px-5 py-2.5 text-center text-[#3c1520] hover:bg-white")}
      >
        {cta}
      </Link>
      <p className="mt-4 text-sm leading-relaxed text-[#f7f1e6]/88">
        Call <PhoneLink location="page_cta" className="underline underline-offset-2" />
        {" · "}
        Email <EmailLink location="page_cta" className="underline underline-offset-2" />
      </p>
    </Reveal>
  );
}

export function CtaPanel({
  title = "Tell us the date, the city, and the functions.",
  text = "The inquiry form is the clearest way to write. Call or email if you would rather speak first.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Reveal as="aside" className="closing-panel closing-rhythm px-6 py-9 md:px-12 md:py-12">
      <h2 className={cn(sectionTitleClass, "leading-tight text-[#f7f1e6]")}>{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#f7f1e6]/88">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "cta" }), "bg-[#f7f1e6] text-[#3c1520] hover:bg-white")}
        >
          Inquire
        </Link>
        <PhoneLink
          location="cta_panel"
          className={cn(buttonVariants({ size: "cta", variant: "outline" }), "border-[#e4c88a]/70 bg-transparent text-[#f7f1e6] hover:bg-[#f7f1e6]/10")}
        >
          Call {site.phoneDisplay}
        </PhoneLink>
      </div>
    </Reveal>
  );
}
