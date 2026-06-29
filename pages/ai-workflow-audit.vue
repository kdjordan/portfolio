<script setup lang="ts">
definePageMeta({
  layout: false
})

const siteUrl = 'https://kevinjordan.dev'
const pageUrl = `${siteUrl}/ai-workflow-audit`
const pageTitle = 'Free 15-Minute AI Workflow Audit — Kevin Jordan'
const pageDescription = 'Bring one manual workflow your team hates. Kevin Jordan will tell you whether it is a real automation candidate, what to build first, and where the ROI might be.'
const auditMailto = 'mailto:kevin@kevinjordan.dev?subject=Free%2015-minute%20AI%20workflow%20audit&body=Hey%20Kevin%2C%0A%0AI%20have%20a%20workflow%20that%20might%20be%20a%20good%20fit%20for%20automation.%0A%0AWorkflow%3A%0ACurrent%20manual%20process%3A%0AApprox.%20hours%20lost%20per%20week%3A%0AWhat%20a%20win%20would%20look%20like%3A%0A'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: pageUrl,
  twitterCard: 'summary',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription
})

useHead({
  link: [
    { rel: 'canonical', href: pageUrl }
  ]
})
</script>

<template>
  <main class="audit-page">
    <section class="sheet">
      <header class="topstrip">
        <div class="left">
          <NuxtLink class="label label--ink" to="/">KJ — 01</NuxtLink>
          <div class="label">AI WORKFLOW AUDIT / FREE 15 MIN</div>
        </div>
        <nav aria-label="Secondary navigation">
          <NuxtLink class="label" to="/blog">Writing</NuxtLink>
          <NuxtLink class="label" to="/#work">Proof</NuxtLink>
          <NuxtLink class="label active" to="/ai-workflow-audit">Audit</NuxtLink>
        </nav>
      </header>

      <hr>
      <div class="double"></div>

      <section class="hero">
        <div class="identity">
          <div class="label">OFFER</div>
          <div class="mark">15<span class="dash">m</span></div>
          <div class="name">AI Workflow Audit</div>
          <div class="role">Free / bounded / practical</div>

          <div class="vital">
            <div class="label">SEND TO</div>
            <div class="v">kevin@kevinjordan.dev</div>
          </div>

          <div class="vital">
            <div class="label">BEST FIT</div>
            <div class="listing">
              Manual workflows<br>
              Repetitive ops<br>
              Messy inputs<br>
              Clear business pain
            </div>
          </div>
        </div>

        <div class="body">
          <div class="label">ABSTRACT</div>
          <h1 class="headline">
            Bring me one workflow<br>
            your team <em>hates.</em>
          </h1>
          <p class="abstract">
            I will tell you whether it looks like a real automation candidate,
            what I would build first, and where the ROI might be. No slide deck.
            No vague AI transformation talk. One bottleneck and a practical next step.
          </p>
          <div class="ctas">
            <a class="btn btn--primary" :href="auditMailto">
              Start the email <span class="arr">&rarr;</span>
            </a>
            <NuxtLink class="btn" to="/">
              Back to site <span class="arr">&larr;</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="stats" aria-label="Audit scope">
        <div class="stat">
          <div class="label">TIME</div>
          <div class="n">15m</div>
          <div class="sub">fit check</div>
        </div>
        <div class="stat">
          <div class="label">COST</div>
          <div class="n">$0</div>
          <div class="sub">first pass</div>
        </div>
        <div class="stat">
          <div class="label">INPUT</div>
          <div class="n">01</div>
          <div class="sub">painful workflow</div>
        </div>
        <div class="stat">
          <div class="label">OUTPUT</div>
          <div class="n">Y/N</div>
          <div class="sub">worth automating?</div>
        </div>
      </section>

      <section class="section">
        <div class="sechead">
          <div>
            <div class="label">&sect;01 / WHAT TO SEND</div>
            <h2>Make the bottleneck <em>specific.</em></h2>
          </div>
          <div class="meta">EMAIL TEMPLATE INCLUDED</div>
        </div>
        <hr>
        <div class="rows">
          <div class="row">
            <div class="num">01</div>
            <div>
              <div class="h">The workflow</div>
              <div class="d">What your team is doing manually today, in plain English.</div>
            </div>
          </div>
          <div class="row">
            <div class="num">02</div>
            <div>
              <div class="h">The current process</div>
              <div class="d">Files, tools, handoffs, judgment calls, and the parts everyone complains about.</div>
            </div>
          </div>
          <div class="row">
            <div class="num">03</div>
            <div>
              <div class="h">Approximate time lost</div>
              <div class="d">Hours per week, per job, or per customer. Rough estimates are enough to start.</div>
            </div>
          </div>
          <div class="row">
            <div class="num">04</div>
            <div>
              <div class="h">What a win would look like</div>
              <div class="d">Faster turnaround, fewer errors, better reporting, less rework, or a cleaner customer handoff.</div>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div>
          <div class="label">&sect;FIN / CTA</div>
          <div class="cta-h">Start with the <em>email.</em></div>
          <p class="footer-copy">
            The button opens a pre-filled email to kevin@kevinjordan.dev with the right subject and prompts.
          </p>
          <a class="email" :href="auditMailto">
            Send workflow for audit <span class="arr">&nearr;</span>
          </a>
        </div>
      </footer>
    </section>
  </main>
</template>

<style scoped>
.audit-page {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  background-image: radial-gradient(var(--rule) 0.6px, transparent 0.6px);
  background-size: 20px 20px;
}

