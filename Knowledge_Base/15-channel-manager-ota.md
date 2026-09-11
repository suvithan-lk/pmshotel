# Channel Manager and OTA Integration

## Scope

Production channel-manager integration is dependency-gated and only
enters the initial release when vendor agreement, supported
API/certified connector, credentials, mapping, webhook/polling
documentation, room/rate mapping, certification contact and issue
support are ready.

## Outbound workflow

1.  PMS rate/restriction/inventory change occurs.
2.  Canonical distribution event enters outbox.
3.  Adapter maps hotel identifiers to vendor identifiers.
4.  Adapter sends with correlation and retry metadata.
5.  Acknowledgement/failure updates delivery status.
6.  Persistent failures become owned exceptions and alerts.

## Inbound workflow

1.  OTA reservation arrives through signed webhook or controlled
    polling.
2.  Durable inbox stores original payload.
3.  Payload is deduplicated.
4.  Mapping and business validation run.
5.  Valid messages create idempotent reservation commands.
6.  Unknown mappings or impossible allocation enter quarantine.

## Reconciliation

Daily reconciliation compares: - Reservations - Cancellations -
Acknowledgements - Mappings - Stale messages

Every exception has an owner and status.

## Safety rule

The integration must never invent a room type, rate plan, guest,
reservation or financial destination.
