# Property Configuration

## Scope

Property configuration owns: - Property identity - Address - Timezone -
Currency - Operating policies - Rooms - Room types - Bed and occupancy
attributes - Floors - Outlets - Service points - Revenue categories -
Tax mappings - Business date

## Rules

-   Configuration must be versioned.
-   Material changes must be effective-dated and audited.
-   Historic transactions retain the original configuration meaning.
-   Production reference data must use controlled import and validation.
-   Invalid duplicate room, rate, tax or mapping records must be
    rejected with row errors.
-   Hotel date is maintained separately from server timestamp.
-   Overnight operations post to the configured business date.

## Initial property profile

Approximately 80 rooms, with restaurant, room service, banquet
facilities, swimming pool and bicycle services.
