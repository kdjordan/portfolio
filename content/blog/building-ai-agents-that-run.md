---
title: Building AI Agents That Actually Run
description: What I learned running an autonomous agent system 24/7 on a Mac Mini — real failure modes, cost control, and the architecture that survived.
date: 2026-03-09
tags:
  - ai
  - agents
  - building
  - production
---

# Building AI Agents That Actually Run

Most AI agent tutorials end at "hello world." The agent sends a message, maybe calls a tool, and the blog post wraps up with "the possibilities are endless." Nobody talks about what happens at 3 AM when your OAuth token expires, your fallback model is rate-limited, and your third fallback was never actually authenticated.

This is about that part. I've been running an autonomous agent system on a Mac Mini for the past month — 24/7 cron jobs, persistent memory, Telegram integration, research pipelines, health monitoring. Here's what actually happened.

## The Stack

The system is called OpenClaw. It's an open-source agent framework that handles model routing, tool execution, memory, and scheduling. I run it on a Mac Mini that sits on my desk and never sleeps.

The agent (her name is Zoe) handles daily research, content drafting, system health monitoring, and answers messages via Telegram. She has a persistent personality, long-term memory across sessions, and a portfolio of skills defined as structured markdown files.

Claude Code — the tool I'm writing this post with — operates completely outside the automated system. More on that later. It's the most important architectural decision I made.

Skills are defined as structured markdown — no executable code, just guidelines the model follows:

```markdown
# research/SKILL.md

## Objective
Find actionable content opportunities with testable hypotheses.

## Sources (rotate, never repeat same combo)
- Reddit: r/fitness, r/homegym, r/bodyweightfitness
- YouTube: search last 7 days, sort by view count
- Hacker News: Algolia API, filter Show HN

## Output Format
For each finding:
- Signal strength: strong / moderate / weak
- Content type: educational / engagement / promotional
- Hook angle: one sentence
- Source URL

## Quality Gates
- Minimum 3 findings per run
- No duplicate sources from last 2 runs
- Every finding must have a hook angle
```

## Iteration 1: Everything Breaks Immediately

The first model I tried was MiniMax M2.5. $20/month flat rate, seemed reasonable. It lasted three days.

The problem wasn't intelligence. The problem was tool-following. I had a research skill that told the agent to search specific subreddits for fitness content. MiniMax searched for the literal string "GRHIIT subreddit" instead of mapping it to the actual subreddit names defined in the skill file. The content drafter received garbage URLs. The pipeline produced nothing useful.

Lesson one: model intelligence and model compliance are different things. A model that writes beautiful prose but can't follow a structured tool-calling protocol is useless in production.

## The Model Waterfall

I replaced the single-model approach with a three-tier cascade:

1. **OpenAI Codex Mini** (primary) — Best tool-following of anything I tested. Runs on a $20/month ChatGPT Plus subscription via OAuth. ~225 messages per 5-hour window.
2. **Gemini 2.5 Flash** (fallback 1) — Free tier, 1,000 requests/day. Zero marginal cost but aggressive per-minute burst limits and unreliable tool calls.
3. **Claude Haiku 4.5** (fallback 2) — Pay-per-token safety net. Reliable tool use. Only fires when both tiers above are exhausted.

Here's the actual cascade configuration:

```json
{
  "models": [
    {
      "id": "openai-codex/gpt-5.1-codex-mini",
      "role": "primary",
      "auth": "oauth",
      "note": "~225 msgs/5h window, best tool-following"
    },
    {
      "id": "google/gemini-2.5-flash",
      "role": "fallback-1",
      "auth": "api-key",
      "note": "free tier, 1000 req/day, unreliable tool calls"
    },
    {
      "id": "anthropic/claude-haiku-4-5",
      "role": "fallback-2",
      "auth": "api-key",
      "note": "$1/MTok in, $5/MTok out — safety net only"
    }
  ]
}
```

