import { cn } from "@/lib/utils";

export function BandhaniPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 text-current", className)}
      style={{
        backgroundImage:
          "radial-gradient(circle at center, currentColor 1.15px, transparent 1.35px), radial-gradient(circle at center, currentColor 2.1px, transparent 2.5px)",
        backgroundSize: "14px 14px, 28px 28px",
        backgroundPosition: "0 0, 7px 7px",
        opacity: 0.16,
      }}
    />
  );
}
