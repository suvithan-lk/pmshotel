# Nonfunctional Requirements

  -----------------------------------------------------------------------
  ID                      Area                    Requirement / Initial
                                                  target
  ----------------------- ----------------------- -----------------------
  NFR 01                  Availability            99.5% baseline
                                                  excluding approved
                                                  maintenance

  NFR 02                  Performance             P95 API under 500 ms
                                                  excluding external
                                                  calls

  NFR 03                  Booking                 Zero negative inventory
                                                  outside approved limit

  NFR 04                  Scalability             Support initial 80-room
                                                  property and moderate
                                                  seasonal peaks without
                                                  redesign

  NFR 05                  Recovery                Initial RPO 15 minutes,
                                                  RTO 4 hours, subject to
                                                  approval

  NFR 06                  Security                OWASP-aligned
                                                  verification and no
                                                  open critical finding

  NFR 07                  Accessibility           Public website should
                                                  meet applicable WCAG
                                                  2.2 AA criteria

  NFR 08                  Observability           Structured logs,
                                                  metrics, traces and
                                                  actionable alerts

  NFR 09                  Maintainability         Explicit module
                                                  ownership, test seams
                                                  and versioned contracts

  NFR 10                  Compatibility           Approved desktop/tablet
                                                  browser and printer
                                                  matrix

  NFR 11                  Localization            Property timezone and
                                                  configurable
                                                  date/number/currency
                                                  display

  NFR 12                  Privacy                 Data inventory,
                                                  protection, retention
                                                  and access review
  -----------------------------------------------------------------------

## Engineering quality

-   Nullable reference types
-   Analyzers
-   Formatting
-   Warnings treated as errors for owned code
-   Business-module/application-use-case organization
-   Thin controllers
-   Tested domain/application rules
-   Database constraints for concurrency-sensitive invariants
-   Unit, integration, contract and end-to-end testing
-   PRs reference requirements, tests, migrations, security and
    operational notes
-   Reviewed and forward-compatible migrations where required
-   Feature flags cannot bypass authorization or reconciliation

## Observability

Critical flows must correlate browser/integration -\> API -\> background
job -\> database operation.
