import { Reveal } from "@/components/motion";

export function Steps({ heading, steps }: { heading: string; steps: readonly string[] }) {
  const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <Reveal as="section" labelledBy={id} className="site-wrap py-16 md:py-20">
      <h2 id={id} className="font-display text-4xl leading-none md:text-5xl">
        {heading}
      </h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="lift-card rounded-2xl bg-chandan p-5">
            <span className="font-display text-5xl leading-none text-sindoor">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-4 leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
