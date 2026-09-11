# System Context and Boundaries

## External actors and systems

-   Guests and bookers
-   Hotel teams
-   Public website and direct booking
-   PMS back office
-   Restaurant POS
-   Channel manager
-   Online travel agencies
-   Payment provider
-   Messaging provider
-   Accounting system
-   Analytics service
-   Identity provider
-   PostgreSQL and storage

## Ownership boundaries

### Hotel platform owns

-   Operational reservations
-   Stays
-   Room state
-   Folio
-   POS source
-   Operational tasks
-   Audit truth

### Hotel platform does not own

-   Card network processing
-   OTA marketplace
-   Statutory general ledger

### Channel manager owns

-   Certified OTA distribution transport
-   Acknowledgements
-   Channel connectivity

It does not own internal hotel room operations or financial truth.

### Payment provider owns

-   Card/token processing
-   Authorization
-   Capture
-   Refund
-   Settlement references

It does not own hotel folio business logic or internal approvals.

### Accounting system owns

-   Chart of accounts
-   General ledger
-   Statutory reports
-   Period close

It does not own room inventory or guest service workflows.

### Messaging provider

Delivers approved email/SMS/other messages. Consent, template approval
and customer master remain hotel-platform concerns.

### Analytics service

Owns web/campaign measures within consent. It does not become
operational reservation or payment authority.

## Core integration rule

External messages must be translated into canonical hotel commands,
recorded durably and reconciled. Unknown mappings, duplicates, stale
updates and business conflicts must enter visible exception queues.
Integrations must never guess room type, rate plan, guest, reservation
or financial destination.