This cascade has been reshuffled three times. Gemini started as primary (it's free), got demoted when it kept dropping tool parameters. Codex Mini got promoted. The order matters less than having the fallback chain at all.

The worst outage happened when an OAuth refresh token race condition took down tier one, tier two was already rate-limited from absorbing the overflow, and tier three hadn't been authenticated yet. All three tiers dead simultaneously. Total blackout. The fix was straightforward — authenticate all your fallbacks before you need them — but I only learned that by losing all three at once.

## Cost Control: The Boring Part That Matters

Running an always-on agent gets expensive fast if you're not deliberate about it.

**Heartbeats were the biggest surprise.** The system runs health checks every two hours during active hours. Originally these went through the model cascade like everything else. At 96+ API calls per day, the heartbeat alone was consuming 37% of my model quota. Every Gemini failure cascaded to Codex, burning both tiers on routine status checks.

The fix: run heartbeats on a local Ollama instance (llama3.2:3b) running on the Mac Mini's GPU. Zero API cost. The 3B model is plenty for "check if the gateway is responding and report disk space."

```json
{
  "heartbeat": {
    "model": "ollama/llama3.2:3b",
    "interval": "2h",
    "activeHours": "08:00-22:00",
    "lightContext": true,
    "tasks": ["gateway-health", "dashboard-health", "disk-sanity", "cron-failures"]
  }
}
```

**System prompt optimization** saved another chunk. The initial agent prompt was 16,918 characters. I moved non-essential reference material to on-demand files the agent reads only when relevant. Got it down to 7,345 characters — a 57% reduction. That's real money on per-token models and real quota on subscription models.

**Context pruning** prevents sessions from ballooning:

```json
{
  "contextPruning": {
    "mode": "cache-ttl",
    "ttl": "6h",
    "keepLastAssistant": 3
  },
  "compaction": {
    "mode": "safeguard",
    "softThreshold": 80000,
    "action": "flush-to-daily-memory"
  }
}
```

When a session hits the 80K token threshold, it distills the conversation into a daily memory file and starts fresh.

The total cost to run this 24/7: about $40/month. $20 for Codex Mini subscription, maybe $15-20 in Haiku tokens on a busy month, and whatever electricity the Mac Mini uses. That's less than most people spend on streaming services.

## The Sideloaded Configuration Engine

Here's the architectural decision that changed everything.

Anthropic's Terms of Service require that Claude Code be used interactively — a human directing the tool, not an automation layer wrapping it. I needed Claude's capabilities for complex tasks (architecture decisions, code generation, weekly analysis), but I couldn't pipe it through the automated cascade.

So I didn't. Claude Code operates as a completely separate tier, invoked manually via SSH. It never touches the OpenClaw cascade. It never runs on a cron job. I sit down, start a session, and work with it directly.

But here's the key insight: Claude Code writes back to the same memory system that the automated agents read.

When I use Claude Code to restructure a skill, debug a pipeline, or run a weekly synthesis across all 250+ memory documents — the results get stored in ClawVault (the long-term memory) and appended to the daily workspace memory file. The next time Zoe picks up a cron job or answers a Telegram message, she has full context on what changed and why.

This creates a two-tier architecture:

```
┌─────────────────────────────────────────────────────────┐
│                   INTERACTIVE TIER                       │
│              (Human at the keyboard)                     │
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │  Claude Code  │───▶│  ClawVault   │  Long-term       │
│  │  (Opus 4.6)  │    │  250+ docs   │  memory           │
│  │  via SSH     │───▶│              │                   │
│  └──────────────┘    └──────┬───────┘                   │
│         │                   │                            │
│         │            ┌──────▼───────┐                   │
│         └───────────▶│  Workspace   │  Daily memory     │
│                      │  Memory      │  (real-time)      │
│                      └──────┬───────┘                   │
├─────────────────────────────┼───────────────────────────┤
│                   AUTOMATED TIER                         │
│              (Always-on, no human)                       │
│                      │                                   │
│  ┌──────────────┐    │    ┌──────────────┐              │
│  │  Telegram    │◀───┘    │  Cron Jobs   │              │
│  │  Bot         │         │  Research    │              │
│  └──────┬───────┘         │  Drafts     │              │
│         │                 │  Heartbeat  │              │
│         ▼                 └──────┬───────┘              │
│  ┌─────────────────────────────────────┐                │
│  │         Model Cascade               │                │
│  │  Codex Mini ──▶ Gemini ──▶ Haiku   │                │
│  │  ($20/mo)      (free)    (per-tok) │                │
│  └─────────────────────────────────────┘                │
│                                                         │
│  ┌──────────────┐                                       │
│  │  Ollama 3B   │  Heartbeat only (zero API cost)      │
│  │  (local GPU) │                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

- **Always-on automated tier** (OpenClaw): handles Telegram, cron jobs, research, health checks. Runs on the cost-optimized model cascade.
- **Manual interactive tier** (Claude Code): handles configuration, development, complex analysis. Runs on the Max subscription. Human-in-the-loop by design.

Claude Code became the system's configuration engine. Not through the API. Not through automation. Through a human sitting at a terminal, making decisions, and writing those decisions into shared memory that the automated agents can act on.

The Max subscription gives me unlimited access to Opus-class intelligence for the hard problems. The automated cascade handles the volume. The shared memory layer connects them. And the architecture is TOS-compliant because the most powerful model in the stack is the one with a human at the keyboard.

## Real Failure Modes

A month of 24/7 operation surfaces problems you'd never find in testing:

**The dylib break.** A routine `brew upgrade` bumped a JSON parsing library from 4.2.4 to 4.3.0 without rebuilding the Node.js binding. The gateway crashed on startup with a cryptic `dyld Library not loaded` error. Fix: symlink the old library, then rebuild. Time to diagnosis: 45 minutes of staring at load errors.

**The silent format bug.** OpenClaw silently skips heartbeat processing when the heartbeat file contains only markdown headers. The file had content. The system reported `status: skipped, reason: empty-heartbeat-file`. No error. No warning. Just silence. I only caught it because the health dashboard showed zero heartbeat activity. Fix: use plain text labels instead of `#` headers.

**The 3-day silent pipeline failure.** Research cron jobs were timing out at 120 seconds and producing empty output folders. No errors in the logs — the timeout was graceful. The content drafter downstream had nothing to work with, so it also produced nothing. Three days of dead pipeline before I noticed the output directories were empty. Fix: increase timeout to 300 seconds, reduce frequency from daily to twice weekly.

**The log rotation mismatch.** OpenClaw names log files by when the gateway started, not when entries are written. A gateway started on Feb 19 kept writing to `openclaw-2026-02-19.log` on Feb 20. The dashboard only checked today's log file. Zero usage reported despite active traffic. Fix: scan both today's and yesterday's log.

Every one of these is trivial in hindsight. None of them show up in a demo.

## Memory: The Unsexy Superpower

The system runs two complementary memory layers:

**ClawVault** is the long-term archive. 250+ documents organized by category — decisions, lessons, patterns, projects, people, preferences. BM25 text search plus vector embeddings for semantic retrieval. Nightly git backup. This is where architectural decisions, post-mortems, and strategic insights live.

**Workspace memory** is the short-term layer. Daily markdown files that the agent reads in real time. Session logs, status updates, handoff notes. When Claude Code finishes a work session, the results get written here so Zoe has immediate context.

```
┌──────────────────┐         ┌──────────────────┐
│    ClawVault     │         │ Workspace Memory  │
│  (long-term)     │         │  (short-term)     │
├──────────────────┤         ├──────────────────┤
│ 250+ documents   │         │ Daily .md files   │
│ BM25 + vectors   │         │ Plain text        │
│ Categories:      │         │                   │
│  decisions       │         │ Read: every       │
│  lessons         │         │  interaction      │
│  patterns        │         │                   │
│  projects        │         │ Write: session    │
│  insights        │         │  logs, handoffs   │
├──────────────────┤         ├──────────────────┤
│ Read: weekly     │         │ Read: real-time   │
│  synthesis only  │         │  by automated     │
│                  │         │  agents           │
│ Write: Claude    │         │                   │
│  Code + cron     │         │ Write: Claude     │
│                  │         │  Code + compaction │
│ Backup: nightly  │         │                   │
│  git push        │         │                   │
└──────────────────┘         └──────────────────┘
```

The critical insight: these are separate systems with different access patterns. The automated agent reads workspace memory on every interaction but only touches ClawVault during scheduled synthesis. If you write to ClawVault but skip workspace memory, the agent has no idea what happened until the next review cycle. I learned this the hard way — spending an hour configuring something in Claude Code, storing it to ClawVault, and then watching Zoe completely ignore it for two days.

## What I'd Build Differently

**Authenticate everything on day one.** Every API key, every OAuth flow, every fallback tier. Test the cascade end-to-end before you rely on it. The "I'll set up the third fallback later" mentality is how you get a total outage.

**Instrument the silence.** The scariest failures aren't errors — they're the absence of output. A cron job that produces nothing looks the same as a cron job that didn't run. Add positive confirmation: if the job ran and produced results, log it. If it ran and produced nothing, log that too. If it didn't run at all, that's a different problem.

**Separate the thinker from the doer.** The most capable model in your stack shouldn't be the one answering routine messages. Use the expensive intelligence for architecture, analysis, and configuration. Use the cost-optimized models for volume. Connect them through shared memory, not direct orchestration.

**Kill your darlings early.** I've gone through three model providers, three identity reboots, and dozens of skill rewrites. The system that runs today shares almost no configuration with what I deployed on day one. The only thing that survived unchanged is the Mac Mini it runs on.

## The Point

OpenAI just launched Frontier — an "agent factory" platform for enterprises. The market for AI consulting is growing at 39.7% CAGR. Everyone's talking about agents.

Almost nobody is running them.

The gap between a demo agent and a production agent is the same gap between a prototype and a product. It's monitoring, failure recovery, cost management, memory persistence, security hardening, and the thousand small decisions that keep something alive at 3 AM.

If you're building agents that need to actually run — not just demo well — start with the boring stuff. The model is the easy part. Everything around it is the work.
