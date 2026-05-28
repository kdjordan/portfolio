---
title: "I Built a Product in 20 Hours That Didn't Exist on Friday Night"
description: "Three architecture pivots, a Rust engine built and abandoned, and a working beta shipped by Sunday. Here's what actually happens when you combine domain expertise with AI coding tools and a weekend with no meetings."
date: 2026-03-27
tags:
  - ai
  - building
  - mockdeskai
  - startup
---

Last weekend I spent 20 hours building a product from scratch. By Sunday night I had a working Electron desktop app that lets sales reps in the decorated apparel industry edit professional PSD designs with AI — change text, swap colors, adjust fonts, toggle layers — without opening Photoshop and without waiting two weeks for the art department to turn around a simple proof edit.

The product is called <a href="https://mockdeskai.com" target="_blank">MockDeskAI</a>. It shipped as v0.1.1-beta on GitHub Releases. A real person saw the demo. And I threw away three complete architectures to get there.

This is the honest story of what that weekend looked like.

## Friday Night: The Problem

I work in wholesale telecom by day, but I have a connection in the decorated apparel industry — a space worth $30-40 billion with 150,000 to 260,000 sales reps in North America alone. The problem is painfully simple: sales reps need to show clients what their logo looks like on a hat, a polo, a jacket. To do that, they send a design request to the art department, wait days or weeks for a proof, get feedback, send revisions, wait again.

For a simple text change — updating a company name, adjusting a phone number — this cycle is absurd. The rep knows exactly what needs to change. They just can't do it themselves because the designs are locked inside Photoshop files that require expensive software and technical skill to edit.

That's the gap. An AI-powered tool that lets non-designers make simple edits to professional PSD files, using natural language instead of Photoshop.

I'd been circling this idea for weeks. Friday night I decided to stop thinking and start building.

## Saturday Morning: Architecture #1 — Rust Native PSD Engine

My first instinct was to go as close to the metal as possible. I started with a Tauri desktop app (Rust backend, web frontend) and built a native PSD engine using Rust's `psd` crate for parsing and `fontdue` for text rendering.

By mid-morning I had text extraction working. I could read every text layer from a professional PSD file — the kind of 300-500MB production files that art departments work with daily. Layer names, positions, font sizes, colors, all of it.

Then I tried to write text back.

This is where I hit the wall. PSD text is stored in a format that requires maintaining seven or more cascading length fields that reference each other. No library in any language — Rust, Python, JavaScript, C++ — reliably writes PSD text data. The format was designed by Adobe for Adobe, and nobody has fully reverse-engineered the text rendering pipeline.

I spent two hours confirming this across every PSD library I could find. The Rust engine could read perfectly. It could not write. Dead end.

**Time spent: ~4 hours. Result: abandoned.**

But not wasted. I now knew definitively that native PSD text writing was off the table, which eliminated an entire category of approaches and focused the search.

## Saturday Afternoon: Architecture #2 — SaaS Web App

If I couldn't write PSD text natively, I needed a library that could. The only one that reliably reads AND writes PSD text is <a href="https://github.com/nicktming/ag-psd" target="_blank">ag-psd</a>, a JavaScript library. So I pivoted to a web-based approach.

I built a Next.js app with ag-psd running in a Web Worker for client-side PSD processing. Upload a PSD, see all the layers, edit text through an AI chat interface, export the modified file. Deployed it to Vercel.

It worked. The PSD rendering was clean, the edits were accurate, and the whole thing ran in the browser.

Then I did the business model math.

The AI chat interface needed to call Claude's API for every user interaction. In a SaaS model, I'd be paying for every rep's API usage. With potentially thousands of reps making dozens of edits per day, the API costs would be unpredictable and potentially ruinous — especially for a solo founder with no funding trying to validate product-market fit.

I didn't want to charge users enough to cover API costs before I even knew if the product worked. And I definitely didn't want to eat those costs myself during a free beta period.

**Time spent: ~3 hours. Result: working prototype, broken business model.**

## Saturday Evening: Architecture #3 — Electron Desktop App

The insight hit around 7 PM: what if the user runs their own AI?

Claude Code is a CLI tool that runs on the user's machine, authenticated with their own account. If I built a desktop app instead of a SaaS product, the user's own Claude subscription handles the AI costs. Zero hosting cost for me. Zero API bills. The user gets unlimited AI edits for the price of their existing Claude subscription.

The architecture clicked immediately:

- **Electron app** wrapping a React frontend served by a local Express server
- **ag-psd Web Worker** running in Electron's Chromium for PSD read/write
- **Express backend** spawning the local Claude CLI via WebSocket, streaming responses as NDJSON
- **User's own Claude CLI** — installed and authenticated on their machine

