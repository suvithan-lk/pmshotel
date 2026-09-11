# API and Integration Contracts

## API baseline

-   Versioned APIs
-   Authentication and authorization
-   Explicit request/response contracts
-   Validation
-   Idempotency for retryable commands
-   Consistent problem responses
-   Bounded pagination
-   Stable ordering
-   Explicit filter semantics
-   Unambiguous date/timezone/currency/decimal formats

## Integration directions and contracts

| Integration | Direction | Contract and control |
|---|---|---|
| Channel manager | Two-way | Versioned canonical ARI/reservation messages, signed inbound, mapping, retries, reconciliation |
| Payment provider | Two-way | Token/terminal reference, status lifecycle, webhook verification, refund reference, settlement reconciliation |
| Accounting | Outbound with status return | Approved posting batches, account mapping, business date, source totals, idempotent batch identity |
| Email and SMS | Outbound with delivery status | Approved templates, consent policy, correlation, delivery history |
| Website analytics | Outbound | Consent-aware funnel/campaign events without operational secrets |
| Identity provider | Two-way | Standard authentication, group/claim mapping, session and lifecycle handling |

## Architectural boundary

Controllers/route handlers remain thin. Business rules belong in
application/domain components.

EF entities must not be exposed directly as public API contracts.

## Integration adapters

Adapters translate external payloads at the boundary. Vendor-specific
concepts must not leak into core business domains.

## Messaging

Use: - Transactional outbox for committed outbound events - Durable
inbox for external messages - Managed queue when required

## Secrets

Secrets use managed secret storage and never appear in: - Source code -
Logs - Browser payloads - Exported support bundles

## Idempotency

Retrying the same operation must not create a second business effect.
Materially different input using the same idempotency key is rejected.
