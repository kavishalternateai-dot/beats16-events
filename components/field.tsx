import { forwardRef } from "react";
import { Label } from "@/components/ui/label";

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {hint ? (
        <p id={`${id}-hint`} className="text-sm leading-relaxed text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, hint: boolean, error?: string) {
  return [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;
}

export const ErrorSummary = forwardRef<HTMLDivElement, { errors: Record<string, string>; children?: React.ReactNode }>(
  function ErrorSummary({ errors, children }, ref) {
    const entries = Object.entries(errors).filter(([, message]) => message);
    if (entries.length === 0 && !children) return null;
    const onlyDelivery = entries.length > 0 && entries.every(([field]) => field === "form");
    return (
      <div ref={ref} tabIndex={-1} role="alert" className="scroll-mt-28 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 outline-none">
        <p className="font-medium">{onlyDelivery ? "This didn't send." : "Please check the form."}</p>
        {entries.length ? (
          <ul className="mt-2 list-disc pl-5 text-sm">
            {entries.map(([field, message]) => (
              <li key={field}>
                {field === "form" ? (
                  message
                ) : (
                  <a href={`#${field}`} className="underline underline-offset-2">
                    {message}
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>
    );
  },
);
