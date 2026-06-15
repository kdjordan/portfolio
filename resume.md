# Resume — Local Lead Engine (conductor handoff)

**Updated:** 2026-06-15
**Repo:** `/Users/indiedev/Desktop/code-projects/portfolio` (GitHub `kdjordan/portfolio`, public). **Deploy branch:** `main`.
**Live:** https://kevinjordan.dev (public site) · https://kevinjordan.dev/admin (Console, login-gated)
**For:** the next conductor chat picking up **Stage 2** (vanity-page hook + embedded AI chat).

---

## TL;DR

Stage 0 (Hetzner/Coolify migration) and **Stage 1 (the lead engine Console) are built, deployed, and verified live.** The Console works end-to-end: save a territory → ingest businesses from Google Places → score their sites → view/click-through → promote to Leads on a pipeline board. **Stage 2 (the bespoke "vanity page" hook + an embedded AI chat demo) is NOT built — that's the next job, and there's an open scoping decision (below).**

`main` HEAD ≈ `92b1019`. Push to `main` auto-deploys via a GitHub→Coolify webhook.

## Read these first (source of truth — don't re-derive)
- `CONTEXT.md` — domain language (Business, Lead, Client, **Consult**, Console, Vanity page, Territory)
- `docs/receptionist-build-plan.md` — the staged plan, resolved decisions
- `docs/adr/0004-consult-first-go-to-market.md` — **the go-to-market this is built toward**
- `docs/adr/0002-vanity-pages-bespoke-ai-html-sandboxed-iframe.md` — **Stage 2 security model (read before building)**
- `docs/adr/0001…` (single Nuxt SSR app), `0003…` (sqlite + auth spine)
- `docs/stage-0-cutover-runbook.md` — Coolify/Cloudflare/rollback + gotchas
- Auto-memory: `google-api-keys`, `hosting-stage0` (in the project memory dir)

## Business model — consult-first (ADR-0004)
The lead engine feeds a **paid $100 / 30-min consult**, not a voice-agent sale. The consult forks: recommend self-serve third-party AI tools, **or** upsell a custom build/retainer. The "AI Receptionist" (Stage 3) is **demand-gated** — built only against a paying custom-build Client.

**Value ladder Kevin sketched (working idea, not locked):**
- Rung 1 — site only — $200 one-time
- Rung 2 — site + consult (3rd-party solutions roadmap) — $100 + $100
- Rung 3 — execute the 3rd-party roadmap — $500 one-time
- Rung 4 — custom build + ongoing monitoring — $1,250 basic / $2,500 pro / mo ← the recurring asset

