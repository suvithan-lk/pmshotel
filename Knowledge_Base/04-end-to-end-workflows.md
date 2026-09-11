# End-to-End Business Workflows

## Guest and revenue journey

1.  Guest discovers the hotel through website, social marketing, OTA,
    agent or direct contact.
2.  Guest/staff searches dates and occupancy.
3.  Availability returns offers with complete price, policy, inclusions
    and expiry.
4.  Confirmation revalidates quote and inventory, records guest and
    guarantee, allocates room-type inventory and issues one booking
    reference.
5.  Pre-arrival captures approved messages, arrival details, requests,
    deposits and room preparation.
6.  Front desk assigns an eligible inspected room and checks in the
    verified guest.
7.  During stay, accommodation, restaurant, room service and facility
    charges post to the correct folio using source references.
8.  Checkout reviews charges, settles balance, issues invoice, closes
    stay and creates departure housekeeping exactly once.
9.  Reporting, CRM and approved AI consume governed projections without
    directly changing operational truth.

## Booking workflow

Search -\> Quote -\> Select -\> Guarantee -\> Confirm -\> Result.

Rules: - Quote is time-limited and is not a confirmed reservation. -
Confirmation locks relevant dates, rechecks inventory/rates and creates
one reservation in a short transaction. - Confirmation API requires an
idempotency key. - Reusing the same idempotency key with materially
different input is rejected. - Price/policy changes must be actively
accepted. - Staff may create walk-in, telephone, email, agent and
corporate bookings according to permissions.

## Front desk workflow

Prepare arrival -\> Assign room -\> Check in -\> Manage stay -\> Check
out.

Checkout normally requires a settled or formally transferred balance and
changes the room to departure dirty exactly once.

## Room readiness workflow

Occupancy state + housekeeping state + maintenance state -\> readiness
decision -\> generate task -\> assign/clean -\> inspect/rework -\>
release/block.

A room is normally assignable only when: - Correct booked room type - No
overlapping stay - No blocking maintenance - Vacant - Clean - Inspection
rule satisfied

Overrides require permission, reason, audit and follow-up.

## Restaurant workflow

Open order -\> Add items -\> Send KOT -\> Prepare/serve -\> Settle -\>
Close.

Room charge verifies active stay and posting privilege, then creates one
source-linked folio entry.
