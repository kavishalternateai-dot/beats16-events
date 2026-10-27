# Beats16 Events & Entertainment

Marketing site for Beats16, a Mumbai band for Indian weddings and traditional festivals. The copy sticks to the facts we were given: forty years, 5,000+ events, 80+ Navratris, founder Tushar Sonigra. It does not invent clients, reviews, or prices.

Canonical domain in metadata: `https://beats16.events`. That domain is not attached yet.

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
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXX`). Anything else is ignored, and the snippet is omitted when this is empty. |
| `RESEND_API_KEY` | Resend API key. Together with the two addresses below, inquiry and showreel leads are emailed. |
| `INQUIRY_FROM_EMAIL` | Verified Resend sender, for example `Beats16 Inquiries <inquiries@beats16.events>`. |
| `INQUIRY_TO_EMAIL` | Inbox that receives leads. Suggested: `beats16@gmail.com`. |
| `REEL_*` | Instagram reel permalinks. See `.env.example`. |
| `SHOWREEL_*_URL` | `https` link to a real showreel file. |

`RESEND_API_KEY` is a secret. Do not prefix it with `NEXT_PUBLIC_`. Set secrets in the Vercel project, not in git.

Reel and showreel URLs are read when the site is built. Redeploy after changing them.

### Leads, email, and the mailto fallback

`POST /api/inquiry` and `POST /api/showreel` both validate the body, ignore honeypot submissions for logging, and write a JSON line to the server log (`[beats16 lead]`).

- If `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL` are all set, the lead is emailed through the Resend API. The visitor’s address is `reply_to`. A short confirmation is also sent to the visitor from `INQUIRY_FROM_EMAIL`. The thank-you page names `beats16@gmail.com` as that mailbox once the sender is verified.
- If any of those three is missing, the log is the record and the form still succeeds. No confirmation email is sent. Until `beats16.events` is on a domain Resend can verify, leave the email settings empty.
- If Resend is configured and the request fails, the API returns 502. The inquiry form then offers a `mailto:beats16@gmail.com` link with the details filled in. The showreel form offers the same phone and email.

There is no database.

### Instagram reels

Each band page, and the independent-band section on the home page, has a reel section. The component is `components/instagram-embed.tsx`. When a permalink is a real `https://www.instagram.com/reel/…` or `/p/…` URL, the page renders Instagram’s embed iframe (`/embed`). Until then, the slot is labeled **Placeholder — add the real Instagram reel link.**

Swap a link without changing component code:

1. Paste the permalink into `content/media.ts` under that band, or
2. Set the matching `REEL_*` variable and redeploy. Env overrides the file.

The header and the call / inquire bars do not link to Facebook, LinkedIn, or WhatsApp. There is no follow button beside the reel player. Tushar Sonigra’s Instagram is prepared in Where to find us, on the contact page, and in the footer, but `INSTAGRAM_HANDLE` in `content/site.ts` stays `null` until Kavish confirms the handle. Until then those places say the account will appear once the handle is confirmed, and no profile URL is rendered. Set that constant to the handle (no `@`, no URL) to publish `https://www.instagram.com/<handle>/`. The official reel embed, once a real reel URL is set, is Instagram’s own player.

### Showreels

Each of those same places has a **Download showreel** form: name, email, phone, and which band. On success the file downloads and the page confirms the next step (call, email, or the inquiry form). The event `showreel_download` fires once per successful submit.

Until a real URL is set, the download is a placeholder PDF in `public/showreels/`. Those files are also directly reachable; they are stand-ins, not private films. Point `SHOWREEL_*_URL` at an `https` file (Drive or similar) when the real showreel exists. That URL is returned only after the form is sent. Regenerate the PDFs with:

```bash
node scripts/write-placeholder-showreels.mjs
```

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
3. Attach `beats16.events` later, under Project → Settings → Domains. Metadata, sitemap, robots, and JSON-LD already use `https://beats16.events`. No code change is required when the domain goes live, unless you also verify that domain for Resend.

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
| `content/media.ts` | Reel permalinks and showreel URLs |

Page files under `app/` own the route, the `<h1>`, and metadata. Shared chrome is `components/site-header.tsx`, `components/site-footer.tsx`, and `components/mobile-cta-bar.tsx`. The inquiry form is `components/inquiry-form.tsx`. The showreel form is `components/showreel-form.tsx`.

Photography on the site is a labeled pattern: “Placeholder — add real photo.” Replace `components/placeholder-media.tsx` usage with real images when they exist. Do not drop in photos that imply a client we have not been asked to name.

## Structured data

- Home: one entity typed as `LocalBusiness` and `PerformingGroup`, with the same name, phone, and email as the visible site.
- FAQ: `FAQPage` for the 15 questions on `/faq` (`content/faq-page.ts`). Band and wedding pages each publish their own FAQ block.
- About: `AboutPage`. Contact: `ContactPage` with the same phone and email as the site.
