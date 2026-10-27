const hits = new Map<string, number[]>();

/** In-memory window. Enough to slow a burst on one server; not a global lock. */
export function allowRequest(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "local";
}
