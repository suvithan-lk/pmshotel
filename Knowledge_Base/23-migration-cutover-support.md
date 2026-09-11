# Migration, Cutover, Training and Support

## Migration candidates

-   Room/rate reference data
-   Users
-   Guest profiles
-   Future reservations
-   In-house stays
-   Deposits
-   Opening folio balances
-   Company/agent references
-   Selected historical summary

Final scope depends on source quality and business need.

## Migration process

1.  Identify source, owner, format, extraction method and control total.
2.  Profile duplicates, missing IDs, invalid dates, room-type
    inconsistencies, financial imbalance and sensitive content.
3.  Agree transformation/exclusion rules.
4.  Load rehearsal environment using repeatable scripts and immutable
    source copies.
5.  Reconcile row counts and financial/inventory control totals.
6.  Sample guests, future bookings, in-house stays and deposits.
7.  Correct mapping and repeat rehearsal.
8.  Freeze source, final extract, production load and reconciliation.
9.  Obtain named signoff.

## Cutover gates

-   Scope ready
-   Data ready
-   Product ready
-   Security ready
-   Recovery ready
-   People ready
-   Business ready

## Fallback

Hotel must approve a short controlled fallback for internet, payment
provider, channel or platform outage covering: - Booking inventory
control - Manual registration - Charge capture - Receipt numbering -
Room status handover - Later entry - Reconciliation

Fallback records are controlled documents and must be entered/reconciled
after restoration.
