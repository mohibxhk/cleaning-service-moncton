# Cleaning Service Moncton

Next.js 15 · React 19 · TypeScript · Tailwind v4 · Framer Motion · Server Actions

94 Curry St, Moncton, NB E1A 3V5 — +1 (506) 269-4775

---

## Run it

```bash
npm install
cp .env.example .env.local     # fill in what you have; it runs without any of it
npm run dev                    # http://localhost:3000
```

Build check:

```bash
npm run build
```

## Environment

| Variable | Needed for | Without it |
|---|---|---|
| `ANTHROPIC_API_KEY` | The AI assistant | Chat replies with the phone number instead. Nothing breaks. |
| `RESEND_API_KEY` | Booking + contact emails | Submissions are logged to the server console. The customer still sees a confirmation and a reference number. |
| `BOOKING_NOTIFY_EMAIL` | Where bookings land | Falls back to the address in `src/lib/site.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG tags | Defaults to `https://cleaningservicemoncton.ca`. **Set this before going live** or the sitemap points at the wrong host. |

The Anthropic key costs real money per conversation. Set a spend cap in the console before you hand this to the client.

## Deploy to Vercel

1. Push to GitHub.
2. Vercel → Add New → Project → import the repo.
3. Framework preset: **Next.js** (it will detect this on its own — unlike the static site, do *not* pick "Other").
4. Add the environment variables above under Settings → Environment Variables.
5. Deploy.

## Where the content lives

**`src/lib/site.ts` is the single source of truth.** Business name, phone, address, hours, service areas and drive times, the six services, the eight FAQs, the four products, the five process steps. Change it there and it updates the pages, the footer, the sitemap, the JSON-LD schema, *and* the chatbot's system prompt.

The chatbot's voice and its pricing rules live in `src/app/api/chat/route.ts`. Read that prompt before launch — it is the thing customers will talk to.

---

## What is real and what is placeholder

Real, from the client's Google listing: business name, address, phone, both service categories.

**Everything below is invented and must be replaced before this goes live.**

| Item | File | Note |
|---|---|---|
| Hours (Mon–Fri 8–18, Sat 9–15) | `src/lib/site.ts` | No hours were listed on Google. |
| Email `hello@cleaningservicemoncton.ca` | `src/lib/site.ts` | Domain does not exist yet. |
| Founded 2019 | `src/lib/site.ts` | Drives the "years cleaning here" stat on the homepage. |
| All prices — $189 / $149 / $329, add-ons, $150 minimum order | `src/app/pricing/page.tsx`, chat prompt | Guesses. The chatbot quotes these. |
| 3 testimonials | `src/lib/site.ts` | Each is literally named "Placeholder review". Do not ship these. |
| Product catalogue and prices | `src/lib/site.ts` | Sample only. |
| Before/after photos | `src/app/page.tsx` | Unsplash URLs, and the photo IDs are guesses — some may 404. Swap in the client's own before/after pairs shot from the same position. |
| Drive times to 8 towns | `src/lib/site.ts` | Plausible, not measured. |
| "Insured & WorkSafeNB covered", "background checked", "48-hour re-clean" | throughout | **Claims about insurance and coverage.** Confirm these are true before publishing, or delete them. |

## Not built

- **Admin dashboard.** There is no database. Bookings are validated server-side, given a reference (`CSM-YYYYMMDD-XXXX`), and emailed out. To add a dashboard you need a database — the seam is `deliver()` in `src/app/actions.ts`; write to Postgres there before or instead of sending the email.
- **Customer-facing confirmation email.** Only the business is notified. Sending to the customer is a second `deliver()` call with their address.
- **Real booking availability.** The form takes a *requested* window and says so plainly. It cannot know the crew's calendar.
- **OG image.** No `opengraph-image.png` exists yet. Add one at `src/app/opengraph-image.png` (1200×630) and Next will wire it up automatically.

## shadcn/ui

The CLI could not reach `ui.shadcn.com` from the build environment, so the primitives (`Button`, `Input`, `Select`, `Textarea`, `Label`) are hand-written in `src/components/ui.tsx` with the same API. shadcn is copy-in source anyway — nothing is missing, and you can run `npx shadcn@latest add …` later without conflict.

## Accessibility notes

Skip link, focus-visible rings on every interactive element, the before/after slider is a real `<input type="range">` so it works with arrow keys and screen readers, the FAQ uses `aria-expanded`/`aria-controls`, the chat is a labelled dialog that closes on Escape, and every animation is disabled under `prefers-reduced-motion`.
