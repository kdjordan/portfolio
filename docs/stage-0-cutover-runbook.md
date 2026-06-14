# Stage 0 — Cutover Runbook (Amplify → Hetzner/Coolify)

Like-for-like host migration. No receptionist features. Goal: identical public
output, zero SEO/traffic regression. Keep Amplify warm ~48h as one-click rollback.

Code changes (done, on branch `migrate-to-hetzner-node-ssr`):
- `nuxt.config.ts`: nitro preset `static` → `node-server`; `routeRules` prerender
  `/` and `/blog/**`; `/work` 301 and `@nuxtjs/sitemap` preserved.
- `Dockerfile` (multi-stage, Node 22.14.0, runs `node .output/server/index.mjs`)
  + `.dockerignore`.

Verified locally via `docker build` + `docker run`: all routes 200, `/work` → 301
`/#work`, sitemap/robots/canonical byte-identical to live prod.

---

## Phase A — Get the branch buildable by Coolify

1. Push the branch (does **not** deploy prod — auto-deploy is `main`-only, DNS still
   points at Amplify):
   ```
   git push -u origin migrate-to-hetzner-node-ssr
   ```
2. Do **not** merge to `main` yet. Coolify will build from this branch for staging.

---

## Phase B — Create the Coolify resource (existing Hetzner box)

Target host: **`telcoos-prod`** = `178.156.251.139` (Coolify dashboard on `:8000`).
Verified state: Docker 27 + healthy Coolify stack (Traefik v3.6 proxy on 80/443),
~5.8 GiB RAM free, ~48 GB disk free. It is a **shared production box** also running
the telcoos/swytchai apps — the portfolio gets its **own** resource, domain, and
volume; do not modify the other apps. Traefik routes by hostname, so there is no
80/443 conflict.

In the Coolify dashboard (`http://178.156.251.139:8000/`):

1. **New Resource → Application → Public/Private GitHub repository.**
   - If not already connected, add the GitHub App / source for `kdjordan/portfolio`.
2. **Repository:** `kdjordan/portfolio`. **Branch:** `migrate-to-hetzner-node-ssr`
   (switch to `main` after cutover — see Phase F).
3. **Build Pack:** `Dockerfile` (not Nixpacks). Coolify auto-detects the root
   `Dockerfile`.
