import { NextResponse } from "next/server";

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function readJson(request: Request): Promise<unknown | null> {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > 100_000) return null;
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function jsonError(errors: Record<string, string>, status = 400) {
  return NextResponse.json({ ok: false, errors }, { status });
}
