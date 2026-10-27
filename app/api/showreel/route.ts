import { NextResponse } from "next/server";
import { jsonError, readJson, sameOrigin } from "@/lib/api";
import { recordLead, showreelLead } from "@/lib/leads";
import { resolveShowreel } from "@/lib/resolve-media";
import { validateShowreel } from "@/lib/validate";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return jsonError({ form: "Please send the form from the Beats16 site." }, 403);
  }

  const payload = await readJson(request);
  if (payload === null) {
    return jsonError({ form: "Please send the form again." });
  }

  const result = validateShowreel(payload);
  if (!result.ok) return jsonError(result.errors);

  const showreel = resolveShowreel(result.data.band);

  if (result.data.companyWebsite) {
    return NextResponse.json({
      ok: true,
      downloadUrl: showreel.url,
      placeholder: showreel.placeholder,
      external: showreel.external,
      filename: showreel.filename,
    });
  }

  try {
    await recordLead(showreelLead(result.data));
  } catch {
    return jsonError({ form: "We could not start the download just now. Please email or call." }, 502);
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: showreel.url,
    placeholder: showreel.placeholder,
    external: showreel.external,
    filename: showreel.filename,
  });
}
