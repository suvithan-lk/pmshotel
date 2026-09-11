# Decisions, Assumptions, Risks, Traceability and Glossary

## Assumptions

-   The first implementation serves one approximately 80-room property
    in Jaffna.
-   Hotel leadership appoints one decision maker for rates, taxes,
    folio, POS and room readiness policy.
-   Stable internet is expected, but a short-outage fallback is
    required.
-   Payment processing uses an approved external provider; no raw card
    data is stored.
-   English is the initial operating language; additional languages can
    be prioritized after content approval.
-   Existing data is supplied in accessible export formats with named
    business owners.

## Dependencies

| Dependency | Owner | Required date/gate |
|---|---|---|
| Brand assets, photography, approved content | Hotel and marketing | Start of Week 2 for full website schedule |
| Room, rate, tax, policy and outlet master data | Hotel operations and finance | End of Week 2 |
| Payment provider and terminal decision | Hotel and finance | End of Week 3 |
| Channel manager contract, sandbox and mapping | Hotel and vendor | End of Week 3 for MVP inclusion |
| Legacy data extracts and business owner | Hotel and previous system owner | End of Week 3 |
| Printer, network and device inventory | Hotel IT and operations | End of Week 4 |
| Named UAT users and training schedule | Project manager | End of Week 8 |

## Key open decisions

-   Legal hotel name, tax registration, invoice sequence and rounding
    policy
-   Final room types, room list, out-of-order and overbooking policy
-   Deposit, cancellation, no-show, refund and complimentary approval
    policy
-   Payment provider, terminals, currencies and settlement
    reconciliation
-   Channel manager vendor and OTA scope
-   Legacy data retention and migration cut date
-   Website languages, domain, hosting, brand content and photography
-   POS printers, KOT stations, outlets, tax and service-charge rules
-   Accounting product and initial export depth
-   Initial recovery objectives and production support hours

## Principal risks

### Scope expansion

Mitigation: freeze MVP and use signed change control.

### Late channel access

Mitigation: dependency-gated integration and reconciliation fallback.

### Poor legacy data

Mitigation: early profiling, repeated rehearsals and signed control
totals.

### Undecided tax/billing policy

Mitigation: finance workshop and configuration signoff.

### Weak role definition

Mitigation: role workshops, least privilege and persona-based UAT.

### Network/device readiness

Mitigation: site survey, approved devices and fallback runbook.

### Direct production edits

Mitigation: restricted database access and controlled support tooling.

### AI introduced too early

Mitigation: keep AI outside operational authority until data stability.

### Insufficient training

Mitigation: super users, role practice and command-center support.

## Traceability

-   OBJ 01 -\> WEB requirements
-   OBJ 02 -\> Availability, reservations and front-office requirements
-   OBJ 03 -\> Concurrency, idempotency and channel requirements
-   OBJ 04 -\> Folio, POS and facilities requirements
-   OBJ 05 -\> Housekeeping, maintenance and reporting
-   OBJ 06 -\> Identity, security, recovery and privacy
-   OBJ 07 -\> Integration and architecture
-   OBJ 08 -\> AI requirements and governance

## Glossary

-   ADR: Average daily room rate based on accommodation revenue and sold
    room nights.
-   ARI: Availability, rates and inventory exchanged with distribution
    partners.
-   Business date: Hotel accounting/operating date, which may differ
    from wall-clock date.
-   Channel manager: Vendor connecting hotel inventory/reservations with
    multiple OTAs.
-   Folio: Operational bill and ledger of charges, payments, transfers,
    reversals and balance.
-   Idempotency: Repeat-safe operation producing one business effect for
    the same request identity.
-   KOT: Kitchen order ticket routed to the relevant production station.
-   Modular monolith: One deployable application with strongly separated
    business modules.
-   Night audit: Controlled process reviewing hotel day, postings,
    exceptions and date close.
-   OTA: Online travel agency such as Booking.com, Agoda or Expedia.
-   Out of order: Maintenance condition that normally removes a room
    from sale and assignment.
-   PMS: Property management system for reservations, stays, rooms,
    folios and hotel operations.
-   RevPAR: Accommodation room revenue divided by available room nights.
-   RPO: Maximum acceptable data loss measured backward from an
    incident.
-   RTO: Target time to restore acceptable service after an incident.
-   Source of truth: System authorized to determine a defined category
    of business state.
