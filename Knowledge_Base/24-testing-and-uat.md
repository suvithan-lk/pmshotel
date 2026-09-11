# Testing and UAT

## Definition of done

A requirement is complete only when applicable: - Code - Review -
Automated tests - Security checks - Database migration - Audit
behavior - Telemetry - User experience - Documentation - Acceptance
evidence

A screen that appears functional but lacks permission enforcement,
idempotency, reconciliation, error handling or operational support is
not done.

## Critical UAT scenarios

1.  Two users attempt final available room simultaneously.
2.  Booking confirmation is retried after timeout.
3.  Arrival room is dirty or maintenance-blocked.
4.  Guest checks in, moves, extends and checks out.
5.  Accommodation posting job retries.
6.  Restaurant room charge is retried.
7.  Cashier closes with variance.
8.  Housekeeping inspection fails.
9.  OTA sends duplicate modification.
10. Payment webhook is duplicated/replayed.
11. Unauthorized direct API call.
12. Production backup restored in isolation.
13. Migrated bookings/deposits compared with source.
14. Internet/vendor service unavailable and fallback is reconciled.

## Test categories

-   Domain unit tests
-   Database integration tests
-   API contract tests
-   Integration-adapter tests
-   Critical end-to-end journey tests
-   Concurrency/idempotency tests
-   Security tests
-   Load/performance tests
-   Backup/restore tests
-   Migration rehearsal tests
-   UAT by persona
