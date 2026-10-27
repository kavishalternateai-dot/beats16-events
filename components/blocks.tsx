import Link from "next/link";
import { EmailLink, PhoneLink } from "@/components/contact-links";
import { HeroItem, Reveal } from "@/components/motion";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const sectionTitleClass = "font-heading text-3xl leading-tight md:text-4xl";

export function PageContainer({
  children,
  className,
  compactTop = false,
}: {
  children: React.ReactNode;
  className?: string;
  compactTop?: boolean;
}) {
  return (
    <div className={cn("site-wrap pb-16 md:pb-24", compactTop ? "pt-0" : "pt-16 md:pt-20", className)}>
      {children}
    </div>
  );
}

export function SplitHero({
  copy,
  media,
}: {
  copy: React.ReactNode;
  media?: React.ReactNode;
}) {
  if (!media) return <>{copy}</>;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,22.5rem)] lg:gap-x-16">
      <div className="min-w-0">{copy}</div>
      <div className="w-full max-w-[22.5rem] justify-self-center lg:max-w-none lg:justify-self-end">{media}</div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="max-w-2xl">
      <HeroItem>
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">{eyebrow}</p>
      </HeroItem>
      <HeroItem draw delay={0.08} className="mt-4">
        <div className="gold-rule" />
      </HeroItem>
      <HeroItem prominent delay={0.12}>
        <h1 className="mt-5 font-heading text-4xl leading-[1.12] text-balance md:text-5xl">{title}</h1>
      </HeroItem>
      <HeroItem prominent delay={0.2}>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-foreground/80">{lede}</p>
      </HeroItem>
      {actions ? (
        <HeroItem prominent delay={0.28} className="mt-8">
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
        <h2 id={labelId} className="font-heading text-3xl leading-tight md:text-4xl">
          {label}
        </h2>
      ) : null}
      <dl className={cn("grid border-y border-border sm:grid-cols-3", label && "mt-8")}>
        {items.map((item, index) => (
          <Reveal
            as="div"
            key={item.value}
            delay={index * 0.06}
            className={cn(
              "py-7",
              index === 0 ? "sm:pr-6" : "border-t border-border sm:border-t-0 sm:border-l sm:px-6",
            )}
          >
            <dt className="font-heading text-4xl leading-none tracking-tight text-foreground">{item.value}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</dd>
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
  contactLocation = "page_cta",
}: {
  title: string;
  text: string;
  cta?: string;
  href?: string;
  contactLocation?: "page_cta" | "home_cta";
}) {
  return (
    <Reveal as="aside" className="closing-panel section-block px-6 py-12 md:px-14 md:py-16">
      <h2 className={sectionTitleClass}>{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{text}</p>
      <Link href={href} className={cn(buttonVariants({ size: "cta" }), "mt-8 h-auto whitespace-normal px-5 py-2.5 text-center")}>
        {cta}
      </Link>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Call <PhoneLink location={contactLocation} className="underline underline-offset-2" />
        {" · "}
        Email <EmailLink location={contactLocation} className="underline underline-offset-2" />
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
    <Reveal as="aside" className="closing-panel section-block px-6 py-12 md:px-14 md:py-16">
      <h2 className={sectionTitleClass}>{title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{text}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/contact" className={cn(buttonVariants({ size: "cta" }))}>
          Inquire
        </Link>
        <PhoneLink location="cta_panel" className={cn(buttonVariants({ size: "cta", variant: "outline" }))}>
          Call {site.phoneDisplay}
        </PhoneLink>
      </div>
    </Reveal>
  );
}
