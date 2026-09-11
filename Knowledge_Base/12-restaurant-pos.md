# Restaurant POS, Kitchen and Room Service

## Order modes

-   Dine-in
-   Takeaway
-   Room service

Each order has outlet, service mode, owner and business date.

## Menu

Menu items support: - Category - Production station - Price - Tax -
Service charge - Active dates

Orders preserve the effective commercial snapshot.

## Orders

Orders support: - Modifiers - Quantities - Notes - Discounts - Item
status

Kitchen and bill must interpret the same item data.

## KOT

Sending an order creates permanent KOT records by production station.
Reprint and resend preserve original KOT history.

## Kitchen lifecycle

Accepted -\> Preparing -\> Ready -\> Served.

## Settlement

Supports: - Cash - External card - Approved complimentary - Discount -
Split tenders - Validated room charge

Room charge: 1. Verify active stay. 2. Verify posting privilege. 3.
Create one source-linked folio entry.

## Inventory

Settled/served items may publish idempotent inventory consumption when
recipes are configured.

## Shift close

POS close reconciles expected, actual and variance by tender.
