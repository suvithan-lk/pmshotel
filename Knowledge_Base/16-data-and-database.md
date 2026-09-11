# Data and Database Requirements

## Core entities

### Identity

User, Role, Permission, Scope, Session, Approval Request, Audit Event.

### Property

Property, Room Type, Room, Outlet, Service Point, Tax, Policy, Business
Date.

### Commercial

Rate Plan, Daily Rate, Restriction, Inventory Bucket, Hold, Quote.

### Reservation

Reservation, Room Stay, Guest Snapshot, Source, Guarantee, Request.

### Stay

Stay, Registration, Room Assignment, Room Move, Checkout Record.

### Folio

Folio, Folio Window, Ledger Entry, Payment, Refund, Invoice, Routing
Rule.

### Rooms

Housekeeping Task, Inspection, Room Status Event, Asset, Work Order.

### Food and beverage

Menu, Item, Modifier, Order, Order Line, KOT, Tender, Shift, Receipt.

### Facilities

Resource, Capacity Window, Booking, Issue, Return, Service Charge.

### Inventory

Item, Unit, Location, Recipe, Stock Movement, Supplier, Purchase
Document.

### Customer

Guest Profile, Contact Point, Consent, Preference, Communication Event.

### Integration

Inbox Message, Outbox Message, Mapping, Delivery Attempt, Reconciliation
Exception.

## Database rules

-   UTC for technical timestamps.
-   Property timezone for hotel-date interpretation.
-   Immutable IDs independent of display numbers.
-   Concurrency tokens on inventory, reservation, room assignment,
    folio, order and configuration aggregates.
-   Critical uniqueness and relationship rules enforced in PostgreSQL as
    well as application logic.
-   Module schema ownership.
-   Cross-module writes through application contracts.
-   Transactional outbox for committed events.
-   Durable inbox for external messages.
-   Minimize personally identifiable information.
-   Define retention, anonymization, legal hold and deletion behavior
    before production.
-   Encrypted and monitored backups with periodic isolated restore
    tests.

## Critical uniqueness

-   Reservation source identity unique by source system/external
    reference where provided.
-   Confirmation idempotency key unique within caller/operation scope.
-   No overlapping active room assignment.
-   Nightly accommodation unique by stay, hotel date and charge type.
-   POS room charge unique by source identity.
-   Payment event unique by provider and provider transaction identity.
-   Invoice number unique and non-reusable.
-   Generated stock movement unique by source type and source identity.
-   Inbox unique by provider/message identity or verified payload
    identity.
