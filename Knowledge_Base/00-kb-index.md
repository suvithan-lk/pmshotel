# Jaffna City Hotel PMS --- Knowledge Base Index

## Purpose

This folder is the controlled knowledge base for the Jaffna City Hotel
Property Management System (PMS). It is intended to provide consistent
project context for development, code review, testing, troubleshooting,
documentation, and AI-assisted engineering.

## Source of truth

The primary business source is **Jaffna City Hotel PMS Business
Requirements Document, Version 1.0, dated 8 September 2026**. The
companion engineering source is **Jaffna City Hotel PMS Developer
Workflow and Module Diagrams**.

The business requirements document defines business requirements,
operating rules, delivery boundaries and acceptance conditions. It is
the controlled reference for product, design, engineering, testing,
migration, training and go-live decisions.

## Technology baseline

-   Backend: .NET 10 Web API and background workers
-   Frontend: Next.js 16 App Router + TypeScript
-   Database: PostgreSQL 18
-   ORM: EF Core 10
-   Cache: Redis only when justified by measured need
-   Storage: Private object storage with controlled signed access
-   Messaging: Transactional outbox, durable inbox, managed queue when
    required
-   Observability: OpenTelemetry-compatible traces, metrics and
    structured logs

## Document control (source BRD)

-   Document: Business Requirements Document
-   Property: Jaffna City Hotel (~80 rooms; restaurant, room service,
    banquet facilities, swimming pool, bicycle services)
-   Version: 1.0
-   Status: Baseline for stakeholder review and delivery planning
-   Date: 8 September 2026
-   Initial delivery window: twelve weeks for basic operational
    capability
-   Requirement terms: **MUST** is mandatory, **SHOULD** is strongly
    recommended, **MAY** is optional

## Approval responsibilities

| Approver | Approval focus | Required before |
|---|---|---|
| Hotel owner | Business scope, budget, brand direction, operating policy | Build commitment and go-live |
| General manager | Hotel workflows, roles, exceptions, reports | User acceptance testing |
| Finance lead | Taxes, tenders, folio, invoice, close controls | Financial acceptance |
| Operations leads | Reservations, front desk, housekeeping, maintenance | Operational acceptance |
| Restaurant manager | Menu, KOT, cashier, room charge, shift workflow | POS acceptance |
| Project manager | Scope, dependencies, schedule, risk, signoffs | Every release gate |
| Technical lead | Architecture, security, quality, recovery evidence | Production deployment |

## Change control

Every requested change must identify: business value, requirement IDs
affected, priority, schedule effect, migration effect, security effect
and test effect. The product owner and project manager approve scope
changes. A change that threatens operational safety, reconciliation,
data integrity, training or recovery must move to a later phase unless
the steering group formally changes the release date or resources.

## Reference baseline

-   Microsoft .NET release/support policy: https://learn.microsoft.com/en-us/dotnet/core/releases-and-support
-   Next.js documentation: https://nextjs.org/docs
-   PostgreSQL 18 documentation: https://www.postgresql.org/docs/18/
-   OWASP Application Security Verification Standard: https://owasp.org/www-project-application-security-verification-standard/
-   Web Content Accessibility Guidelines: https://www.w3.org/TR/WCAG22/
-   OpenTelemetry documentation: https://opentelemetry.io/docs/
-   PCI Security Standards Council document library: https://www.pcisecuritystandards.org/document_library/

## Recommended reading order

1.  Project overview
2.  System and module architecture
3.  Business workflows
4.  Identity and access
5.  Property and room configuration
6.  Availability and rates
7.  Reservations and guests
8.  Front desk and stays
9.  Folios and payments
10. Housekeeping and maintenance
11. Restaurant and POS
12. Facilities and inventory
13. Website and direct booking
14. Channel manager integrations
15. Data and database rules
16. API and integration contracts
17. Security and privacy
18. Reporting and KPIs
19. AI governance
20. Migration and cutover
21. Testing and UAT
22. Roadmap and release control
23. Decisions, assumptions, risks and glossary

## Change rule

Project-specific changes must be recorded against the relevant
requirement, architecture decision, migration impact, security impact
and test impact. Do not silently replace the controlled requirements
with assumptions.
