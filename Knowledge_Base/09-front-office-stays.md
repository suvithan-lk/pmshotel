# Front Office and Stays

## Front desk dashboard

Must expose: - Arrivals - Departures - In-house guests - Room rack -
Operational exceptions

Dashboard totals must reconcile to reservation and stay records.

## Room assignment

Assignment enforces: - Correct room type - No overlapping assignment -
Occupancy rules - Housekeeping readiness - Maintenance blocking

Authorized overrides require full audit.

## Check-in

Check-in verifies: - Guest - Room - Guarantee - Required registration
data

The stay is created once and room becomes occupied.

## Room moves

Room assignment and move history must be preserved with effective time
and audit identity.

## Stay extension

Extension rechecks availability and rate rules. Conflicts must be
explained and cannot silently overbook.

## Stay lifecycle

Expected -\> Checked in / cancelled.

In house -\> Moved / extended / checked out.

Checked out is a controlled terminal state. Reopening is only through a
controlled exception.
