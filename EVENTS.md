# Night Under the Stars — Event Ledger

Single source of truth for past, present, and future gatherings.
Mirror any active event into the `EVENTS` JS block in `index.html`.

---

## Live Events

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
