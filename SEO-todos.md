# kevinjordan.dev - SEO + Positioning Strategy

> Prepared for kevinjordan.dev / KDJORDAN LLC. Based on on-page, technical, positioning, keyword, and competitor findings.

## Current Status

Completed:

- Server-rendered/static HTML is crawlable.
- Valid sitemap is generated.
- Open Graph and Twitter Card metadata are added.
- `public/og-image.png` exists at 1200x630.
- Homepage has JSON-LD for `Person`, `Organization`, `WebSite`, and `ProfessionalService`.
- Canonical links are added to homepage and blog routes.
- Homepage title and meta description have been updated.
- `/ai-workflow-audit` has `Service` JSON-LD.
- `public/robots.txt` allows major AI/search crawlers, includes `Claude-Web` and `meta-externalagent`, and references the sitemap.
- `public/llms.txt` exists with identity, disambiguation, work, and key URLs.
- Heading hierarchy has one homepage H1 and real section H2s.

Still pending:

- Rewrite hero positioning around a buyer/category: fractional AI engineer for telecom and ops-heavy teams.
- Add booking CTA and qualifying flow.
- Recast services as named, buyable offers.
- Add `BlogPosting` schema.
- Add dedicated service pages and mini case studies.

## Executive Summary

- The foundation is technically sound, but the site still needs stronger conversion positioning.
- The highest-leverage positioning issue is disambiguation from other people named Kevin Jordan.
- The strongest wedge is operator-grounded, production-reliable AI with a telecom/VoIP specialty.
- Concrete, searchable services should move from body copy into title, meta, headings, services, and dedicated pages.
- The blog is the scalable ranking surface and should be used for long-tail, proof-driven topics.

## Positioning Recommendation

Lead with:

> Fractional AI engineer for telecom and ops-heavy teams.
> I build production AI systems - agent infrastructure, voice agents, and internal command centers - that run 24/7 and survive real work. Not slideware.

Add near the top:

> For VoIP/telecom operators and ops-heavy B2B teams who need AI shipped into production - not a prototype and a goodbye. 25+ years shipping, 6 systems live today.

Alternative taglines:

- Most AI consultants build a demo and leave. I ship systems that run 24/7 - and I'm still there after the demo is over.
- Production AI for the people running the systems. Telecom-grade reliability, operator-first design.

## Offer Reframes

| Existing capability | Reframe as offer |
| --- | --- |
| Multi-model orchestration, memory, tool routing, monitoring | AI Agent Build - Ship a monitored, multi-model agent into production in 6-8 weeks. |
| Telecom analytics, rate analysis, CDR reconciliation | Telecom AI / VoIP Automation - AI for fault detection, rate analysis, and CDR reconciliation. |
| Internal command centers, observability | Operator Command Centers - internal copilots and dashboards for the people running systems. |
| AI strategy, no slide decks | AI Roadmap / Readiness Sprint - fixed-scope first engagement that feeds build work. |

Add an explicit engagement model:

- Fixed-scope build
- Fractional retainer
- Strategy/readiness sprint

Change passive availability from:

> Accepting work / Q3 2026

To:

> Booking 2 build engagements for Q3 2026

## SEO Action Plan

| Priority | Change | Type | Effort | Impact |
| --- | --- | --- | --- | --- |
| P0 | Unblock AI answer crawlers in `robots.txt`: ClaudeBot/Claude-Web, GPTBot/OAI-SearchBot, PerplexityBot, Google-Extended, meta-externalagent, CCBot. | Technical | S | High |
| P0 | Add OG + Twitter Card tags and a 1200x630 share image. | On-page | M | High |
| P0 | Replace mailto-only CTA with booking link and qualifying form. Repeat CTA in hero, services, footer. | Conversion | M | High |
| P0 | Rewrite title and meta description around service + buyer keywords. | On-page | S | High |
| P1 | Add JSON-LD: `Person` + `ProfessionalService` on homepage, `BlogPosting` on each post. | Technical | M | Medium-High |
| P1 | Make H2/H3 headings keyword-bearing while preserving visual section codes. | On-page | S | Medium |
| P1 | Add who-this-is-for line, proof, engagement model, and booking CTA copy. | Positioning | M | Medium-High |
| P1 | Submit sitemap in Google Search Console and Bing Webmaster Tools. | Technical | S | Medium |
| P1 | Add self-referencing canonical to every page. | Technical | S | Low-Medium |
| P2 | Build a dedicated service page for `/services/ai-voice-agents` or `/services/telecom-ai`. | Architecture/content | L | Medium |
| P2 | Turn 2-3 projects into mini case studies. | Content | M | Medium |
| P2 | Run Lighthouse on homepage and a post; optimize fonts if LCP warrants. | Performance | M | Low-Medium |
| P2 | Verify no-JS contact fallback. | Technical/a11y | S | Low |

## Ready-To-Paste Assets

Title:

```text
Kevin Jordan - Fractional AI Engineer & Telecom AI Consultant
```

Alternate title:

```text
Kevin Jordan - AI Agent Infrastructure & Telecom Analytics
```

Meta description:

```text
Fractional AI engineer building agent infrastructure, AI voice agents, and telecom analytics that ship to production. Booking Q3 build work - KDJORDAN LLC.
```

Open Graph / Twitter copy:

