"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Beats16 page error", error.digest ?? "no-digest");
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl leading-none">This page did not load.</h1>
      <p className="mt-4 text-lg leading-relaxed">
        Please try again. If it still fails, call {site.phoneDisplay} or email {site.email}.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex h-11 items-center rounded-lg bg-primary px-5 font-medium text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}
