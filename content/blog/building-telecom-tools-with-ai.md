---
title: "I Used AI to Build Telecom Tools — Here's What Actually Shipped"
description: "AI didn't replace my telecom expertise. It let me ship two production tools in weeks instead of months. Here's the honest story of building CDRCheck and VoIP Accelerator with AI coding assistants."
date: 2026-03-13
tags:
  - ai
  - telecom
  - building
  - voip
---

# I Used AI to Build Telecom Tools — Here's What Actually Shipped

Let me be clear about something upfront: CDRCheck and VoIP Accelerator are not "AI-powered" products. They don't use machine learning. They don't have neural networks. They're deterministic systems that do exactly what they're told — match records, compare rates, flag discrepancies.

What *is* true: I built both of them using AI coding assistants. And that's the more interesting story.

## The Pattern I Keep Finding

I didn't come up in telecom. I've been building companies since 1998 — e-commerce, streaming, consumer products — and only moved into the VoIP space a few years ago. But I immediately recognized a pattern I've seen in every industry I've touched: scattered data that, if triangulated properly, could offer tangible business advantages. Finding the signal in the noise.

In telecom, that noise looks like this:

**Billing reconciliation is a nightmare.** Wholesale VoIP carriers exchange millions of call detail records daily. When your CDRs don't match your provider's CDRs, you're either overpaying or under-collecting. The traditional fix? Spreadsheets. Manual spot-checks. Hoping the numbers are close enough.

**Rate deck management is tedious.** VoIP pricing changes constantly — hundreds of thousands of destination codes, each with rates that shift based on carrier, route quality, and market conditions. Comparing two rate decks means wading through massive CSVs trying to spot what moved and by how much.

These aren't cutting-edge problems. They're operational grind. The kind of work that eats hours every week and directly impacts margins. And they're exactly the kind of problems I've spent my career building tools to solve.

## What I Actually Built

**[CDRCheck](https://cdrcheck.com)** takes two CDR files — yours and your counterpart's — normalizes the phone numbers and timestamps, then matches every record. It flags what's missing, what doesn't match on duration, and what the monetary difference is. Upload, match, export the discrepancies. Built with Next.js, TypeScript, and SQLite for the matching engine. Handles millions of records.

**[VoIP Accelerator](https://voipaccelerator.com)** does the same thing for rate decks. Upload two A-Z or US rate decks, the system auto-maps your columns, then runs a full comparison — matched codes, unique codes, rate deltas with percentage changes. It also integrates LERG data for US rate deck enrichment. Built with Vue 3, TypeScript, and IndexedDB so the heavy lifting happens in the browser with Web Workers. Processes 250K+ record datasets without breaking a sweat.

Neither tool is fancy. They're workhorses. The kind of thing a telecom operator opens on Monday morning to figure out why last week's numbers don't add up.

## How AI Changed the Build, Not the Product

Here's where it gets relevant to anyone building software right now.

Both tools represent years of telecom domain knowledge compressed into weeks of actual development. I didn't use AI to make the products "smart." I used AI coding assistants — primarily Claude Code — to move faster through the parts that used to slow me down:

- **Scaffolding**: Full-stack project setup, component architecture, database schemas
- **Data parsing**: CSV parsing edge cases, phone number normalization across international formats, timestamp tolerance matching
- **UI iteration**: Going from "functional table" to "filterable, sortable, exportable interface" in a fraction of the time
- **The boring stuff**: Error handling, file validation, export formatting — all the work that's necessary but not where the value lives

The domain knowledge — knowing *what* to build, *why* carriers need sub-second timestamp tolerance, *how* rate deck hierarchies work — that came from experience. AI didn't have opinions about CDR matching tolerances. I did.

## What This Means If You're Building

The takeaway isn't "AI is transforming telecom." It's simpler than that:

**If you have deep domain expertise and a clear problem to solve, AI coding tools let you ship production software at a pace that wasn't possible five years ago.**

I'm not a company. I don't have a dev team. These are tools I built and deployed as a solo technical founder, using AI to multiply my output. They're live. Carriers use them. They solve real problems.

The gap in most industries isn't "we need AI products." It's "we need someone who understands the actual problem and can build a solution." AI makes that second part dramatically faster.

If you're sitting on domain expertise and thinking about building — stop thinking and start shipping. The tools to get there are better than they've ever been.
