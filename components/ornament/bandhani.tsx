import { cn } from "@/lib/utils";

export function BandhaniPattern({
  className,
  multi = false,
  strong = false,
}: {
  className?: string;
  multi?: boolean;
  strong?: boolean;
}) {
  if (multi) {
    return (
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{
          backgroundImage: [
            "radial-gradient(circle at center, #fff4e2 1.15px, transparent 1.45px)",
            "radial-gradient(circle at center, #f4a300 1.7px, transparent 2.05px)",
            "radial-gradient(circle at center, #0e6e6e 1.5px, transparent 1.9px)",
          ].join(", "),
          backgroundSize: "16px 16px, 26px 26px, 20px 20px",
          backgroundPosition: "0 0, 8px 10px, 4px 6px",
          opacity: strong ? 0.7 : 0.55,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 text-current", className)}
      style={{
        backgroundImage:
          "radial-gradient(circle at center, currentColor 1.15px, transparent 1.35px), radial-gradient(circle at center, currentColor 2.1px, transparent 2.5px)",
        backgroundSize: "14px 14px, 28px 28px",
        backgroundPosition: "0 0, 7px 7px",
        opacity: strong ? 0.45 : 0.16,
      }}
    />
  );
}
