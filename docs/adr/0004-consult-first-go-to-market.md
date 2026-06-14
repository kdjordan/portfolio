# Consult-first go-to-market; receptionist demand-gated

## Status

Accepted (2026-06-14). Supersedes the implied sequencing in `docs/receptionist-build-plan.md` where the Voice agent (Stage 3) was the first sellable product.

## Context

The original roadmap led with the Local AI Receptionist (a configured voice agent on a Dedicated number) as the thing we sell. That product is the most expensive and slowest part of the plan: a separate Python service, telephony over wholesale rails, scoped per-Client credentials, and a mandatory offsite-backup gate before it can ship. Gating the first dollar of revenue on building all of that is backwards during an active job search.

The earlier funnel work we already planned — find Businesses with no/weak site (1B/1C), generate a bespoke Vanity page (Stage 2), cold-email it (Stage 2) — produces a warm, qualified conversation well before any voice agent exists. The pipeline already carries a `consult` stage (`sourced → scored → hook_sent → replied → consult → live → churned`), so the consult was always a designed step.

## Decision

**Lead with a paid consult, not the receptionist.**

The funnel:

```
find bad/no site → auto-generate a better Vanity page → cold outreach
  → $100 / 30-min consult  ← the conversion we sell first
      ├─ (a) recommend third-party AI tools they can self-serve  → we walk away clean, trusted
      └─ (b) the gap needs a custom build → upsell a retainer/integration  ← the real revenue
```

- The **$100 consult is the wedge**: a low-friction yes, a qualifying filter (separates serious Businesses from tyre-kickers), and market research that teaches each vertical's real pain.
- The **custom-integration retainer (fork b) is the asset.** The consult must always fork toward (a) or (b); it is not open-ended free advice.
- The **Local AI Receptionist is demand-gated**: built only when a consult produces a paying Client (fork b) who wants it. It remains a possible upsell outcome, not the gate on getting started. This is consistent with the existing plan's framing of pilots as market research and the offsite-backup gate on Stage 3.

## Consequences

- Stages 1 (lead engine) and 2 (Vanity pages + outreach) are unchanged in scope; only the conversion they aim at changes.
- The pipeline board reinterprets existing stages: `consult` = booked/paid the $100, `live` = a retained paying Client (any service, receptionist or not).
- Domain language updated: **Client** = "a Lead that converted to paying," with the deployed voice agent as one possible outcome rather than the definition. See `CONTEXT.md`.
- Stage 3 (Voice agent) and its mandatory offsite-backup gate are deferred until a paying custom-integration Client justifies them. No Stage 3 build on spec.
- The Console banner drops the too-narrow "Local AI Receptionist" framing in favor of the neutral internal "Lead Engine."
