# Artificial Intelligence Requirements and Governance

## Candidate use cases

All listed initial AI use cases are Phase 2 unless the release plan
explicitly changes: - Demand and occupancy forecast - Rate
recommendation - Guest message draft - Review/feedback summary -
Housekeeping workload forecast - Maintenance triage - Restaurant demand
and waste insight - Natural-language reporting

Fraud/anomaly cue is Phase 3.

## Human decision model

AI does not execute high-risk business actions autonomously: - Revenue
manager reviews forecast/rate recommendation. - Authorized manager
accepts/edits/rejects rate recommendations. - Staff verifies
guest-message facts, tone, consent and recipient. - Marketing validates
review themes. - Housekeeping manager changes assignments. - Engineer
validates maintenance severity/action. - Restaurant manager approves
production/purchasing change. - Report users verify cited dashboard
measures. - Fraud/anomaly reviewer investigates; system does not accuse.

## Governance rules

-   Deterministic rules remain authoritative for price, availability,
    payment, permissions and accounting.
-   UI must clearly identify AI-generated assistance.
-   Relevant data window should be visible.
-   AI cannot send guest communication or change operational records
    without approved workflow.
-   Prompts, retrieval data, outputs, user decision and resulting
    command must be traceable under retention policy.
-   Evaluation data minimizes personal data.
-   Model provider, data location, terms, retention and subprocessors
    require security/privacy review.
-   Every AI feature needs a disable switch, fallback workflow and
    measurable usefulness target.
