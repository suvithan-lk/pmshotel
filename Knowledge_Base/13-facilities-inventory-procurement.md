# Facilities, Inventory and Procurement

## Facilities

Facilities include: - Banquet halls - Pool access - Bicycle services

Initial capability uses capacity or asset availability, booking/issue,
fulfilment, settlement and close.

Advanced banquet proposals/packages/function sheets/resource planning,
detailed pool memberships/capacity/waivers and bicycle fleet
inspections/rental agreements are later-phase depth.

Facility availability must prevent overlapping capacity or asset
commitment (Phase 2): a concurrent request cannot exceed configured
capacity. A resource booking is not a room reservation; time, capacity
and asset conflict rules are modelled explicitly.

## Inventory

Core inventory entities: - Item - Unit - Location - Recipe - Stock
movement - Supplier - Purchase document

Stock movements are append-only for: - Receipt - Consumption -
Transfer - Wastage - Adjustment

Negative stock behavior must be configurable and visible: a prohibited
issue is blocked, or an allowed issue creates a visible exception.

## Procurement

Later-phase procurement depth includes purchase requests, approvals,
purchase orders, goods receipt, supplier returns and deeper costing.

## Finance handoff

Approved summarized financial batches map operational categories to
accounting accounts. The accounting system remains the statutory ledger.
