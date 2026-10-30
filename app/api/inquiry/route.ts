import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { jsonError, readJson, sameOrigin } from "@/lib/api";
import { inquiryLead, recordLead } from "@/lib/leads";
import { allowRequest, clientKey } from "@/lib/rate-limit";
import { validateInquiry } from "@/lib/validate";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return jsonError({ form: "Please send the form from the Beats16 site." }, 403);
  }

  if (!allowRequest(`inquiry:${clientKey(request)}`)) {
    return jsonError({ form: "Please wait a few minutes, then send the form again." }, 429);
  }

  const payload = await readJson(request);
  if (payload === null) {
    return jsonError({ form: "Please send the form again." });
  }

  const result = validateInquiry(payload);
  if (!result.ok) return jsonError(result.errors);

  if (result.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  try {
    await recordLead(inquiryLead(result.data));
  } catch {
    return jsonError(
      { form: `We couldn't send this online. Please email ${site.email} or call ${site.phoneDisplay}. Your details are still in the form.` },
      503,
    );
  }

  return NextResponse.json({ ok: true });
}
