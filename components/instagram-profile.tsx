import { instagramHandle, instagramPendingCopy, instagramProfileUrl, site } from "@/content/site";

/**
 * Tushar Sonigra's profile link. With INSTAGRAM_HANDLE unset, this is copy only:
 * no href is rendered. Set the handle in content/site.ts to publish the link.
 */
export function InstagramProfile({ tone = "light" }: { tone?: "light" | "dark" }) {
  const handle = instagramHandle();
  const href = instagramProfileUrl();

  if (!handle || !href) {
    return (
      <span className={tone === "dark" ? "text-[#f7f1e6]/72" : "text-muted-foreground"}>
        {instagramPendingCopy}
      </span>
    );
  }

  const linkClass =
    tone === "dark"
      ? "underline decoration-[#e4c88a]/70 underline-offset-4"
      : "underline underline-offset-4";

  return (
    <a href={href} className={linkClass} rel="noopener noreferrer" target="_blank">
      {site.founder} on Instagram (@{handle})
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
