# Night Under the Stars — Event Ledger

Single source of truth for past, present, and future gatherings.
Mirror any active event into the `EVENTS` JS block in `index.html`.

---

## Single nights (from November 2026)

Jordan brought Night Under the Stars back on 2026-11-18 as a personal project: single-night
gatherings in different cities, at an affordable price, sold openly (no invitation code).

**The site** is four pages that share `assets/css/site.css` and `assets/js/site.js`:
Home (`index.html`), Events (`events/`), About (`about/`) and Contact (`contact/`).
The header stays on screen on every page and its button, "Join an Event", goes to Events.

**The schedule is one file: `assets/js/nights.js`.** `NIGHTS` holds one entry per night
(`id`, `city`, `region`, `date` as YYYY-MM-DD, `detail`, `price`, `link`, `soldOut`). Home shows
the next three and Events shows all of them, sorted by date; each night drops off by itself the
day after it happens. With no nights, the calendar section is hidden on both pages.
`PLANNED` is the list of city names shown on Events under "Where we're headed"; a city drops off
it by itself once it has an upcoming night.
Each night holds 20 seats, paid in full at booking, and confirms a week ahead once 12 are reserved;
if it does not confirm, everyone is refunded in full. The location and details are emailed a week
ahead, in the same email that confirms the night (Jordan, Nov 18). Stripe keeps its processing fee on a refund.
Add a night only once its city, date and price are confirmed.

**Contact.** The form on `contact/` is the Netlify form named `contact` (name, email, city,
message, and a box to hear when a night opens nearby). Every page also shows
hello@nightunderthestars.com. The June forms (`upcoming-nights`, `nuts-contact`) keep their
past submissions in Netlify.

To look at the site on this Mac: `python3 -m http.server 4173` in this folder, then
http://localhost:4173 (the pages use paths from the site root, so opening the files directly
shows them unstyled).

**The Stripe link for a night** (made in Jordan's own Stripe account, not The Telepathy Center's):
- One product per night, named "Night Under the Stars · City · Month Day, Year", priced per seat.
- Quantity adjustable, so two people can come on one checkout (suggested: 1 to 4).
- Collect name, email and phone.
- After payment, send people to `https://nightunderthestars.com/reserved.html` (not built yet) or back to the home page.
- **Seat limit:** a Payment Link can limit the number of *checkouts*, not the number of *seats*.
  With adjustable quantity, a limit of 30 checkouts can sell more than 30 seats. Either fix the
  quantity at 1 and set the limit to the seat count, or set the limit below the seat count and
  turn the link off by hand (`soldOut: true` on the page) when the night is full.
- The page adds the night's `id` to the link as `client_reference_id`, so each payment in Stripe
  shows which night it was for.

**Still to settle before the first night is listed:** cities and dates, the price, the size of
the circle, a refund line sized for a single evening (the policy below was written for the
$3,500 weekend), and whether a release is signed at checkout or at the door.

The sections below are the June 2026 weekend ledger, kept as the record. The invitation-code
gate and the Hudson Valley listing were taken off the page in this change (git keeps them).

---

## Live Events (June 2026 ledger)

### Hudson Valley · June 2026
- **Code:** `UNDERTHESKY`
- **Dates:** Friday, June 12 — Sunday, June 14, 2026
- **Location:** Hudson Valley, New York
- **Address:** TBD — venue to be locked
- **Price:** $3,500 / seat (first-event pricing)
- **Seats:** 8
- **Stripe link:** https://buy.stripe.com/dRm8wOgyi6NO8E30wIgQE01
- **Status:** Live — coordinating invitees, venue not yet secured
- **Confirmed interest:** [track names as commitments land]
- **Notes:** First event. Rae attending was a key signal for the June 12-14 weekend.

---

## Past Events

*(None yet — first event is Hudson Valley · June 2026.)*

When an event completes, move its entry here and add:
- Final attendee count
- What worked / what to change
- Anything to carry forward

---

## Codename Pool

A curated set of evocative single-word/short-phrase codes to draw from for future events.
Each event uses one shared code (Stripe handles the seat limit). Mark codes as used when assigned.

### Used
- `UNDERTHESKY` — Hudson Valley · June 2026

### Available
- `FOLLOWTHEFIRE`
- `THRESHOLD`
- `REMEMBER`
- `STARWALK`
- `LONGNIGHT`
- `INNERSKY`
- `DEEPNIGHT`
- `HOMECOMING`
- `KINDLE`
- `FIRSTLIGHT`
- `LISTEN`
- `WITNESS`
- `CROSSING`
- `WAYHOME`
- `OPENSKY`
- `SLOWFIRE`
- `WAKINGSLEEP`

If you want to swap the Hudson event's code to one of these (cleaner than `HUDSON-JUNE-26`), pick one and I'll update the JS in one edit.

---

## Future / Planning

*(Sketch upcoming events here as they take shape — even rough placeholders help with sequencing.)*

Examples:
- **Sedona · Fall 2026** — late Oct/early Nov, AZ
- **Hudson Valley · Winter 2026** — repeat of June format

---

## Refund Policy

### Short (for Stripe Payment Link description)
> Full refund up to 30 days before the event. 50% refund 14-29 days before. No refund inside 14 days. Seats transferable to another invited guest with 7 days notice.

### Expanded (for post-reservation email and waiver)
> **Reservations and Refunds.** Your seat is held upon receipt of payment. Should you need to cancel:
> - More than 30 days before the event: full refund.
> - 14 to 29 days before the event: 50% refund.
> - Within 14 days of the event: no refund, though your seat may be transferred to another invited guest with at least 7 days written notice.
>
> We hold the right to cancel or postpone the gathering for reasons of safety, weather, or unforeseen circumstance, in which case full refunds are issued or seats credited to a future event at your preference.

---

## Stripe Payment Link Setup Notes

When creating each event's Payment Link:
- **Amount:** event price per seat
- **Quantity:** adjustable, min 1, **max 8** (or whatever the event's seat count is — Stripe enforces the cap)
- **Collect:** name, email, phone, billing address
- **Description:** include the short refund policy
- **Success URL:** can point back to `https://nightunderthestars.com/` (or a thank-you page if/when built)
- **client_reference_id:** the page auto-passes the invitation code here, so each Stripe transaction is tagged with the code that was used

---

## Operational Reminders

- **Waiver:** attorney-drafted release of liability + NDA + photo/media release. Send via DocuSign after reservation; signed copy required before arrival.
- **Pre-arrival emails:** confirmation (immediate, manual), waiver (within 24 hours), T-7 logistics, T-1 check-in.
- **Day-of:** keep a quiet welcome list at arrival, dietary/allergy summary visible to the kitchen.
- **Post-event:** simple thank-you message; capture any willing testimonial language for future use (no public attribution without explicit consent).
