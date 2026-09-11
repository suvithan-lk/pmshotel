# Application and Deployment Architecture

## Client and edge

Browser/mobile web -\> CDN/WAF/proxy -\> Next.js applications -\> OIDC
provider where required.

## Application/data

Next.js public/authenticated experiences connect to the ASP.NET Core
API. The API connects to: - PostgreSQL - Worker jobs - External adapters

Worker jobs handle durable/background processing, integration delivery,
scheduled work and retries.

## Managed infrastructure

-   PostgreSQL: source of truth and primary transactional store
-   Redis: optional measured cache/coordination/rate-limit capability
-   Private object storage: media, documents, invoices, exports
-   Observability: logs, metrics, traces and alerts

## Required architecture decision

The first property uses a modular monolith, not early microservices.

## Backend

.NET 10 Web API and background workers.

## Frontend

Next.js 16 App Router and TypeScript.

## Database

PostgreSQL 18 with EF Core 10 migrations.

## Storage

Private object storage with controlled signed access.

## Messaging

Transactional outbox, durable inbox and managed queue when required.

## Deployment principles

-   Automated delivery pipeline
-   Secure configuration
-   Monitored deployments
-   Backups and restore tests
-   Rollback/recovery procedures
-   No direct production edits to operational/financial truth
