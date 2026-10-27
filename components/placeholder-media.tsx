import type { MediaPattern } from "@/content/bands";
import { cn } from "@/lib/utils";

const patternClass: Record<MediaPattern, string> = {
  ceremony: "bg-[#3c1520]",
  floor: "bg-[#2c211c]",
  listening: "bg-[#241c28]",
  garba: "bg-[#6a1e2e]",
  private: "bg-[#3a2c24]",
};

export function PlaceholderMedia({
  label,
  pattern,
  className,
}: {
  label: string;
  pattern: MediaPattern;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className="bg-[#2a1218] p-2.5 shadow-[0_22px_40px_-30px_rgb(28_20_18/0.65)]">
        <div
          className={cn("relative aspect-[4/3] overflow-hidden", patternClass[pattern])}
          aria-hidden="true"
        >
          <div className="absolute inset-0 pattern-dots pattern-arcs" />
          <div className="absolute inset-3 border border-[#e4c88a]/55" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-[#f7f1e6]">
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-[#e4c88a] uppercase">Photograph to come</p>
            <p className="mt-2 font-heading text-2xl leading-tight">{label}</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Placeholder — add real photo. {label}.
      </figcaption>
    </figure>
  );
}
