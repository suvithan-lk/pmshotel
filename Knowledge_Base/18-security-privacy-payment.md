# Security, Privacy and Payment Controls

## Security baseline

-   TLS for external and administrative traffic
-   Encryption at rest for protected data
-   Strong password policy where local credentials exist
-   MFA for privileged users
-   Secure browser cookies
-   CSRF protection
-   Content Security Policy
-   Appropriate security headers
-   Input validation
-   Parameterized EF Core/database access
-   Rate limiting and abuse controls
-   Redaction of PII, tokens and secrets from logs
-   Immutable security audit evidence
-   Named production accounts
-   Time-limited elevated access
-   Privileged activity review

## Payment

-   Store provider tokens and non-sensitive references only.
-   Never store raw card numbers, verification codes or magnetic-stripe
    data.
-   Verify payment webhooks for signature, timestamp and replay
    protection.
-   Payment events must be idempotent and reconciled.

## Threat modeling

Threat modeling is required for: - Direct booking - Authentication -
Room charge - Payment webhook - Refund - Channel import - Sensitive data
export

## Delivery security

Pipeline should run: - Dependency scans - Secret scans - Static
analysis - Dynamic security testing - Infrastructure scans

## Privacy

Personal data must be minimized, protected, retained and disclosed
according to approved policy. Sensitive guest fields require permission
restriction and audit.