.sheet {
  max-width: var(--doc-max);
  margin: 0 auto;
  padding: 0 var(--gutter) 64px;
}

a {
  color: inherit;
  text-decoration: none;
}

.label {
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}

.label--ink {
  color: var(--ink);
  font-weight: 600;
}

hr {
  border: 0;
  border-top: 1px solid var(--rule);
  margin: 0;
}

.double {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  height: 5px;
}

.topstrip,
.topstrip .left,
.topstrip nav {
  display: flex;
  align-items: baseline;
  gap: 24px;
}

.topstrip {
  justify-content: space-between;
  padding: 18px 0 14px;
}

.topstrip nav {
  gap: 28px;
}

.topstrip nav a {
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: border-color 150ms, color 150ms;
}

.topstrip nav a:hover {
  border-color: var(--ink);
}

.topstrip nav a.active {
  color: var(--signal);
}

.hero {
  display: grid;
  grid-template-columns: clamp(280px, 25vw, 320px) minmax(0, 1fr);
  padding-top: 36px;
  padding-bottom: 56px;
}

.identity {
  padding-right: 28px;
  border-right: 1px solid var(--rule);
}

.body {
  padding-left: 40px;
}

.mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 64px;
  line-height: 0.9;
  letter-spacing: -0.015em;
  margin-top: 6px;
}

.mark .dash,
.headline em,
.sechead h2 em,
.cta-h em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--signal);
}

.name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
  margin-top: 14px;
}

.role,
.vital .v,
.listing {
  color: var(--muted);
}

.vital {
  margin-top: 22px;
}

.vital .label {
  margin-bottom: 4px;
}

.listing {
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.7;
}

.headline {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(54px, 6.6vw, 88px);
  line-height: 0.95;
  letter-spacing: -0.025em;
  margin: 0;
  text-wrap: balance;
}

.abstract {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.5;
  max-width: 660px;
  margin-top: 28px;
}

.ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--ink);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 500;
  transition: all 150ms;
  cursor: pointer;
  background: transparent;
  color: var(--ink);
  white-space: nowrap;
}

.btn--primary {
  background: var(--signal);
  border-color: var(--signal);
  color: var(--paper);
}

.btn--primary:hover {
  background: var(--ink);
  border-color: var(--ink);
}

.btn:hover {
  background: var(--paper-sunk);
}

.btn .arr {
  color: var(--signal);
}

.btn--primary .arr {
  color: var(--paper);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}

.stat {
  padding: 22px 24px;
  border-right: 1px solid var(--rule);
}

.stat:last-child {
  border-right: 0;
}

.stat .n {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 52px;
  line-height: 1;
  letter-spacing: -0.025em;
  margin-top: 4px;
}

.stat .sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 6px;
}

.section {
  padding-top: 56px;
}

.sechead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: end;
  padding-bottom: 12px;
}

.sechead h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 44px;
  line-height: 0.98;
  letter-spacing: -0.018em;
  margin: 6px 0 0;
  text-wrap: balance;
}

.sechead .meta {
  text-align: right;
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.rows {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--rule);
}

.row {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 18px;
  padding: 18px 18px 20px 0;
  border-bottom: 1px solid var(--rule-soft);
}

.row:nth-child(odd) {
  border-right: 1px solid var(--rule-soft);
}

.row:nth-child(even) {
  padding-left: 18px;
}

.row .num {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--signal);
  letter-spacing: 0.14em;
  font-weight: 600;
}

.row .h {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  line-height: 1.2;
}

.row .d {
  font-family: var(--font-serif);
  font-size: 13.5px;
  color: var(--ink);
  margin-top: 6px;
  line-height: 1.5;
}

.footer {
  margin-top: 72px;
  padding-top: 22px;
  border-top: 2px solid var(--ink);
}

.cta-h {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(44px, 5vw, 64px);
  line-height: 0.95;
  letter-spacing: -0.025em;
  margin: 8px 0 0;
}

.footer-copy {
  font-family: var(--font-serif);
  font-size: 16px;
  line-height: 1.55;
  max-width: 620px;
  margin: 16px 0 0;
}

.email {
  font-family: var(--font-mono);
  font-size: 18px;
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
}

.email .arr {
  color: var(--signal);
}

@media (max-width: 840px) {
  .sheet {
    padding-inline: 24px;
  }

  .topstrip,
  .topstrip .left,
  .topstrip nav {
    align-items: flex-start;
  }

  .topstrip {
    flex-direction: column;
  }

  .topstrip nav {
    flex-wrap: wrap;
    gap: 8px 18px;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .identity {
    padding: 0 0 28px;
    border-right: 0;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 28px;
  }

  .body {
    padding-left: 0;
  }

  .sechead,
  .rows {
    grid-template-columns: 1fr;
  }

  .sechead .meta {
    text-align: left;
  }

  .row,
  .row:nth-child(odd),
  .row:nth-child(even) {
    border-right: 0;
    padding-left: 0;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat {
    border-bottom: 1px solid var(--rule);
  }

  .stat:nth-child(2n) {
    border-right: 0;
  }
}

@media (max-width: 560px) {
  .sheet {
    padding-inline: 18px;
  }

  .topstrip .left {
    flex-direction: column;
    gap: 4px;
  }

  .headline {
    font-size: 46px;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .stat {
    border-right: 0;
  }

  .email {
    font-size: 14px;
  }
}
</style>
