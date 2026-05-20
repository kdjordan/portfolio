---
title: "AI Dev SF: Everyone's Building the Same Thing"
description: "The context layer is becoming enterprise critical infrastructure. The hard questions now are reliability, portability, and whether your agent stack can survive a provider switch."
date: 2026-05-20
tags:
  - ai
  - agents
  - infrastructure
  - enterprise
---

AI Dev San Francisco was a few weeks ago and one takeaway has been rattling around since. Pretty much everybody is solving the same problem.

Call it the context layer. Agentic layer is closer to what it actually is, but context layer is the name catching on, so we'll roll with it. What it does: gets domain knowledge out of employees' heads and into a structure that LLMs can reliably retrieve from and do deterministic work against.

Developers already know this shape. Your team has stack conventions, coding standards, CICD preferences. When one team updates something, sometimes it propagates org-wide, sometimes it doesn't. Multiply by every team and every system and that's the same problem any enterprise hits when they start putting LLMs into production. You need an organization-wide knowledge base, team-level subsets that inherit and override, and the whole thing has to be queryable by an agent in a way that produces reliable output.

## What's working for me

Started lighter. Instead of agents constantly pinging production databases for historical data, I built a parquet-based cache that refreshes daily or on-demand. The cache sits in the context layer. Dashboards built off it are snappy because no backend round-trip. Production systems aren't carrying analytical load. Not glamorous, but it's been solid.

Where it gets harder is the agent layer itself - specifically, how skills and tools get pulled together to act. Not because skills are flaky. The harder constraint is keeping the agentic layer model-agnostic. Vendor lock is the thing I'm most worried about, and let's be honest - the frontier labs are close enough to each other now, and open source is close enough to them, that you have real options. The argument for picking one and pinning to it is getting weaker every quarter.

## The conference takeaway

A lot of startups at AI Dev SF are building into this space, and several have solutions sharper than what I've put together myself. But here's the friction that kept coming up in conversations: every one of those is another piece of critical infrastructure you're outsourcing.

That's the mental model shift I came back with. The context layer isn't a productivity tool. It's becoming critical infrastructure - on par with backend services, on par with the electricity feeding the office. Not being dramatic about it, that's where things are headed. Once it's running your operations, you depend on it the way you depend on those.

## When the abstract argument stopped being abstract

Got tested on this last week. Doing some pattern analysis on call records using Opus 4.7. What I was doing got flagged as fraud. Wasn't fraud, just analytical work that looked weird to a classifier - though I'll give the system this much, flagging fraud analysis as fraud is at least on brand. Filled out the form, gave them my LinkedIn, explained the work. They responded the restriction was lifted. As I'm writing this, my CLI is still partially flagged.

Not a complaint - their team was responsive, and the false positive rate on a system handling millions of users nets out fine. The interesting part for me was what happened next.

Because I'd built the layer model-agnostic from the start, switching to OpenAI was a config change. The cached context still served, the agent abstractions still worked, dashboards kept refreshing - just routed through a different harness. No code to rewrite, no architecture to revisit. The work of staying portable had already been done up front. If I'd built it as a single-vendor stack pinned to one provider, I would have been screwed for a week waiting in a support queue while customers wondered why I went dark.

That's the moment the abstract argument for harness and model independence stopped being abstract for me. Up to that point it had been a design preference. After that it was a thing that had quietly saved me a week of pain. Different relationship to the same principle.

## The can't-go-back problem

The other half of why this matters: once a layer like this is in place, the dependency forms fast.

To make it concrete: this week I built a customer outreach system. Pulls from the parquet cache, compares each customer's last-week usage against their 30-day baseline, generates custom emails per customer. Emails include inline SVG bar and line graphs of usage trend. Language adjusts depending on whether the customer is up or down. Calendar link baked in so they can book a 30-minute meeting without any back-and-forth.

What used to be a thing I'd only do for my top 5 growth or decline accounts I now do for every customer every week. Takes five minutes. I copy, paste, add a personal joke for customers I have tighter relationships with, send.

I should have been doing this manually all along. I wasn't, because manually it was half a day per round, which - let's be real - is just enough friction to never get done. Once the layer is in place, the marginal cost of doing it for everybody collapses. Three days in and meetings are already on the calendar.

And once you've experienced that, going back to the manual version isn't really on the table.

That's the dynamic that makes the context layer critical infrastructure. Not the technology. The dependency.

## What it means going in

Everyone is going to put some version of this into their workflow. Benefits are too obvious not to. The questions that actually matter aren't whether to do it, they're:

How reliable is your context layer? When the agent goes to retrieve domain knowledge, does it consistently get what it needs?

Are you harness and model agnostic? Because if the answer is yes, swapping providers is a config change. If the answer is no, it's a re-platforming project you'll end up running when you can least afford to.

That's the frame I'm carrying out of AI Dev SF. Not a specific vendor, not a specific architecture. Just the realization that this layer is the next piece of enterprise critical infrastructure, and the decisions you make about it now are the ones you're going to be living with.