I already had most of the pieces. I'd built a Claude CLI streaming integration for a previous project (TelcoOS) — the Express + WebSocket + NDJSON parsing was already written and tested. I ported it over, connected the ag-psd frontend from the SaaS prototype, and started wiring everything together.

By midnight I had a working app. Upload a PSD, see layers, chat with Claude about edits, see changes applied in real-time, export the modified file.

**Time spent: ~5 hours. Result: working architecture, correct business model.**

## Sunday: Polish and Ship

Sunday was bug fixes, UI polish, and getting it demo-ready.

The bug list was real:
- Undo needed to revert ALL edits per chat turn, not just the last one
- Chat history was losing state on tab switches due to a race condition in React state updates
- Auto-scroll wasn't following streaming responses (fixed with MutationObserver instead of scroll events)
- The file tree needed upload, rename, delete, and drag-drop to feel like a real workspace
- PSD export needed to round-trip cleanly through ag-psd's writePsd

Each of these was the kind of bug that would have taken a day to track down five years ago. With Claude Code as a pair programmer, most were diagnosed and fixed in minutes. The AI doesn't replace debugging skill — it accelerates the mechanical part of finding the root cause so you can spend your time on the judgment calls.

By Sunday afternoon I had a multi-tab PSD editor with a working AI chat, file management, undo/redo, and export. I packaged it as v0.1.1-beta and cut a GitHub Release.

Then I showed it to someone who actually sells decorated apparel for a living.

## The Demo

The demo was honest. Test PSDs don't showcase the power of the tool the way real production files do. But it was enough to validate the vision.

What came out of that conversation was a three-phase roadmap:

**Phase 1 (shipped):** PSD design proofing — text, color, font, visibility, opacity edits via AI. This is what the beta does today.

**Phase 2 (next):** Product compositing — take blank product photos (polo, hat, jacket) and overlay design PNGs to create flat product mockups. No Photoshop needed. Drag, position, scale.

**Phase 3 (future):** AI mockup generation — feed the composited product image to an image generation model and place it on AI-generated humans. Virtual try-on. Lifestyle mockups. The full sales loop from blank product to client-ready mockup, all self-service.

The three phases together eliminate the art department bottleneck entirely. No more two-week proof turnaround. The rep does everything themselves.

## What Made This Possible

I want to be specific about what made a 20-hour weekend build viable, because "I used AI" is too vague to be useful.

**Domain knowledge told me what to build.** I didn't come up with this idea from a market research report. I know someone who lives this problem daily. The insight — that reps wait weeks for simple proof edits — came from a real relationship with a real person in the industry. AI can't give you that.

**AI coding tools handled the mechanical work.** Scaffolding, CSV parsing, component wiring, bug diagnosis — the parts that are necessary but not where the value lives. Claude Code let me move through these at roughly 5-10x the speed I would have worked alone.

**Persistent memory meant pivots didn't lose context.** I run an AI agent system with long-term memory (ClawVault). Every decision, every dead end, every lesson from the Rust engine attempt was stored and available when I started the Electron build. I wasn't starting from zero each time — I was iterating with full context.

**Prior work was portable.** The Claude CLI streaming code from TelcoOS. The PSD worker from the SaaS prototype. The Electron packaging patterns from previous projects. Building things compounds. The more you ship, the more pieces you have for the next build.

## The Uncomfortable Part

I want to be honest about what this isn't.

This isn't a finished product. It's a beta that proves the core interaction works. The UI needs more polish. The PSD rendering has edge cases. Phase 2 and 3 are still roadmap items, not shipped features.

I also didn't do this in 20 hours of casual work. It was 20 hours of intense, focused building — the kind where you forget to eat and suddenly it's midnight. It required years of accumulated skill, a specific domain insight, and an existing library of reusable code. The AI tools accelerated the build; they didn't replace the prerequisites.

If you're thinking about building something on a weekend, here's my honest advice: the 20-hour build is real, but only if you already know exactly what to build and roughly how to build it. The AI handles the typing. The judgment is still yours.

## What's Next

MockDeskAI is in private beta with one initial contact in the decorated apparel space. The market is $30-40B with over 150,000 sales reps in North America. No direct competitor exists.

Phase 2 (product compositing) depends on getting blank product stock images from the industry contact. Phase 3 (AI mockup generation) is a research project for now — evaluating image generation models for virtual try-on.

The pricing model, when it comes, will be simple: per-seat SaaS, probably around $19/rep/month. But pricing comes after product-market fit, and product-market fit comes after more reps use it and tell me what's broken.

I still have a day job. I built this between Saturday morning and Sunday night. The tools to ship a real product in a weekend exist right now. The hard part was never the code.

It's knowing what to build.