4. **Port:** `3000` (the container's `EXPOSE`/`NITRO_PORT`). Set the "Ports Exposes"
   field to `3000`.
5. **Health check (recommended):** path `/`, port `3000`, expected `200`.
6. **Auto-deploy:** turn ON "Auto Deploy" — but while it's pointed at the feature
   branch this only redeploys on pushes to that branch. (After Phase F it watches
   `main`.) Coolify registers a GitHub webhook for you.
7. **Persistent volume (provision now, used in Stage 1 for sqlite):**
   - Storage → add a **Volume Mount**. Name e.g. `portfolio-data`, mount path
     `/app/data`. Nothing writes to it yet; this just reserves it so the DB survives
     redeploys later.
8. **Staging domain:** assign a temporary hostname so you can test before touching
   the real DNS. Two options:
   - Coolify's built-in wildcard (`<app>.<your-coolify-domain>`), **or**
   - a subdomain you control, e.g. `staging.kevinjordan.dev` (add an A record for it
     in Cloudflare, **grey cloud / DNS-only** for now). The apex `kevinjordan.dev`
     stays on Amplify.
9. **Deploy.** Watch the build logs: `npm ci` → `nuxt build` (you should see it
   prerender `/`, `/blog`, and each post) → image runs `node .output/server/index.mjs`.

---

## Phase C — Test on the staging hostname (origin reachable, not yet canonical)

Replace `STAGING` with your staging host (include scheme). The `Host` header trick
forces the app to behave as if it were the real domain even before DNS flips.

```
STAGING=https://staging.kevinjordan.dev

# Routes
for p in / /blog /blog/the-20-hour-weekend-build /sitemap.xml /robots.txt; do
  curl -s -o /dev/null -w "%{http_code}  $p\n" "$STAGING$p"
done

# /work 301 (expect 301 -> .../#work)
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$STAGING/work"

# robots identical to prod
diff <(curl -s "$STAGING/robots.txt") <(curl -s https://kevinjordan.dev/robots.txt) \
  && echo "robots IDENTICAL"

# sitemap loc list identical to prod
diff \
  <(curl -s "$STAGING/sitemap.xml"        | grep -oiE '<loc>[^<]*</loc>') \
  <(curl -s https://kevinjordan.dev/sitemap.xml | grep -oiE '<loc>[^<]*</loc>') \
  && echo "sitemap URLS IDENTICAL"

# homepage SEO tags identical to prod
diff \
  <(curl -s "$STAGING/" | grep -oiE '<title>[^<]*</title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<meta property="og:[^>]*>' | sort) \
  <(curl -s https://kevinjordan.dev/ | grep -oiE '<title>[^<]*</title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<meta property="og:[^>]*>' | sort) \
  && echo "homepage SEO tags IDENTICAL"
```

Known/accepted diff: `/blog` returns **200** here vs **301 → /blog/** on Amplify.
This is SEO-neutral — sitemap + canonical tags (unchanged) declare the non-slash
form, and `/blog/` still returns 200, so nothing 404s. (Decision: leave as-is.)

Also eyeball in a browser: homepage GSAP animations run, blog renders, nav works.

---

## Phase D — TLS BEFORE going proxied (avoid the HTTP-01 trap)

The order matters. If you flip Cloudflare to **proxied + Full(strict)** before the
origin has a valid cert, Let's Encrypt's HTTP-01 challenge can't reach the origin and
issuance fails / the site breaks.

1. In Coolify, set the application's domain to the **real** host `kevinjordan.dev`
   (and `www` if you serve it). Enable "Generate SSL / Let's Encrypt".
2. Ensure the cert issues while the origin is reachable over plain HTTP:
   - **Option 1 (grey cloud):** in Cloudflare, set the record you'll cut over to
     **DNS-only (grey)** temporarily so HTTP-01 reaches the origin directly, let
     Coolify issue, then re-enable proxy. *Caveat: grey-clouding the live apex
     briefly exposes the origin IP and serves un-proxied — prefer Option 2 for the
     live record.*
   - **Option 2 (DNS-01, preferred for the live apex):** issue via a DNS-01
     challenge (no inbound HTTP needed), or simply validate the cert on the
     **staging** hostname first (grey cloud is fine there since it's not live).
3. Confirm a valid cert on the origin:
   ```
   curl -sI https://kevinjordan.dev/ --resolve kevinjordan.dev:443:178.156.251.139 \
     | head -5
   ```
   (Uses `--resolve` to hit the origin directly without changing DNS. Expect 200 and
   a valid TLS handshake — no cert error.)

---

## Phase E — Cloudflare cutover (the outward-facing, confirm-first step)

⚠️ This is the DNS flip. **Do not run until Phases C and D pass and you've explicitly
approved it.** Propagation is effectively instant because Cloudflare's edge IP doesn't
change — only the origin Cloudflare proxies to.

1. Cloudflare → **SSL/TLS → Overview**: set mode to **Full (strict)** (origin now has
   a valid LE cert from Phase D).
2. Cloudflare → **DNS**: edit the apex `kevinjordan.dev` record (and `www`):
   - Point it at the **Hetzner origin IP `178.156.251.139`** (A record) — replacing
     the Amplify target.
   - **Proxy status: Proxied (orange cloud).**
   - Repeat the change on the staging record cleanup later.
3. Within a minute, re-run the **Phase C diff block** against
   `https://kevinjordan.dev` (the real domain now). All checks should still pass.
4. Browser smoke test on the real domain: homepage, a blog post, `/work` → `/#work`.

---

## Phase F — Make `main` the deploy branch

Once the real domain serves correctly from Hetzner:

1. Merge the branch:
   ```
   gh pr create --base main --head migrate-to-hetzner-node-ssr \
     --title "Migrate hosting: Amplify SSG -> Hetzner Node SSR" --fill
   # review, then merge
   ```
2. In Coolify, switch the application's **Branch** to `main` so auto-deploy watches
   production pushes going forward. (The currently-running image is unchanged by this;
   the next push to `main` rebuilds.)

---

## Phase G — Verify & monitor (before declaring done)

- [ ] Homepage + all blog posts render (HTML + animations).
- [ ] `/work` and `/work/` → 301 `/#work`.
- [ ] `/sitemap.xml`, `/robots.txt` served and identical to pre-migration.
- [ ] Canonical tags unchanged (non-slash form).
- [ ] Core Web Vitals stable (PageSpeed Insights on `/` and a post).
- [ ] **Google Search Console:** Coverage/Pages shows no new crawl errors; URL
      Inspection on `/` and a post returns "URL is on Google" / live test 200.
- [ ] Traffic steady in analytics for a few days.

## Phase H — Decommission rollback (after ~48h clean)

- Keep Amplify running ~48h. **Rollback = repoint the Cloudflare apex A record back to
  the Amplify target** (one edit, instant).
- After 48h of clean metrics, delete/disable the Amplify app.

---

### Rollback (any time within the window)
Restore the pre-cutover Cloudflare DNS (captured 2026-06-13), all **Proxied (orange)**:

- `kevinjordan.dev` — **A** records (Amplify/CloudFront), all proxied:
  - `3.165.160.86`
  - `3.165.160.63`
  - `3.165.160.15`
  - `3.165.160.58`
- `www.kevinjordan.dev` — **CNAME** → `du69ldtwd665p.cloudfront.net`, proxied

Leave the MX (`route1/2/3.mx.cloudflare.net`) and TXT (DKIM `cf2024-1._domainkey`,
SPF `v=spf1 include:_spf.mx.cloudflare.net ~all`, `google-site-verification=...`)
records untouched throughout — they are email/verification, unrelated to hosting.

Rollback = re-create the four apex A records above + the www CNAME, set Proxied. No
rebuild on the origin needed; Amplify stays warm ~48h.

---

## Coolify gotchas (learned during Stage 1 deploy, 2026-06-14)

- **Env values containing `$` get interpolated and corrupted.** Coolify expands
  `$WORD` / `${WORD}` references inside env values by default. An argon2 hash
  (`$argon2id$v=19$m=65536,...`) is silently mangled on injection — the Normal-view
  editor shows the raw text, but the running container receives a broken value, so
  `argon2.verify()` throws and login returns **500** (not 401). Fix: enable
  **Is Literal?** on that variable (or escape every `$` as `$$`, Literal off — not
  both). Confirm the *runtime* value in the **Terminal** tab:
  `printf '%s' "$RECEPTIONIST_ADMIN_PASSWORD_HASH" | head -c 20` → must print
  `$argon2id$v=19$m=6`.
- **Env changes require a redeploy.** Saving in the editor updates the stored value
  only; the live container keeps the old value until you **Redeploy**/Restart.
- **`docker run -e` does NOT reproduce this.** The `$`-eating happens in Coolify's
  env layer, not Docker — so a secret-bearing env that passes a local Docker test can
  still break in Coolify. Verify secrets in Coolify (Terminal tab), not just locally.
- **Auto-deploy is a manual GitHub webhook** (source = Public GitHub, no GitHub App):
  GitHub repo hook → `http://178.156.251.139:8000/webhooks/source/github/events/manual`
  with a shared HMAC secret on `push`. Both sides must hold the same secret.
