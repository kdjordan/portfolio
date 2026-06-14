# kevinjordan.dev

Personal site (portfolio + blog) that doubles as the home of the **Local AI Receptionist** product: a console for finding local trades, scoring their online gap, pitching them, and deploying a configured voice agent on a dedicated phone number over wholesale telecom rails. The public site is the hook; the voice agent is the product.

## Language

**Business**:
A real-world local trade company as it exists in the world / in Google Places — name, services, reviews, phone, maybe a website. A Business exists independently of whether we are pursuing it.
_Avoid_: prospect, company, account

**Lead**:
A Business we are actively pursuing through the outreach pipeline. Carries a pipeline `stage` (sourced → scored → hook_sent → replied → consult → live → churned). A Business becomes a Lead the moment we start working it.
_Avoid_: prospect, opportunity

**Client**:
A Lead that converted and now has a deployed voice agent on a dedicated phone number. Carries billing and a config.
_Avoid_: customer, account, tenant

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
