# Beats16 Events & Entertainment

Marketing site for Beats16, a Mumbai band for Indian weddings and traditional festivals. The copy sticks to the facts we were given: 5,000+ events, 80+ Navratris, founder Tushar Sonigra, and a Mumbai base. The long history is named once, on the home hero. The site does not invent clients, reviews, or prices.

Canonical origin for metadata, sitemap, and schema is `NEXT_PUBLIC_SITE_URL`, or `https://beats16-events.vercel.app` when that variable is unset. `beats16.events` is not live yet.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a different port:

```bash
npx next dev -p 4317
```

Production build:

```bash
npm run build
npm start
```

## Pages

| Path | Page |
| --- | --- |
| `/` | Home, including independent bands |
| `/weddings` | Indian weddings |
| `/gauri` | Gauri |
| `/rdx` | RDX |
| `/daastan-e-ghazal` | Daastan-e-Ghazal |
| `/navratri` | Navratri band |
| `/corporate-cultural` | Corporate and cultural events (`/corporate-cultural-events` redirects here) |
| `/about` | About |
| `/faq` | FAQ |
| `/contact` | Inquiry form |
| `/thank-you` | After a successful inquiry (not in the sitemap) |

## Environment variables

Copy `.env.example` to `.env.local`. All variables are optional. The site runs without them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin. Unset uses `https://beats16-events.vercel.app`. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXX`). Anything else is ignored, and the snippet is omitted when this is empty. |
| `RESEND_API_KEY` | Resend API key. Together with the two addresses below, inquiry and showreel leads are emailed. |
| `INQUIRY_FROM_EMAIL` | Verified Resend sender, for example `Beats16 Inquiries <inquiries@your-verified-domain>`. |
| `INQUIRY_TO_EMAIL` | Inbox that receives leads. Suggested: `beats16@gmail.com`. |
| `LEADS_WEBHOOK_URL` | Optional. Each lead is POSTed here as JSON. For Apps Script, include `?secret=`. |
| `LEADS_WEBHOOK_SECRET` | Optional. Sent as `X-Beats16-Secret` when set. |
| `REEL_*` | Instagram reel permalinks. See `.env.example`. |
| `SHOWREEL_*_URL` | `https` link to a real showreel file. |

`RESEND_API_KEY` is a secret. Do not prefix it with `NEXT_PUBLIC_`. Set secrets in the Vercel project, not in git.

Reel and showreel URLs are read when the site is built. Redeploy after changing them.

### Leads

`POST /api/inquiry` and `POST /api/showreel` validate the body, ignore honeypot submissions, and write a JSON line to the server log (`[beats16 lead]`).

Two sinks are optional and independent. The log is always written. The form succeeds when at least one configured sink accepts the lead. It returns 502 only when a configured sink fails and none succeeded. With neither sink configured, the log is enough and the form still succeeds.

**Resend.** Set all three of `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL`. The lead is emailed through the Resend API. The visitor’s address is `reply_to`. A short confirmation is also sent to the visitor. A failed confirmation does not fail the form. Leave these empty until a domain Resend can verify is attached.

**Webhook.** Set `LEADS_WEBHOOK_URL`. The site POSTs the lead JSON with an 8 second timeout. If `LEADS_WEBHOOK_SECRET` is set, it is sent as `X-Beats16-Secret`. A Google Apps Script web app answers the first POST with a redirect, so the site repeats the POST to that location and keeps the body. A response of `{ "ok": false }` counts as a failure.

There is no database.

#### Google Sheet via Apps Script

1. Create a Google Sheet. Extensions → Apps Script. Replace the default file with `scripts/apps-script-leads.gs` (also pasted below).
2. Project Settings → Script properties: `WEBHOOK_SECRET` (a long random string) and `ALERT_TO` (comma-separated inboxes, for example `beats16@gmail.com`).
3. Deploy → New deployment → Web app. Execute as **Me**. Who has access: **Anyone**. Copy the web app URL.
4. In Vercel, set `LEADS_WEBHOOK_SECRET` to the same secret, and set `LEADS_WEBHOOK_URL` to the web app URL plus `?secret=` and that secret. Apps Script does not give `doPost` custom headers, so the query string is what the script checks. The header is still sent for any receiver that can read it.
5. Redeploy the site. Send a test inquiry. A row appears on the `Leads` tab, and `ALERT_TO` gets one email.

```javascript
var LEAD_COLUMNS = [
  "kind", "at", "name", "phone", "email",
  "eventType", "eventDate", "city", "functions", "interest",
  "guestCount", "organisation", "message", "heardAbout",
  "source", "utmSource", "utmMedium", "utmCampaign", "band",
];

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("WEBHOOK_SECRET") || "";
    var provided = readSecret_(e);
    if (!expected || provided !== expected) {
      return json_({ ok: false, error: "unauthorized" });
    }
    if (!e.postData || !e.postData.contents) {
      return json_({ ok: false, error: "empty body" });
    }
    var lead = JSON.parse(e.postData.contents);
    appendLead_(lead);
    try {
      sendAlert_(props.getProperty("ALERT_TO") || "", lead);
    } catch (mailError) {
      console.error(mailError);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function readSecret_(e) {
  var headers = e.headers || {};
  var fromHeader = headers["X-Beats16-Secret"] || headers["x-beats16-secret"] || "";
  if (fromHeader) return String(fromHeader);
  if (e.parameter && e.parameter.secret) return String(e.parameter.secret);
  return "";
}

function appendLead_(lead) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Leads");
  if (!sheet) sheet = spreadsheet.insertSheet("Leads");
  if (sheet.getLastRow() === 0) sheet.appendRow(LEAD_COLUMNS);
  var row = LEAD_COLUMNS.map(function (key) {
    var value = lead[key];
    return value == null ? "" : String(value);
  });
  sheet.appendRow(row);
}

