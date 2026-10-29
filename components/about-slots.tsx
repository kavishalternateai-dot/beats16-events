/**
 * Quote and founder video stay out of the page until real assets exist.
 * Passing nothing renders nothing. There is no placeholder copy.
 */
export function FounderQuote({ quote }: { quote?: string }) {
  if (!quote) return null;
  return (
    <blockquote className="max-w-2xl border-l-2 border-sona pl-5 font-display text-3xl leading-tight">
      {quote}
    </blockquote>
  );
}

export function FounderVideo({ src }: { src?: string }) {
  if (!src) return null;
  return (
    <video
      className="aspect-video w-full max-w-3xl rounded-3xl bg-kajal"
      controls
      playsInline
      preload="metadata"
      src={src}
    >
      <track kind="captions" />
    </video>
  );
}