Agreed conditions on the ladder: **raise prices on a trigger** (Kevin's rule: "~5 consults/week booked → raise"), **the offer must grow with the price** (a $500 chat needs a deliverable, not just talk), and **credit the consult toward the build**. The real metric is consult→build conversion, not consult price. Rung 4 is where a reusable per-vertical product emerges from patterns seen across many businesses.

## What's built & live (Stage 1)

**Console (`/admin`, login-gated, single operator):**
- **Layout:** `layouts/admin.vue` — persistent left-nav dashboard (Overview · Territories · Businesses · Pipeline), active state, logout. Extends the site's **paper-and-ink** design system (warm `#f1ede3` + dot-grid, ink `#1a1814`, single signal-red `#c5482a`, IBM Plex Condensed/Mono/Serif). No dark mode. **Match this system — do not invent a new aesthetic.**
- **Pages:** `index.vue` (Overview + live counts), `territories.vue` (CRUD + Run ingest), `businesses.vue` (sourced businesses, sorted weakest-online-first, "Score sites" loop, per-row Promote, name links out to the site in a new tab), `pipeline.vue` (read-only 7-stage board), `login.vue`.

**Server (`server/`):**
- `utils/receptionist/`: `db.ts` (connection + numbered migrations + `getSchemaStatus`), `config.ts` (env), `auth.ts` (argon2), `session.ts` (HMAC cookie), `businesses.ts`, `leads.ts`, `scoring.ts`, `territories.ts` (per-domain repos — split so parallel worktrees stay disjoint), `places.ts` (Google Places New, Text Search, **http(s)-only website normalization**), `pagespeed.ts` (PageSpeed Insights).
- `api/admin/`: `login/logout/session/health`; `territories/{index.get, index.post, [id].delete}`; `businesses/{index.get → un-promoted businesses w/ scores, ingest.post}`; `score.post` (budgeted loop — see gotcha); `leads/{board.get → {board, candidates}, promote.post}`.
- `middleware/admin-auth.ts` gates `/admin` + `/api/admin/*`.

**Schema (sqlite, `migration(1)` + `migration(2)` in `db.ts`):**
- `businesses(id, place_id UNIQUE, name, phone, website, address, rating, reviews_count, has_site, lat, lng, category, site_score, scored_at, pagespeed_json, …)`
- `leads(id, business_id UNIQUE, stage='sourced', owner_notes, …)`
- `territories(id, vertical, metro, last_run_at, UNIQUE(vertical, metro))`
- `schema_migrations`
- Conventions: `no_site` = `has_site = 0` (never stored); `bad_site` = `site_score < 50` (read-time threshold, never stored); a scored row has `scored_at` set (a hard PageSpeed failure stamps `scored_at` with `site_score` NULL).

**Live data right now:** one territory (`roofers / Eugene OR`, id 1), ~20 businesses ingested + scored, **1 promoted to a Lead** (Kevin did this). Most roofers are `no_site` — those are the strongest leads.

## Infra & deploy
- Coolify app `kj-portfolio` (uuid `h4ow80os4scco4k0osscw44w`) on box `telcoos-prod` = `178.156.251.139`. Dockerfile build, runs `node .output/server/index.mjs` on port 3000, Traefik 80/443, Cloudflare Full (strict). Shared box — don't touch other apps.
- **Auto-deploy:** push to `main` → GitHub→Coolify webhook → build+deploy. Manual Redeploy is the fallback.
- DB on a Coolify volume at `/app/data/receptionist.sqlite`. ⚠️ **No offsite backup yet** — fine through Stages 1–2; mandatory before Stage 3 (call records/creds).
- **Env in Coolify:** `RECEPTIONIST_*` (db path, admin user, argon2 hash, session secret), `GOOGLE_PLACES_API_KEY`, `GOOGLE_PAGESPEED_API_KEY`. Stage 2 will add `ANTHROPIC_API_KEY`.

**Google Cloud:** project `kj-ai-leads`, two IP-locked keys (Places New + PageSpeed) restricted to box IP. Places **Text Search Enterprise SKU = $35/1k requests, first 1,000/mo free** → effectively free at pilot volume (ingest is per-request, ≤20 businesses/request, no pagination). PageSpeed is free. See memory `google-api-keys`.

## Workflow conventions (follow these)
- **Branch off `main`, PR, squash-merge** (Kevin merges, or merges pre-approved). Pushes deploy automatically.
- **Per-PR gate:** `npm run build` **and** `node scripts/verify-receptionist-stage-1.mjs` must pass before opening a PR.
- **Parallel work** → separate git worktrees off `main` with **disjoint file ownership** (PR-A pattern). No two worktrees touch the same file.
- **No `npm install`** without a GuardDog scan + explicit per-package approval (global install gates). Stage 1 needed none — Google APIs are plain `fetch`.
- **Surgical changes**, match existing style, thin data-access layer (later Postgres swap for multi-tenant).
- An **automated security review** runs on pushed commits — expect findings, address or acknowledge them (it already caught an `:href` XSS, now fixed).

## ⚠️ Gotchas
- **PageSpeed is slow** (~10–30s/URL). `score.post.ts` works a **60s wall-clock budget** then returns `{ scored, failed, remaining }`; callers loop until `remaining: 0`. Scoring the whole batch in one request → Cloudflare **524** (this happened; fixed in #29).
- **Coolify env values with `$`** get mangled (interpolation) — use "Is Literal?" or `$$`. Google/Anthropic keys are alphanumeric, so unaffected.
- **Coolify env changes need a Redeploy** to take effect.
- Local untracked junk: `*' 2'.*` duplicate files under `~/Desktop` sync — ignore/clean, not real.

---

## NEXT: Stage 2 — the hook (vanity page + AI chat)

**Goal:** from a promoted Lead, generate a bespoke demo site you email as the cold-outreach hook to land the $100 consult.

**Planned flow (ADR-0002):** Console "Generate" on a business → Claude generates **bespoke HTML/CSS/JS** grounded in that business's data (Places + ideally a scrape of their existing site for real services/copy) → stored as a **draft** (`pages` table: `business_id, slug, html, status, published_at`) → **human review/publish gate** in the Console → live at **`/demo/{slug}`** (`noindex`, sitemap-excluded, robots-disallowed, rendered in a **sandboxed iframe**: `allow-scripts`, **NO `allow-same-origin`**, per-frame CSP).

**Kevin's addition — an embedded AI chat** (a text preview of the eventual receptionist, scoped to that business — the bridge from hook to product). **Critical architecture constraint:** the chat calls *our* Claude proxy, so it **cannot live inside the sandboxed iframe** (ADR-0002 forbids the generated doc from reaching our API). It must be a **separate, trusted, first-party widget** in the Nuxt `/demo/{slug}` shell, next to the sandboxed "site":
```
/demo/{slug}  (trusted Nuxt page)
 ├─ <iframe sandbox>  ← generated bespoke "site" (untrusted, locked down)
 └─ <ChatWidget>      ← first-party → /api/demo/{slug}/chat → Claude, business-scoped
```

**New requirements Stage 2 introduces:**
- `ANTHROPIC_API_KEY` in Coolify — **real per-call cost, no free tier** (a deliberate new cost center). Before building the chat, read the **`claude-api` skill** for current model IDs/pricing; default to a cheap fast model (Haiku) for the demo chat.
- **Abuse/cost controls** on the public chat: rate-limit per slug/IP, per-page conversation/token cap, gate behind a "Try it" click (don't burn tokens on page load).
- A **content-gathering step**: scrape the business's existing site for real services/copy so page + chat are grounded.
- Build-plan Stage 2 data model also adds `outreach` (cold email via Gmail API, separate domain, SPF/DKIM/DMARC, CAN-SPAM) — likely a later sub-stage.

## Open decisions (Kevin was clarifying these — ask him)
1. **Stage 2 approach:** (a) *prototype* `/demo/{slug}` first (use the **prototype** skill — one real business, page + chat side by side, validate the wow before building the pipeline) [recommended]; (b) build the static vanity-page pipeline first, chat as fast-follow; (c) build page + chat together.
2. **What the chat actually is:** a demo of "an AI assistant that knows your business" (receptionist-as-text), vs. a lead-capture bot for their site, vs. something else — Kevin was thinking this through.
3. **`ANTHROPIC_API_KEY`:** does Kevin have one, or set one up (console.anthropic.com → key → Coolify → redeploy)?

## Suggested skills for Stage 2
**prototype** (validate the demo experience), **claude-api** (model/pricing/API before building generation + chat — REQUIRED before writing LLM code), **frontend-design** (the `/demo/{slug}` page — match the paper-and-ink system), **code-review** / **verify** before each PR.

## Verify-it-still-works (no secrets)
```
B=https://kevinjordan.dev
curl -s -o /dev/null -w '%{http_code}\n' $B/                  # 200
curl -s -o /dev/null -w '%{http_code}\n' $B/admin/login       # 200
curl -s -o /dev/null -w '%{http_code}\n' $B/admin             # 302
curl -s -o /dev/null -w '%{http_code}\n' $B/api/admin/health  # 401
# then: npm run build && node scripts/verify-receptionist-stage-1.mjs
```
