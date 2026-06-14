# Build Plan — Hetzner migration + Local AI Receptionist

Decision-annotated execution plan. Architecture rationale lives in `docs/adr/`; domain language in `CONTEXT.md`. The original product roadmap (phases, cost model, business decisions) is the source of truth for *what* and *why*; this file records the *how*, resolved.

Build order is fixed: **migrate like-for-like first, verify, then layer features.** (Protects live traffic during an active job search.)

---

## Stage 0 — Migration: Amplify → Hetzner (do first, in isolation)

Goal: identical public site, new host, zero SEO/traffic regression. No receptionist code in this stage.

- **Convert to SSR.** `nuxt.config.ts`: `nitro.preset: 'static'` → `'node-server'`. Keep `/`, `/blog/*` prerendered via `routeRules` (e.g. `{ '/': { prerender: true }, '/blog/**': { prerender: true } }`) so crawlable HTML is byte-equivalent to today. Keep the existing `/work` 301 routeRules and `@nuxtjs/sitemap`. → ADR-0001
- **Dockerfile** (multi-stage, pinned Node). `npm ci` (compiles `better-sqlite3` in the same image it runs in), `nuxt build`, run `node .output/server/index.mjs`. Avoids native-module ABI drift.
- **Coolify resource** on the existing Hetzner box. Connect GitHub repo, build from Dockerfile, **auto-deploy on push to `main`** (webhook). Persistent volume mounted for the sqlite file (even though the DB arrives in Stage 1, provision the volume now).
- **TLS:** issue Let's Encrypt cert via Coolify *before* flipping Cloudflare to proxied — issue while DNS-only (grey cloud) or via DNS-01, then turn the orange cloud back on at **Full (strict)**. Avoids the HTTP-01-can't-reach-origin trap.
- **Cutover (Cloudflare):** test on a staging hostname/IP first; diff prerendered HTML, all routes, the `/work` redirect, sitemap, robots. Then flip the origin record. Propagation is instant (edge IP unchanged). **Keep Amplify warm ~48h** as one-click rollback.
- **Verify before declaring done:** homepage + blog render, redirects intact, sitemap served, Core Web Vitals stable, Search Console shows no crawl errors, traffic steady for a few days.

**Status (2026-06-14): DONE, baking.** Live on Hetzner/Coolify via Cloudflare, output byte-equivalent to Amplify. PR #23 (`migrate-to-hetzner-node-ssr`) **merged**; Coolify now **auto-deploys from `main`**. Cloudflare SSL at **Full (strict)**. Amplify kept warm ~48h as rollback.
- **Host:** Coolify app `kj-portfolio` (uuid `h4ow80os4scco4k0osscw44w`) on the box **`telcoos-prod` = 178.156.251.139** (Traefik on 80/443, hostname routing). The candidate box `sip-reasoner` (5.161.237.218) was **deliberately rejected** — it's a live FreeSWITCH telecom edge (nginx + certbot certs for sip/demo.telcoos.io, no Docker); Coolify there would have broken its certs/SIP firewall.
- **Persistent volume:** **mounted and writable at `/app/data`** (Coolify UI). Ready for the Stage 1 sqlite DB — no longer a blocker.
- **Runbook:** `docs/stage-0-cutover-runbook.md` (incl. rollback DNS values).

