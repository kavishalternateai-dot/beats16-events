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

export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const entries = Object.entries(errors).filter(([, message]) => message);
  if (entries.length === 0) return null;
  return (
    <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3">
      <p className="font-medium">Please check the form.</p>
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
    </div>
  );
}
