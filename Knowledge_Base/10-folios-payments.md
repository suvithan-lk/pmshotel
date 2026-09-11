# Folios and Payments

## Folio definition

A folio is the operational bill and financial ledger for a guest,
company or other responsible payer. It can contain: - Accommodation -
Restaurant - Room service - Facility - Adjustment charges - Deposits -
Payments - Refunds - Transfers

A reservation/stay may have multiple controlled folio windows for split
billing.

## Folio lifecycle

| State | Meaning | Core rule |
|---|---|---|
| Open | May receive authorized posting and settlement | Entries are append-only after posting |
| Under review | Posting restricted while exception is resolved | Reason and reviewer recorded |
| Settled | Balance is zero or formally transferred | Further change uses controlled reopen |
| Closed | Invoice and close controls complete | No direct mutation; use linked correction process |

## Financial integrity

-   Posted folio entries are immutable.
-   Corrections use linked transfer, reversal or adjustment.
-   Every correction has reason and required approval.
-   Accommodation posting is repeat-safe by stay, hotel date and charge
    type.
-   Deposits/payments retain provider, tender, external reference and
    status.
-   Invoice numbers are unique, sequential under approved policy and
    never reused.
-   Cash, external card, bank transfer and approved credit settlement
    references are supported.
-   Refunds, complimentary items and discounts follow approval
    thresholds.
-   Money uses decimal database types with declared precision; floating
    point is prohibited for financial values.
-   Posted financial records are append-only from application workflows.
-   Currency, tax basis, rate, discount, service charge and rounding
    outcome must be stored with each posted transaction.
-   Every integration posting must carry an idempotency or source
    identity key.
-   Refund, reversal, transfer, void and adjustment must reference the
    original transaction where applicable.
-   Cashier and POS close must report expected, actual and variance by
    tender.
-   Closed business-date changes require a controlled reopen or next-date
    correction policy.

## Checkout

Checkout settles or formally routes remaining balance, issues invoice,
closes stay and creates departure housekeeping once.

## Payment provider

Only provider tokens and non-sensitive references are stored. Raw card
numbers and security codes must never be stored.
