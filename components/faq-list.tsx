import Link from "next/link";
import type { FaqItem } from "@/content/faqs";
import { sectionTitleClass } from "@/components/blocks";
import { Reveal } from "@/components/motion";

export function FaqList({
  items,
  heading = "Questions people ask",
  headingId = "faq-heading",
  intro,
}: {
  items: FaqItem[];
  heading?: string;
  headingId?: string;
  intro?: string;
}) {
  return (
    <Reveal as="section" className="section-rhythm" labelledBy={headingId}>
      <h2 id={headingId} className={sectionTitleClass}>
        {heading}
      </h2>
      {intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed">{intro}</p> : null}
      <div className="mt-6 divide-y divide-[color-mix(in_srgb,var(--gold)_35%,var(--border))] border-y border-[color-mix(in_srgb,var(--gold)_45%,var(--border))]">
        {items.map((item) => (
          <details key={item.id} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-medium [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span aria-hidden="true" className="text-primary group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden text-primary group-open:inline">
                –
              </span>
            </summary>
            <div className="max-w-3xl pb-4">
              <p className="leading-relaxed text-pretty">{item.answer}</p>
              {item.related ? (
                <p className="mt-3">
                  <Link
                    href={item.related.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-2"
                  >
                    {item.related.label}
                  </Link>
                </p>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </Reveal>
  );
}