function sendAlert_(alertTo, lead) {
  if (!alertTo) return;
  var subject = lead.kind === "showreel"
    ? "Beats16 showreel: " + (lead.name || "")
    : "Beats16 inquiry: " + (lead.name || "") + " — " + (lead.city || "");
  var lines = LEAD_COLUMNS.map(function (key) {
    return key + ": " + (lead[key] == null ? "" : lead[key]);
  });
  MailApp.sendEmail(alertTo, subject, lines.join("\n"));
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
```

### Instagram reels

Each band page, and the independent-band section on the home page, has a reel section. The component is `components/instagram-embed.tsx`. When a permalink is a real `https://www.instagram.com/reel/…` or `/p/…` URL, the page renders Instagram’s embed iframe (`/embed`). Until then, the slot is labeled **Placeholder — add the real Instagram reel link.**

Swap a link without changing component code:

1. Paste the permalink into `content/media.ts` under that band, or
2. Set the matching `REEL_*` variable and redeploy. Env overrides the file.

The header and the call / inquire bars do not link to Facebook, LinkedIn, or WhatsApp. There is no follow button beside the reel player. Tushar Sonigra’s Instagram is prepared in Where to find us, on the contact page, and in the footer, but `INSTAGRAM_HANDLE` in `content/site.ts` stays `null` until Kavish confirms the handle. Until then those places say the account will appear once the handle is confirmed, and no profile URL is rendered. Set that constant to the handle (no `@`, no URL) to publish `https://www.instagram.com/<handle>/`. The official reel embed, once a real reel URL is set, is Instagram’s own player.

### Showreels

Each band page can offer a showreel after a name and phone are delivered through the same lead pipeline as the inquiry form. The gate stays hidden until `SHOWREEL_*_URL` is an `https` file. The file is returned only after that lead is delivered. There is no placeholder download.

## Analytics

`components/analytics-script.tsx` loads GA4 after the page is interactive, and only when `NEXT_PUBLIC_GA_ID` matches `G-` plus letters and numbers.

Helpers in `lib/analytics.ts`:

| Event | When |
| --- | --- |
| `form_submit` | Inquiry form accepted (`form=inquiry`) |
| `call_click` | A phone link is used |
| `email_click` | An email link is used |
| `showreel_download` | Showreel form accepted (`band` is the band id) |

## Deploy on Vercel

This is a Next.js App Router project. Import the repository in Vercel, leave the framework preset on Next.js, and deploy.

1. Add any environment variables from `.env.example` in the Vercel project (Production, and Preview if you want them there).
2. Deploy. `npm run build` is the build command.
3. When `beats16.events` is live, set `NEXT_PUBLIC_SITE_URL` to `https://beats16.events` and redeploy. Until then the canonical origin stays `https://beats16-events.vercel.app`. Verify that domain in Resend before setting `INQUIRY_FROM_EMAIL`.

Do not add prices or client names when you connect the domain. Do not add Facebook, LinkedIn, or WhatsApp. Tushar Sonigra’s Instagram is the only social profile, and only after `INSTAGRAM_HANDLE` is set.

## Copy swaps

Edit copy in these files. Pages mostly compose them.

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, phone, email, founder, proof lines, pricing sentence, navigation, `INSTAGRAM_HANDLE` |
| `content/bands.ts` | Gauri, RDX, Daastan-e-Ghazal, Navratri, and the independent-band section |
| `content/faqs.ts` | Wedding and band-page FAQs |
| `content/faq-page.ts` | The public FAQ page (AQ-008) and its FAQPage schema |
| `content/about.ts` | About (AQ-007) |
| `content/corporate.ts` | Corporate and cultural events (AQ-010) |
| `content/contact.ts` | Contact and thank-you (AQ-009) |
| `content/forms.ts` | Inquiry and showreel option labels |
| `content/media.ts` | Reel permalinks, showreel URLs, and photo/film slots |

Page files under `app/` own the route, the `<h1>`, and metadata. Shared chrome is `components/site-header.tsx`, `components/site-footer.tsx`, and `components/mobile-cta-bar.tsx`. The inquiry form is `components/inquiry-form.tsx`. The showreel form is `components/showreel-form.tsx`.

### Photographs and films

Empty frames are intentional. They stay calm until a real file is added. Do not drop in stock photos, or photos that imply a client we have not been asked to name.

Slots live in `visualSlots` inside `content/media.ts`. Each slot has an `id`, a public label, and alt text. The home gallery, the about gallery, and the right side of inner-page heroes read those slots.

To publish a file Kavish shares, use any one of these. Then redeploy.

1. Drop the file in `public/media/` named exactly `{id}.jpg`, `{id}.jpeg`, `{id}.png`, or `{id}.webp`. Films use `{id}.mp4` or `{id}.webm`. An optional still is `{id}-poster.jpg` (or png, webp).
2. Or set `src` on that slot in `content/media.ts` to a path like `/media/gauri-ceremony.jpg`.
3. Or set the matching `MEDIA_*` variable to that same `/media/...` path. Env overrides the file and `src`.

If the path is set but the file is missing, the calm frame stays. It does not show a broken image. Add another frame later by adding a slot to `visualSlots` and its id to a gallery `slotIds` list. The layout does not need a rewrite.

The founder portrait is the real photograph of Tushar Sonigra. It stays on the home hero and the about hero. Instagram reels are separate: paste a permalink or set `REEL_*`, as above. `INSTAGRAM_HANDLE` stays null until the handle is confirmed.

## Structured data

- Home: one entity typed as `LocalBusiness` and `PerformingGroup`, with the same name, phone, and email as the visible site.
- FAQ: `FAQPage` for the 15 questions on `/faq` (`content/faq-page.ts`). Band and wedding pages each publish their own FAQ block.
- About: `AboutPage`. Contact: `ContactPage` with the same phone and email as the site.
