# kevinjordan.dev

Personal site (portfolio + blog) that doubles as the home of a **lead engine for local trades**: a console for finding local Businesses, scoring their online gap, generating a better web presence as the hook, and selling a paid consult. The first thing we sell is a $100 / 30-min consult; from there we either point them at third-party AI tools or upsell a custom build. A configured voice agent on a Dedicated number (the "AI Receptionist") is one possible custom-build outcome, demand-gated — not the gate on getting started. See `docs/adr/0004-consult-first-go-to-market.md`.

## Language

**Business**:
A real-world local trade company as it exists in the world / in Google Places — name, services, reviews, phone, maybe a website. A Business exists independently of whether we are pursuing it.
_Avoid_: prospect, company, account

**Lead**:
A Business we are actively pursuing through the outreach pipeline. Carries a pipeline `stage` (sourced → scored → hook_sent → replied → consult → live → churned). A Business becomes a Lead the moment we start working it.
_Avoid_: prospect, opportunity

**Client**:
A Lead that converted to paying. Entered via the paid consult and retained for ongoing work — at minimum a custom build/integration, of which a deployed Voice agent on a Dedicated number is one possible outcome (not the definition). Carries billing and a config.
_Avoid_: customer, account, tenant

**Consult**:
The paid $100 / 30-min conversation we sell off the back of the outreach hook — the first conversion in the funnel and the pipeline's `consult` stage. It forks: either we recommend third-party AI tools the Business can self-serve (we walk away clean), or the gap needs a custom build and we upsell a retainer (the path to a Client). It is a qualifying filter, never open-ended free advice.
_Avoid_: discovery call, free consultation

**Vanity page**:
A per-Business demo page at `kevinjordan.dev/demo/{slug}`, generated from that Business's Google Places data, used as the cold-outreach hook. Custom-generated per Business, not a template with the name swapped. Reachable by direct link but `noindex` and excluded from the sitemap — it must never enter the search index or risk the main domain's reputation.
_Avoid_: landing page, demo page, microsite

**Console**:
The single-operator, login-gated admin app at `/admin` where Kevin sources Leads, scores them, generates Vanity pages, runs outreach, and (later) manages Clients.
_Avoid_: dashboard, panel, backend

**Dedicated number**:
The separate phone number (DID) provisioned per Client over wholesale rails that the voice agent answers on. Never the Client's main line — their line forwards to it on their terms, reversibly.
_Avoid_: DID (in prose), line, extension

**Voice agent**:
The configured (not fine-tuned) Pipecat-based agent that answers a Client's Dedicated number. Behavior comes from a knowledge base + system prompt + tools, per-vertical template.
_Avoid_: bot, assistant, model
