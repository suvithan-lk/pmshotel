# Jaffna City Hotel PMS --- Project Overview

## Product

Jaffna City Hotel Property Management System.

## Business context

The platform is intended for a single approximately 80-room Jaffna City
Hotel property with restaurant, room service, banquet facilities,
swimming pool and bicycle services.

The system replaces fragmented/manual processes with one operational
platform connecting website/direct booking, reservations, availability,
rooms, front desk, stays, guest folios, housekeeping, maintenance,
restaurant POS, room service, payments, selected facility bookings,
reporting and customer records.

## Initial release

The first twelve weeks focus on minimum safe operational capability: -
Identity and permissions - Property configuration - Room inventory -
Rates - Reservations - Front desk and stays - Folios and payments -
Housekeeping - Restaurant billing and room charge - Core reports -
Rebranded website - Direct booking - Approved data migration

Production channel-manager connectivity is dependency-gated. If vendor
contract, sandbox, mapping and certification support are not ready by
the required gate, staff-assisted channel operations and reconciliation
remain the launch fallback.

## Current business challenges

-   New owner needs a complete brand reset with a professional website
    and stronger direct booking channel.
-   Reservations arrive through calls, walk-ins, social messages, the
    website and OTAs, creating duplicate-entry and inventory risk.
-   Room readiness depends on verbal/manual coordination among front
    desk, housekeeping and maintenance.
-   Restaurant/room-service billing must connect to the correct
    in-house folio while still supporting cash and external card
    settlement.
-   Historic guest, booking and financial data may be inconsistent and
    needs controlled migration.
-   Departmental managers require fine-grained permissions, approval
    limits, shift control and a complete audit trail.
-   Management needs one set of trusted daily figures instead of
    manually assembled reports.

## Business objectives

| ID | Objective | Measurement |
|---|---|---|
| OBJ 01 | Launch the new hotel identity and direct digital presence | Approved responsive website live with analytics and editable content |
| OBJ 02 | Operate bookings and rooms from one PMS | All active stays and reservations recorded with source and inventory effect |
| OBJ 03 | Reduce overbooking and missed updates | Concurrency-safe allocation and daily channel reconciliation |
| OBJ 04 | Connect guest service and billing | Authorized restaurant/facility charges reach the correct folio once |
| OBJ 05 | Improve operational control | Named task owners, room readiness rules, close controls, exception queues |
| OBJ 06 | Protect the business | Least privilege access, audit evidence, backups, recovery tests, secure payments |
| OBJ 07 | Enable growth | Versioned APIs, modular domains, integration adapters, reporting projections |
| OBJ 08 | Use AI responsibly | Human-controlled assistance with measurable value, no autonomous high-risk action |

## Expected outcomes (baseline target)

| Outcome | Baseline target for initial release |
|---|---|
| One operational truth | Reservations, room state, stay, folio and restaurant room charges agree across teams |
| Faster direct booking | Mobile-friendly website search-to-confirmation with clear price and policy |
| Controlled access | Every action authorized by role, property, outlet, shift and approval limit |
| Faster room turnaround | Checkout creates housekeeping work; inspected rooms become visible to front desk |
| Reliable billing | Folio, POS tenders, reversals, cashier close and daily totals reconcile |
| Recoverable operation | Monitored deployments, backups, restore tests, documented fallback procedures |
| Actionable management | Occupancy, revenue, arrivals, departures, room status, outlet and exception reports |

## Success measures

The initial release is successful when trained staff can complete a
normal operating day without an external spreadsheet for active room
inventory, guest stays, folios, housekeeping status or restaurant
bills. Critical reports must reconcile to transactions, accepted
migration records must balance to agreed control totals, and the hotel
must complete a production recovery rehearsal before go-live.

## Why not a traditional/fragmented PMS approach

| Area | Traditional fragmented approach | This platform |
|---|---|---|
| Data | Department spreadsheets, duplicated records | Governed operational source with module ownership |
| Booking | Manual entry, weak concurrency | Quote revalidation, idempotency, protected allocation |
| Channels | Opaque sync or manual update | Adapter boundary, durable messaging, daily reconciliation |
| Rooms | Verbal coordination | Separate occupancy, housekeeping and maintenance states |
| Billing | Editable totals, disconnected POS | Immutable folio, source-linked POS room charge |
| Permissions | Broad job-title access | Named actions, scope, limits, approvals, audit |
| Reporting | End-of-day manual compilation | Governed projections with drill-through and exception ownership |
| Integration | Point-to-point vendor logic | Versioned canonical contracts, explicit system boundaries |
| Delivery | Large risky upgrades | Automated tests, immutable releases, feature flags, rollback |
| AI | Generic chatbot or automated decisions | Governed assistance with explanation, human confirmation, evaluation |

## Core architectural principle

Use a modular monolith for the first property. Each business module owns
its rules and database schema while deployment remains operationally
simple.

## Operational source of truth

The hotel platform owns operational reservation, stay, room-state,
folio, POS-source, task and audit truth. External systems remain
authorities for their own domains such as OTA distribution transport,
payment processing and statutory accounting.

## AI boundary

AI is an assistance layer. It is not authoritative for inventory,
pricing, payments, access control or accounting. AI outputs require
approved data, explainability, confidence where applicable, human
confirmation and audit history.
