<script setup lang="ts">
definePageMeta({
  layout: false
})

const siteUrl = 'https://kevinjordan.dev'
const siteTitle = 'Kevin Jordan - Technical Founder, Operator'
const siteDescription = 'Kevin Jordan builds systems for operational messes that should not still exist. Hidden value, broken workflows, operator-built AI/software.'
const ogImage = `${siteUrl}/og-image.png`
const personId = `${siteUrl}/#kevin-jordan`
const organizationId = `${siteUrl}/#kdjordan-llc`
const websiteId = `${siteUrl}/#website`
const sameAs = [
  'https://www.linkedin.com/in/kevin-dean-jordan/',
  'https://github.com/kdjordan',
  'https://x.com/kdjordan_io'
]

const auditHref = '/ai-workflow-audit'

useSeoMeta({
  title: siteTitle,
  description: siteDescription,
  ogTitle: siteTitle,
  ogDescription: siteDescription,
  ogSiteName: 'Kevin Jordan',
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Kevin Jordan data sheet homepage preview',
  twitterCard: 'summary_large_image',
  twitterTitle: siteTitle,
  twitterDescription: siteDescription,
  twitterImage: ogImage,
  twitterImageAlt: 'Kevin Jordan data sheet homepage preview'
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': personId,
            name: 'Kevin Jordan',
            alternateName: ['Kevin Dean Jordan', 'kdjordan', 'KJ-01'],
            url: siteUrl,
            image: ogImage,
            jobTitle: 'Technical Founder / Operator',
            email: 'mailto:kevin@kevinjordan.dev',
            sameAs,
            worksFor: { '@id': organizationId },
            affiliation: { '@id': organizationId },
            knowsAbout: [
              'operational workflow automation',
              'AI systems',
              'operator tools',
              'telecom analytics',
              'hidden operational value',
              'AI agent systems',
              'internal command centers',
              'product development',
              'infrastructure automation'
            ],
            description: siteDescription,
            disambiguatingDescription: 'Kevin Dean Jordan, technical founder and operator behind KDJORDAN LLC, kevinjordan.dev, and kdjordan social profiles.'
          },
          {
            '@type': 'Organization',
            '@id': organizationId,
            name: 'KDJORDAN LLC',
            url: siteUrl,
            logo: `${siteUrl}/favicon.png`,
            founder: { '@id': personId },
            sameAs,
            areaServed: 'Pacific Northwest',
            description: 'KDJORDAN LLC builds AI and software systems for operational messes, hidden value, telecom analytics, workflow automation, and operator tools.'
          },
          {
            '@type': 'WebSite',
            '@id': websiteId,
            name: 'Kevin Jordan',
            url: siteUrl,
            publisher: { '@id': organizationId },
            author: { '@id': personId },
            inLanguage: 'en-US',
            description: siteDescription
          }
        ]
      })
    }
  ]
})

const work = [
  {
    name: 'Apparel Proofing System',
    description: 'A proofing queue everyone learned to tolerate: garment templates, artwork placement, customer signoff, and production-artist review buried in hours of manual setup.',
    domain: 'Manual Production Bottleneck',
    stack: '4-8 hr path -> 15-30 min target',
    status: 'PILOT',
    tone: 'signal',
    href: null
  },
  {
    name: 'Telecom Operator Tools',
    description: 'Carrier workflows full of rejected flow, rate chaos, CDR disputes, routing exceptions, and data nobody fully trusts until an operator touches it.',
    domain: 'Operational Waste Streams',
    stack: 'VOIPAccelerator / ReconcileCDR / TelcoOS',
    status: 'LIVE',
    tone: 'ink',
    href: 'https://voipaccelerator.com'
  },
  {
    name: 'Always-On Agent Infrastructure',
    description: 'Context that used to be scattered across chat, files, email, memory, schedules, and tools, pulled into a persistent operating layer.',
    domain: 'Context / Leverage',
    stack: 'Hermes / agents / memory / automations',
    status: 'RUNNING',
    tone: 'signal',
    href: null
  }
]

