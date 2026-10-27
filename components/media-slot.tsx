import Image from "next/image";
import type { ResolvedVisual } from "@/lib/resolve-media";
import { sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function MediaSlot({
  slot,
  priority = false,
  className,
}: {
  slot: ResolvedVisual;
  priority?: boolean;
  className?: string;
}) {
  const coming = slot.kind === "video" ? "Film coming" : "Photo coming";

  return (
    <figure className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_24px_-24px_rgb(28_20_18/0.16),0_1px_2px_rgb(28_20_18/0.04)]">
        <div className="relative aspect-[4/3]">
          {slot.src && slot.kind === "image" ? (
            <Image
              src={slot.src}
              alt={slot.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
          ) : null}
          {slot.src && slot.kind === "video" ? (
            <video
              controls
              playsInline
              preload="metadata"
              poster={slot.poster ?? undefined}
              aria-label={slot.alt || slot.label}
              className="h-full w-full object-cover"
              src={slot.src}
            />
          ) : null}
          {slot.placeholder ? (
            <div className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(ellipse_at_30%_18%,rgb(166_132_70/0.16),transparent_58%),linear-gradient(180deg,#fffcf8_0%,#f4ebdd_100%)] p-5">
              <div className="pointer-events-none absolute inset-3 rounded-md border border-[color-mix(in_srgb,var(--gold)_45%,transparent)]" aria-hidden="true" />
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-primary uppercase">{coming}</p>
              <p className="mt-2 font-heading text-2xl leading-tight text-foreground">{slot.label}</p>
            </div>
          ) : null}
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {slot.placeholder ? `${slot.label}. ${coming}.` : slot.label}
      </figcaption>
    </figure>
  );
}

export function MediaGallery({
  heading,
  intro,
  slots,
  headingId,
}: {
  heading: string;
  intro: string;
  slots: ResolvedVisual[];
  headingId: string;
}) {
  const columns = slots.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <Reveal as="section" className="section-block" labelledBy={headingId}>
      <h2 id={headingId} className={sectionTitleClass}>
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/80">{intro}</p>
      <ul className={cn("mt-8 grid items-start gap-6", columns)}>
        {slots.map((slot) => (
          <li key={slot.id}>
            <MediaSlot slot={slot} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