```html
<meta property="og:title" content="Kevin Jordan - Fractional AI Engineer & Telecom AI Consultant" />
<meta property="og:description" content="Production AI systems - agent infrastructure, voice agents, telecom analytics - that survive real work. KDJORDAN LLC." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://kevinjordan.dev" />
<meta property="og:image" content="https://kevinjordan.dev/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Kevin Jordan - Fractional AI Engineer & Telecom AI Consultant" />
<meta name="twitter:description" content="Production AI systems that survive real work. Agent infra, voice agents, telecom analytics. KDJORDAN LLC." />
<meta name="twitter:image" content="https://kevinjordan.dev/og-image.png" />
```

JSON-LD target shape:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kevinjordan.dev/#kevin",
      "name": "Kevin Jordan",
      "jobTitle": "Fractional AI Engineer",
      "url": "https://kevinjordan.dev",
      "worksFor": { "@id": "https://kevinjordan.dev/#kdjordan" },
      "knowsAbout": [
        "AI agent infrastructure",
        "AI voice agents",
        "Telecom analytics",
        "CDR reconciliation",
        "LLM integration"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/kevin-dean-jordan/",
        "https://github.com/kdjordan",
        "https://x.com/kdjordan_io"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://kevinjordan.dev/#kdjordan",
      "name": "KDJORDAN LLC",
      "url": "https://kevinjordan.dev",
      "founder": { "@id": "https://kevinjordan.dev/#kevin" },
      "areaServed": "US",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Pacific Northwest",
        "addressCountry": "US"
      },
      "serviceType": [
        "AI agent development",
        "AI voice agents",
        "Telecom AI automation",
        "LLM integration",
        "AI strategy roadmap"
      ]
    }
  ]
}
```

## Target Keywords

| Keyword | Intent | Difficulty | Target |
| --- | --- | --- | --- |
| fractional AI engineer | Commercial | Medium | Homepage H1 / title |
| fractional Chief AI Officer | Commercial | Medium | AI Roadmap / Strategy offer |
| VoIP AI automation consultant | Commercial | Low | Telecom AI service page |
| AI voice agent for business | Commercial | Medium | AI Voice Agents service page |
| AI phone agent appointment booking | Transactional | Low | Dispatch + voice-agent service page |
| LLM integration consultant | Commercial | Medium | AI Agent Build service |
| AI agent development services | Commercial | High | Homepage services + Dispatches |
| AI strategy roadmap consulting | Commercial | Medium | AI Roadmap offer |
| AI readiness assessment for SMB | Commercial | Low | Productized first-engagement page |
| RAG implementation consultant | Commercial | Medium | AI Agent Build / Dispatch |
| custom AI agent for sales operations | Commercial | Low | Dispatch + agent service |
| hire AI developer for startup | Transactional | Medium | Homepage CTA / About |
| call center AI automation | Commercial | High | Long-tail Dispatches |
| AI consultant | Commercial | High | Brand only / long-tail support |
| AI automation agency | Commercial | High | Comparison Dispatch |

## Content Plan

1. Building a production AI phone agent: architecture, costs, and what broke
2. From VoIP to voice AI: telecom lessons for reliable AI phone agents
3. Fractional AI engineer vs. agency vs. full-time hire: a cost breakdown
4. The 90-day AI roadmap I run for SMBs
5. How to stop missing calls with an AI receptionist
6. CDR reconciliation with AI: cutting a manual telecom process to minutes
7. Day 2 of an AI agent: evals, drift, and cost when the demo is over
8. What production-ready actually means for an LLM feature

Each post should end with a booking CTA and link to the relevant service section/page.

## Competitive Positioning

Competitors to learn from:

- Jason Liu / jxnl.co: content-led inbound, marquee logos, scarcity positioning.
- Fractional AI: polished service pages, quantified case studies, logos/testimonials, content hub.
- Fraction / hirefraction.com: pricing transparency, flat-fee audit, risk reversal.
- Zen van Riel: glossary/definition SEO pages for long-tail vocabulary.

Kevin's defensible gap:

- Operator-grounded, production-reliable AI with telecom/VoIP specialty.
- AI that survives production: uptime, day-2 ownership, evals, drift, cost, and retainer support.
- Telecom- and operations-grounded AI: fault detection, capacity forecasting, rate analysis, CDR reconciliation.
- Operator-facing internal tools for the people running the systems.

Repeatable claim:

> Most AI consultants build a demo and leave. I ship telecom-grade AI that runs 24/7 - and I'm still there after the demo is over.

## Next 7 Days

- [x] Expand `robots.txt` to include Claude-Web and meta-externalagent.
- [ ] Add a Cal.com/Calendly booking link and short qualifying form.
- [x] Rewrite title and meta description.
- [ ] Add fractional AI engineer / telecom and ops-heavy teams hero positioning.
- [ ] Submit sitemap in Google Search Console and Bing Webmaster Tools.

## Next 30 Days

- [x] Add homepage `ProfessionalService` JSON-LD.
- [x] Add `/ai-workflow-audit` `Service` JSON-LD.
- [ ] Add `BlogPosting` JSON-LD.
- [ ] Rewrite headings to be keyword-bearing.
- [ ] Recast services as outcome + offer + proof with engagement model.
- [ ] Turn ReconcileCDR, VOIPAccelerator, and voice-agent work into mini case studies.
- [ ] Publish the first two Dispatches from the content plan.
- [ ] Build one dedicated service page for `/services/ai-voice-agents` or `/services/telecom-ai`.
- [ ] Run Lighthouse on homepage and a blog post.
- [ ] Verify no-JS contact fallback.
