# Single Nuxt SSR app on Hetzner (not a static site + separate API)

The site was a pure static SSG bundle on AWS Amplify (`nitro.preset: 'static'`). The Local AI Receptionist roadmap requires a login-gated `/admin` console, dynamic `/{slug}` vanity pages, an HTTP API, and a database — none of which a static bundle can serve.

**Decision:** Convert the existing Nuxt project to a single Node SSR app (`nitro.preset: 'node-server'`) hosted on Hetzner. Marketing pages (`/`, `/blog/*`) remain prerendered via `routeRules` so SEO and Core Web Vitals are unaffected. The API lives in Nitro server routes (`server/api/*`) using `better-sqlite3` — the roadmap's "Node/Express" requirement, met without a second web app. The Python/Pipecat voice service stays a separate process (it must — different runtime).

**Rejected:** Keeping the marketing site static and standing up a separate Express app for the console/API. It buys hard process isolation but costs two web codebases, a path-routing proxy, and loses the shared Nuxt design system for the vanity pages — and those pages are the product's cold-outreach hook, so they must look first-class.

**Constraint carried forward:** SEO must not regress (active job search, live traffic). DNS is behind Cloudflare (proxied), so the Amplify→Hetzner cutover is a single origin change, instant and reversible; Amplify stays warm ~48h as rollback.

**Implemented 2026-06-13 (PR #23):** "Existing Coolify box" resolved to **`telcoos-prod` (178.156.251.139)**, app `kj-portfolio`. The other candidate, **`sip-reasoner` (5.161.237.218), was explicitly NOT used** — it is a live FreeSWITCH telecom edge (nginx/certbot, no Docker); installing Coolify would have broken its certs and SIP firewall. This explicit "not the SIP box" matters for Stage 3: the voice/DID service likely belongs near that FreeSWITCH edge, not on the portfolio host.