const services = [
  {
    title: 'Broken Workflow Fit Check',
    description: 'Bring one workflow your team has normalized but probably should not. I will tell you if it is a real automation candidate, where the ROI might be, and what I would build first.'
  },
  {
    title: 'Operational Waste Map',
    description: 'Map the ugly corner: who owns it, what leaks out, what the manual workaround costs, and whether there is hidden value worth building around.'
  },
  {
    title: 'Bottleneck-to-System Sprint',
    description: 'Build the smallest working system around a real process: ingestion, automation, human review, reporting, and handoff into the existing operation.'
  },
  {
    title: 'Operator-Build Partner',
    description: 'Ongoing support for teams that need someone practical in the room: systems maintenance, new workflow discovery, vendor sanity checks, and roadmap execution.'
  }
]

const { data: dispatches } = await useAsyncData('home-dispatches', () => {
  return queryContent('blog')
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .sort({ date: -1 })
    .limit(3)
    .find()
})

const formatDispatchDate = (date: string, tags?: string[]) => {
  const parsed = new Date(date)
  const dateParts = parsed.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).replace(',', '').toUpperCase()

  const primaryTag = tags?.[0]?.toUpperCase() || 'ESSAY'

  const [month, day, year] = dateParts.split(' ')

  return `${month} ${day} / ${year} / ${primaryTag}`
}
</script>

