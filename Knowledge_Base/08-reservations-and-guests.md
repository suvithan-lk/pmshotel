# Reservations and Guests

## Reservation capabilities

-   Create one or more room reservations.
-   Record source/channel/external reference/booker/creation context.
-   Idempotent confirmation.
-   Modify dates, room type, rate, occupancy and guest details with
    revalidation.
-   Cancel with policy application, inventory release, reason and
    source.
-   No-show with financial handling and future-night release according
    to policy.
-   Support walk-in, telephone, email, website, OTA, agent and corporate
    sources.

## Reservation lifecycle

### Draft/quoted

No durable inventory sale until an approved hold or confirmation.

### Confirmed

May be modified, cancelled, checked in or marked no-show. Changes
revalidate inventory and policy.

### Checked in

Transitions into active stay management. Reservation commercial snapshot
remains preserved.

### Cancelled

Terminal except authorized reinstatement. Inventory is released exactly
once.

### No show

Terminal except authorized recovery. Policy and remaining-night release
are applied.

## Guest records

Guest profiles may contain: - Contact details - Identity references -
Preferences - Notes - Consent flags - Special requests

Sensitive fields are permission restricted and auditable.

Duplicate guest suggestions must never automatically merge profiles.
Merge requires permission, review and selection of the surviving
profile.

## Guest consent and CRM (MVP scope)

-   Guest consent and communication preference must be recorded by
    purpose and source. Marketing must exclude unapproved recipients.
-   Segmentation and campaign automation (Phase 2) must use approved
    fields and suppression rules, with explainable, auditable segment
    membership.
-   Group blocks/rooming lists and corporate/travel-agent negotiated
    rate profiles are Phase 2, after individual booking stability.
