# Housekeeping and Maintenance

## Separate room states

Room readiness is derived from separate dimensions.

### Occupancy

-   Vacant
-   Due in
-   Occupied
-   Due out
-   Checked out

### Housekeeping

-   Dirty
-   Assigned
-   Cleaning
-   Cleaned
-   Inspected
-   DND

### Maintenance

-   Available
-   Out of service
-   Out of order
-   Inspection required

### Sellability

-   Sellable
-   Held
-   Blocked
-   Overbooking controlled

## Housekeeping

-   Checkout creates exactly one departure cleaning task.
-   Managers assign by date, floor, priority and staff member.
-   Housekeepers update only permitted states for assigned work.
-   Configured rooms require inspection before becoming ready.
-   Failed inspection creates rework.
-   Front desk sees near-real-time readiness and blocking reason.
-   Manual readiness override requires permission, reason, alert and
    audit.

## Maintenance

Work orders contain: - Room or asset - Severity - Owner - Evidence -
Lifecycle - Service-level timestamps

Authorized maintenance blocking removes affected rooms from
assignment/sellable inventory where required. Returning a blocked room
to service requires completion and optionally inspection.