<template>
  <div class="kj-page">
    <div class="doc">
      <header class="topstrip">
        <div class="left">
          <div class="label label--ink">DATA SHEET</div>
          <div class="label">REV. 2026.05 / PUBLIC</div>
        </div>
        <nav aria-label="Primary navigation">
          <a class="label" href="#work">Work</a>
          <a class="label" href="#services">Services</a>
          <NuxtLink class="label" to="/blog">Writing</NuxtLink>
          <a class="label" href="#about">About</a>
          <a class="label active" href="#contact">Contact</a>
        </nav>
      </header>

      <hr>
      <div class="double"></div>

      <section class="hero">
        <div class="identity">
          <div class="label">PART NO.</div>
          <div class="mark">KJ<span class="dash">&mdash;</span>01</div>
          <div class="name">Kevin Jordan</div>
          <div class="role">Technical Founder / Operator</div>

          <div class="vital">
            <div class="label">STATUS</div>
            <div class="v">
              <span class="led"></span>
              SHIPPING / Pacific Northwest
            </div>
          </div>

          <div class="vital">
            <div class="label">AVAILABILITY</div>
            <div class="v availability">ACCEPTING WORK / AI WORKFLOW BUILDS</div>
          </div>

          <div class="vital">
            <div class="label">LISTING</div>
            <div class="listing">
              KDJORDAN LLC / est. 2026<br>
              kevinjordan.dev
            </div>
          </div>
        </div>

        <div class="body">
          <div class="label">ABSTRACT</div>
          <h1 class="headline">
            I build systems for<br>
            operational messes<br>
            that <em>should not still exist.</em>
          </h1>
          <p class="abstract">
            I look for the workflows companies have learned to tolerate: rejected flows,
            manual exceptions, reconciliation messes, proofing queues, internal handoffs,
            and data nobody trusts. Then I build software that turns the drag into leverage.
          </p>
          <div class="ctas">
            <a class="btn btn--primary" :href="auditHref">Broken Workflow Check <span class="arr">&rarr;</span></a>
            <a class="btn" href="#work">See Proof <span class="arr">&darr;</span></a>
          </div>
        </div>
      </section>

      <section class="stats" aria-label="Proof points">
        <div class="stat">
          <div class="label">YR. SHIPPING</div>
          <div class="n">25+</div>
          <div class="sub">1998 -> 2026</div>
        </div>
        <div class="stat">
          <div class="label">AGENTS RUNNING</div>
          <div class="n">24/7</div>
          <div class="sub">multi-model, persistent</div>
        </div>
        <div class="stat">
          <div class="label">COMPANIES BUILT</div>
          <div class="n">07</div>
          <div class="sub">zero -> market</div>
        </div>
        <div class="stat">
          <div class="label">FIRST STEP</div>
          <div class="n">15m</div>
          <div class="sub">workflow audit</div>
        </div>
      </section>

      <section class="section thesis">
        <div class="sechead">
          <div>
            <div class="label">&sect;01 / OPERATING THESIS</div>
            <h2>The weirdest thing about broken workflows is <em>how normal they become.</em></h2>
          </div>
          <div class="meta">DIAGNOSE / BUILD / MEASURE</div>
        </div>
        <hr>
        <div class="thesis-grid">
          <p>
            At first, everyone knows the process is stupid. Then someone builds a spreadsheet,
            one experienced person becomes the translation layer, and the business starts
            depending on the workaround. A few years later nobody calls it broken anymore.
            They call it how we do it.
          </p>
          <p>
            That is where I look first: not the clean dashboard, not the strategy deck, but
            the operational corner where time, money, risk, and tribal knowledge are leaking
            out of the business. Different industries. Same pattern.
          </p>
        </div>
      </section>

      <section id="about" class="section">
        <div class="sechead">
          <div>
            <div class="label">&sect;02 / CURRENTLY</div>
            <h2>What's on <em>the bench.</em></h2>
          </div>
          <div class="meta">UPDATED / 2026.05.27</div>
        </div>
        <hr>
        <div class="currently">
          <p>
            Leading U.S. operations at
            <a class="link" href="https://bts.io" target="_blank" rel="noopener noreferrer">BTS</a>,
            one of the largest wholesale VoIP carriers in the world. Telecom is the current
            proving ground, not the box. The bigger thesis is finding the weird operational
            corners every industry normalizes, then building systems around the value leaking out.
          </p>
        </div>
        <div class="now-tiles">
          <div class="now-tile">
            <div class="n">[01]</div>
            <div class="t">Broken workflow replacement</div>
            <div class="d">Find the process everyone tolerates, quantify the drag, and build the smallest system that removes hours.</div>
          </div>
          <div class="now-tile">
            <div class="n">[02]</div>
            <div class="t">Operational waste streams</div>
            <div class="d">Rejected flow, rate chaos, CDR disputes, routing exceptions, and the ugly data paths where telecom proves the pattern.</div>
          </div>
          <div class="now-tile">
            <div class="n">[03]</div>
            <div class="t">Persistent agent infrastructure</div>
            <div class="d">Research, email, memory, scheduling, and tool access stitched into one operating layer instead of scattered context.</div>
          </div>
        </div>
      </section>

      <section id="work" class="section">
        <div class="sechead">
          <div>
            <div class="label">&sect;03 / PROOF SYSTEMS</div>
            <h2>Selected systems, <em>not shelfware.</em></h2>
          </div>
          <div class="meta">03 SYSTEMS / 01 OFFER</div>
        </div>
        <hr>
        <div class="work-scroll">
          <table class="work">
            <thead>
              <tr>
                <th class="num">No.</th>
                <th>System</th>
                <th>Domain</th>
                <th>Proof</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(project, index) in work" :key="project.name">
                <td class="num">{{ String(index + 1).padStart(2, '0') }}</td>
                <td>
                  <component
                    :is="project.href ? 'a' : 'span'"
                    :href="project.href || undefined"
                    :target="project.href ? '_blank' : undefined"
                    :rel="project.href ? 'noopener noreferrer' : undefined"
                    class="work-name"
                  >
                    {{ project.name }}
                  </component>
                  <div class="desc">{{ project.description }}</div>
                </td>
                <td>{{ project.domain }}</td>
                <td class="stack">{{ project.stack }}</td>
                <td><span class="pill" :class="`pill--${project.tone}`">{{ project.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="section">
        <div class="twoup">
          <div id="services">
            <div class="label">&sect;04 / SERVICES</div>
            <h2 class="compact-h">Start with <em>one normalized mess.</em></h2>
            <div v-for="(service, index) in services" :key="service.title" class="svc-row">
              <div class="num">{{ String(index + 1).padStart(2, '0') }}</div>
              <div>
                <div class="h">{{ service.title }}</div>
                <div class="d">{{ service.description }}</div>
              </div>
            </div>
          </div>

          <div id="writing">
            <div class="label">&sect;05 / DISPATCHES</div>
            <h2 class="compact-h">Recent <em>writing.</em></h2>
            <NuxtLink
              v-for="dispatch in dispatches"
              :key="dispatch._path"
              :to="dispatch._path"
              class="dispatch"
            >
              <span class="d-date">{{ formatDispatchDate(dispatch.date, dispatch.tags) }}</span>
              <span class="d-title">{{ dispatch.title }}</span>
              <span class="d-dek">{{ dispatch.description }}</span>
            </NuxtLink>
            <div class="writing-all">
              <NuxtLink class="btn" to="/blog">All Writing <span class="arr">&rarr;</span></NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" class="footer">
        <div class="footer-top">
          <div>
            <div class="label">&sect;FIN / CONTACT</div>
            <div class="cta-h">Bring me one <em>workflow.</em></div>
            <p class="footer-copy">
              Broken workflow fit check. No slide deck. One process your team has
              normalized, a quick read on whether it is worth building around, and a practical next step.
            </p>
            <a class="email" :href="auditHref">
              Send the normalized mess <span class="arr">&nearr;</span>
            </a>
          </div>
          <div class="elsewhere">
            <div class="label">ELSEWHERE</div>
            <a href="https://linkedin.com/in/kevin-dean-jordan" target="_blank" rel="noopener noreferrer">LinkedIn &nearr;</a>
            <a href="https://github.com/kdjordan" target="_blank" rel="noopener noreferrer">GitHub &nearr;</a>
            <a href="https://x.com/kdjordan_io" target="_blank" rel="noopener noreferrer">X / Twitter &nearr;</a>
          </div>
        </div>

        <div class="colophon">
          <span>&copy; 2026 KDJORDAN LLC / DOC KJ-01 / REV 2026.05</span>
          <span>END OF SHEET</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.kj-page {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  background-image: radial-gradient(var(--rule) 0.6px, transparent 0.6px);
  background-size: 20px 20px;
}

.doc {
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

.topstrip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 18px 0 14px;
}

.topstrip .left,
.topstrip nav {
  display: flex;
  align-items: baseline;
  gap: 24px;
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

.hero .identity {
  padding-right: 28px;
  border-right: 1px solid var(--rule);
}

.hero .body {
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

.mark .dash {
  color: var(--signal);
}

.name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
  margin-top: 14px;
}

.role {
  color: var(--muted);
  font-size: 12.5px;
  margin-top: 2px;
}

.vital {
  margin-top: 22px;
}

.vital .label {
  margin-bottom: 4px;
}

.vital .v {
  font-size: 12.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.availability {
  color: var(--signal);
  font-weight: 600;
}

.listing {
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.7;
}

.led {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--signal);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
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

.headline em,
.sechead h2 em,
.compact-h em,
.cta-h em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--signal);
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
  transition: transform 150ms;
}

.btn--primary .arr {
  color: var(--paper);
}

.btn:hover .arr {
  transform: translateX(2px);
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

.section + .section {
  padding-top: 48px;
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

.thesis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  padding-top: 20px;
}

.thesis-grid p {
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.6;
  margin: 0;
}

.currently {
  padding-top: 20px;
}

.currently p {
  font-family: var(--font-serif);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 900px;
}

.currently p .link {
  border-bottom: 1px solid var(--signal);
  color: var(--signal);
}

.now-tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 24px;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

.now-tile {
  padding: 16px 18px 18px;
  border-right: 1px solid var(--rule);
}

.now-tile:last-child {
  border-right: 0;
}

.now-tile .n,
.svc-row .num {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--signal);
  letter-spacing: 0.14em;
  font-weight: 600;
}

.now-tile .t,
.svc-row .h {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  margin-top: 6px;
  line-height: 1.2;
}

.now-tile .d,
.svc-row .d {
  font-size: 12px;
  color: var(--muted);
  margin-top: 6px;
  line-height: 1.5;
}

.work-scroll {
  overflow-x: auto;
}

table.work {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  margin-top: 16px;
}

table.work thead th {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--rule);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 500;
}

table.work tbody td {
  padding: 16px 12px;
  border-bottom: 1px solid var(--rule-soft);
  font-size: 13px;
  vertical-align: top;
}

table.work tbody tr:hover td {
  background: var(--paper-raised);
}

table.work tbody tr:hover .work-name {
  color: var(--signal);
}

table.work .num {
  color: var(--muted);
  width: 36px;
}

.work-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
  transition: color 150ms;
}

