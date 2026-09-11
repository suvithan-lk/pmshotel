# Identity, RBAC, Approval and Audit

## User groups

-   Hotel owner
-   General manager
-   Reservations manager
-   Reservation staff
-   Front office manager
-   Front desk agent
-   Housekeeping manager
-   Housekeeper
-   Maintenance manager
-   Restaurant manager
-   Cashier/server
-   Kitchen staff
-   Finance staff
-   Sales/marketing
-   System administrator
-   Auditor

## Stakeholder goals and typical scope

| User group | Primary goals | Typical scope |
|---|---|---|
| Hotel owner | Performance, control, investment return, reputation | All hotel summaries and approved executive actions |
| General manager | Daily operation, exceptions, staffing, policy | Property-wide operational oversight |
| Reservations manager | Demand, quotes, bookings, source quality, changes | Reservation and rate permissions |
| Reservation staff | Create/manage permitted bookings | Assigned property and rate access |
| Front office manager | Arrivals, stays, folios, cashiers, night audit | Front office and approved finance actions |
| Front desk agent | Check-in, requests, posting, checkout | Assigned shift and cashier |
| Housekeeping manager | Workload, priority, inspection, productivity | Housekeeping teams and floors |
| Housekeeper | Assigned room tasks, defect reporting | Own assigned tasks only |
| Maintenance manager | Assets, incidents, work orders, room blocks | Maintenance team and room impact |
| Restaurant manager | Menu, outlets, shifts, void approvals, sales | Assigned outlets |
| Cashier/server | Orders, KOT, tenders, close | Assigned outlet and shift |
| Kitchen staff | KOT acceptance, preparation, ready status | Assigned production station |
| Finance staff | Payments, invoices, reconciliation, taxes, exports | Finance functions and reports |
| Sales and marketing | Website, offers, source attribution, CRM | Content and approved customer engagement |
| System administrator | Technical configuration, access administration | Platform configuration without business self-approval |
| Auditor | Read-only evidence, event history, reconciliations | Explicit approved audit scope |

## Permission matrix (capability x role)

| Capability | Agent | Department manager | Finance | General manager | Administrator |
|---|---|---|---|---|---|
| View assigned operational records | Allowed | Allowed | Scoped | Allowed | Technical only |
| Create normal booking/order | Allowed by role | Allowed | Read-only normally | Allowed | Not by default |
| Discount within limit | Assigned limit | Higher limit | Review | Highest business limit | Not by default |
| Void/reverse/refund | Request or limited | Approve within limit | Approve and reconcile | Exceptional approval | Not by default |
| Change rates or restrictions | Reservations scope | Approve | Review | Approve policy | Not by default |
| Override room readiness | No | With reason | No | With reason | No |
| Manage users and roles | No | Request | No | Approve role policy | Execute approved change |
| Export sensitive data | No by default | Scoped | Scoped | Approved | Technical export only |
| View audit | Own or limited | Department | Financial events | Property-wide | Security administration |

Note: the UI may hide unavailable actions, but only the API
authorization decision is authoritative.

## Authorization principles

-   Authenticate staff through approved secure identity methods.
-   Support forced session revocation.
-   Authorize every command using named permissions.
-   Permissions are scoped by property, outlet, department, shift,
    ownership and approval limit where applicable.
-   Roles are templates composed of permissions and scopes.
-   API authorization is authoritative; UI visibility is not a security
    boundary.
-   High-risk actions require step-up confirmation and a reason.
-   Maker-checker workflows prevent self-approval.
-   Administrators cannot erase audit or posted financial history
    through the application.
-   Sensitive exports require explicit permission and create audit
    events.

## Example stable permissions

-   `reservations.create`
-   `folios.reverse`
-   `pos.void`
-   `rooms.override_readiness`
-   `reports.export_sensitive`
-   `users.assign_role`

## Audit minimum

Every security/business audit event should capture: - Globally unique
event ID and timestamp - Actor/service identity - Effective role and
delegated context - Property/outlet/department/shift/business date where
relevant - Stable action name - Entity type and identity - Safe
before/after summary or linked business event - Reason for
override/approval/reversal/void/refund/export - Correlation and trace
context - Client/integration message identity - Outcome and safe error
category

## Approval

Discounts, voids, reversals, refunds, readiness overrides, role changes
and sensitive exports follow configured permissions and approval
thresholds.