Outstanding before the gate fully clears: **only the ~48h bake/monitoring** — Search Console clean + traffic/CWV steady. (Cloudflare Full (strict), PR #23 merge, Coolify push-to-deploy from `main`, and the `/app/data` volume are all done.)

Exit: kevinjordan.dev served from Hetzner, output indistinguishable from the Amplify version, rankings/traffic unchanged.

---

## Stage 1 — Lead engine (Phase 1: Console MVP)

The reusable asset. All new surface lives behind `/admin`; nothing changes the public site.

- **Console auth:** in-app password + sealed httpOnly session cookie (`nuxt-auth-utils`, or ~30 lines hand-rolled with H3 cookie helpers + a secret). Server middleware guards `/admin` + `/api/admin/*`. ⚠️ `nuxt-auth-utils` is a new dep → run the install age-gate/GuardDog review first.
- **DB:** `better-sqlite3` on the Coolify volume (**mounted and writable at `/app/data`** as of Stage 0). Thin data-access layer so a later Postgres swap (multi-tenant) is contained.
- **Lead source:** Google Places API (Text/Nearby Search → Place Details). Free at pilot volume (~5k Pro / 10k Essentials free calls/mo; a batch is hundreds). Store `place_id` permanently + our derived fields; re-fetch details on demand (Google's ToS limits caching most fields >30 days; `place_id` exempt).
- **Site scoring:** `no_site` straight from Places (no `website` field) — the strongest signal. For Businesses *with* a site, PageSpeed Insights API (free) → `bad_site`.
- **Pipeline board:** stages sourced → scored → hook_sent → replied → consult → live → churned.
- **Data model (minimal):**
  - `businesses` (place_id, name, phone, website, rating, reviews_count, has_site, site_score, contact_email, address, ...)
  - `leads` (business_id, stage, owner_notes, timestamps)

Exit: pull ~50 Businesses for one vertical+geo, see who's missing/weak online, track them on the board.

---

## Stage 2 — The hook (Phase 2: gen + outreach)

- **Vanity pages** at `/demo/{slug}`: Claude generates **full bespoke HTML+CSS+JS (incl. GSAP) per Business** from Places data (grounded in their real reviews/services/gap). **Human review/publish gate** in the Console — never auto-publish. The bespoke doc renders inside a thin Nuxt shell via `<iframe sandbox="allow-scripts">` (NO `allow-same-origin`) → unique opaque origin: animations run, but the page can't reach `kevinjordan.dev` cookies/session/API or the parent. Defense in depth: sanitize at generation, per-frame CSP (`script-src` = self + GSAP source), `noindex`, sitemap-excluded, `robots.txt Disallow: /demo/`. ⚠️ never combine `allow-scripts` + `allow-same-origin` on untrusted frame content. → ADR-0002
- **Contact email enrichment:** fetch each Business's *own* website, parse a public `mailto:`/contact email. No gray-area provider.
- **Outreach (cold email):** separate domain on **Google Workspace** (~$7/mo), send via Gmail API from the Console. Set **SPF/DKIM/DMARC** before first send; **ramp gently** (a few personalized sends/day). CAN-SPAM: physical address + opt-out + honest subject baked into templates. US B2B only (no Canada — opt-in regime).
- **Engagement signal:** first-party — log the `/demo/{slug}` hit when the recipient clicks the emailed link. No open-pixel/ESP tracking.
- **Data model add:**
  - `pages` (business_id, slug, html, status: draft|published, published_at)
  - `outreach` (business_id, sent_at, status, replied, last_demo_view_at)

Exit: send a small batch, vanity pages live, replies in your inbox, demo-views logged in the Console.

---

## Stage 3 — The product (Phase 3: voice agent, configured not trained)

Separate Python service; lighter-specced here (pilots = market research, per roadmap).

- **Voice core:** Pipecat + Deepgram (STT) + Cartesia (TTS) + Claude, its own container. Note: a live **FreeSWITCH telecom edge already runs on the `sip-reasoner` box (5.161.237.218)** serving sip/demo.telcoos.io — the SIP/DID path likely lives near it, not on the portfolio's `telcoos-prod` box. Decide placement when building this stage.
- **Dedicated number** per Client via wholesale rails — never their main line; their line forwards to it, reversibly, on their terms.
- **Config = knowledge base + system prompt + tools** (NOT fine-tuning). Per-vertical template. Tools: book appointment / schedule bid / check calendar → Cal.com / GHL / their system, with tightly scoped creds.
- **🔒 GATE:** offsite DB backup (Litestream or nightly→R2) becomes **mandatory before this stage ships** — call records + scoped client creds are not re-pullable. (Volume-only is acceptable only through Stages 1–2.)
- **Data model add:**
  - `clients` (business_id, did, config_template, calendar_creds_scoped, status)
  - `calls` (client_id, ts, duration, outcome, booked)

Exit: pilot #1 answering real calls, booking into their calendar.

---

## Stage 4 — Prove + harden (Phase 4)

- Attribution view in Console: calls captured / booked / est. recovered revenue (the retainer justification).
- Tune from real transcripts → push back into the vertical template. Land pilot #2.
- Only after 2 paying clients: decide multi-tenant.

## Stage 5 — Generalize (Phase 5, conditional on traction)

- Multi-tenant (→ Postgres), per-client usage caps + billing, self-serve config, more verticals. Don't build on spec.

---

## Open items to confirm before the stage that needs them

- **Business decisions (roadmap Phase 0, not code):** pick ONE vertical + metro; lock setup fee + retainer; buy the cold-email domain. Needed before Stage 2.
- **Verify current Google Places free-tier SKU mapping** against actual usage before relying on "free" (confirmed ballpark; confirm exact SKUs for the calls we make).
- **`nuxt-auth-utils` install review** (age-gate + GuardDog) before Stage 1.
