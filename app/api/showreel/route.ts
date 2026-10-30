import { NextResponse } from "next/server";
import { site } from "@/content/site";
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
  if (!showreel) {
    return jsonError({ form: "That showreel is not ready yet." }, 404);
  }

  if (result.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  try {
    await recordLead(showreelLead(result.data));
  } catch {
    return jsonError(
      { form: `We couldn't send this online. Please email ${site.email} or call ${site.phoneDisplay}. Your details are still in the form.` },
      503,
    );
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: showreel.url,
    placeholder: false,
    external: showreel.external,
    filename: showreel.filename,
  });
}