table.work .desc {
  color: var(--muted);
  max-width: 360px;
  margin-top: 4px;
  font-size: 12px;
}

table.work .stack {
  color: var(--muted);
  font-size: 11.5px;
}

.pill {
  display: inline-block;
  padding: 3px 8px;
  border: 1px solid;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  white-space: nowrap;
}

.pill--ink {
  border-color: var(--ink);
  color: var(--ink);
}

.pill--signal {
  border-color: var(--signal);
  color: var(--signal);
}

.pill--muted {
  border-color: var(--muted);
  color: var(--muted);
}

.twoup {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  padding-top: 20px;
}

.compact-h {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 32px;
  line-height: 1;
  letter-spacing: -0.015em;
  margin: 6px 0 16px;
}

.svc-row {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule-soft);
}

.svc-row:first-of-type {
  border-top: 1px solid var(--rule);
}

.svc-row .h {
  margin-top: 0;
}

.svc-row .d {
  font-family: var(--font-serif);
  font-size: 13.5px;
  color: var(--ink);
}

.dispatch {
  display: block;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule-soft);
  cursor: pointer;
  transition: padding-left 150ms;
}

.dispatch:first-of-type {
  border-top: 1px solid var(--rule);
}

.dispatch:hover {
  padding-left: 8px;
}

