# Availability, Rates, Quotes and Restrictions

## Requirements

-   Calculate room-type inventory for every hotel date.
-   Availability reflects reservations, holds, blocks and approved
    overbooking.
-   Confirmed allocation must be concurrency-safe.
-   Rate plans support occupancy pricing, inclusions, taxes,
    cancellation, deposit and no-show policy.
-   Restrictions support closed, closed-to-arrival, closed-to-departure,
    minimum stay and maximum stay.
-   Quotes expire and must be revalidated at confirmation.
-   Accepted booking price/policy snapshots are retained and never
    rewritten by later rate changes.

## Quote rules

A quote is a proposal, not a reservation. Confirmation must: 1.
Revalidate quote. 2. Recheck sellable inventory. 3. Recheck
rate/restriction rules. 4. Apply concurrency protection. 5. Create one
durable reservation. 6. Return one hotel reference.

## Concurrency

The system must not sell below available inventory outside an approved
overbooking policy. Simultaneous confirmation tests must demonstrate
safe allocation.

## Phase 2 extensions

-   Authorized yield users may set approved overbooking limits (visible,
    effective-dated, audited).
-   Availability search should return suitable alternatives when
    requested dates are unavailable, clearly separated and requiring
    explicit user selection (never a silent substitution).