.dispatch:hover .d-title {
  color: var(--signal);
}

.dispatch .d-date {
  display: block;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}

.dispatch .d-title {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  line-height: 1.25;
  transition: color 150ms;
}

.dispatch .d-dek {
  display: block;
  font-family: var(--font-serif);
  font-size: 13.5px;
  color: var(--muted);
  margin-top: 8px;
  line-height: 1.55;
  max-width: 540px;
}

.writing-all {
  margin-top: 20px;
}

.footer {
  margin-top: 72px;
  padding-top: 22px;
  border-top: 2px solid var(--ink);
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: end;
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
  color: var(--ink);
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

.email:hover .arr {
  animation: nudge 600ms ease-in-out infinite;
}

@keyframes nudge {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(4px);
  }
}

.elsewhere {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: end;
}

.elsewhere a {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: all 150ms;
}

.elsewhere a:hover {
  color: var(--ink);
  border-color: var(--ink);
}

.colophon {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 56px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

@media (max-width: 980px) {
  .doc {
    padding-inline: 24px;
  }

  .hero .identity {
    padding-right: 24px;
  }

  .hero .body {
    padding-left: 32px;
  }

  .headline {
    font-size: clamp(52px, 6.2vw, 64px);
  }

  .mark {
    font-size: 58px;
  }

  .vital .v {
    font-size: 12px;
  }

  .listing {
    font-size: 11.5px;
  }
}

@media (max-width: 840px) {
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

  .hero .identity {
    padding: 0 0 28px;
    border-right: 0;
    border-bottom: 1px solid var(--rule);
    margin-bottom: 28px;
  }

  .hero .body {
    padding-left: 0;
  }

  .sechead {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .sechead .meta {
    text-align: left;
  }

  .twoup {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .thesis-grid {
    grid-template-columns: 1fr;
    gap: 18px;
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

  .now-tiles {
    grid-template-columns: 1fr;
  }

  .now-tile {
    border-right: 0;
    border-bottom: 1px solid var(--rule);
  }

  .now-tile:last-child {
    border-bottom: 0;
  }

  .footer-top {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .doc {
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

  .colophon {
    flex-direction: column;
  }
}

@media (max-width: 720px) {
  .work-scroll {
    overflow-x: visible;
  }

  table.work,
  table.work thead,
  table.work tbody,
  table.work tr,
  table.work td {
    display: block;
    min-width: 0;
    width: 100%;
  }

  table.work thead {
    display: none;
  }

  table.work tbody tr {
    padding: 16px 0;
    border-bottom: 1px solid var(--rule-soft);
  }

  table.work tbody td {
    display: grid;
    grid-template-columns: 74px minmax(0, 1fr);
    gap: 12px;
    padding: 4px 0;
    border-bottom: 0;
  }

  table.work tbody td::before {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  table.work tbody td:nth-child(1)::before {
    content: "No.";
  }

  table.work tbody td:nth-child(2)::before {
    content: "System";
  }

  table.work tbody td:nth-child(3)::before {
    content: "Domain";
  }

  table.work tbody td:nth-child(4)::before {
    content: "Proof";
  }

  table.work tbody td:nth-child(5)::before {
    content: "Status";
  }

  table.work .work-name,
  table.work .desc {
    grid-column: 2;
  }

  table.work .pill {
    justify-self: start;
  }

  table.work tbody tr:hover td {
    background: transparent;
  }

  table.work .num {
    width: 100%;
  }
}
</style>
