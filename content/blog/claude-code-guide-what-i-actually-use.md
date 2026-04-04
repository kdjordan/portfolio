---
title: "Claude Code: What I Actually Use After a Year"
description: "A practitioner's guide to Claude Code — the slash commands, shortcuts, and workflows that survived 12 months of daily use. No fluff, just what works."
date: 2026-04-03
tags:
  - ai
  - claude-code
  - building
  - tools
---

# Claude Code: What I Actually Use After a Year

There are dozens of "Getting Started with Claude Code" posts. They walk you through `/init`, show you a few slash commands, and call it a day. That's fine if you're kicking the tires.

This isn't that post. I've been using Claude Code pretty much every day for a year — building agent infrastructure, shipping telecom tools, writing the blog you're reading right now. Along the way I've found the features that actually move the needle day to day, and the ones that sound impressive but I never touch.

Here's what survived a year of real use.

--

## CLAUDE.md Files Change Everything

CLAUDE.md is a persistent instruction file that Claude reads at the start of every session. Think of it as a `.bashrc` for your AI — it shapes every interaction without you repeating yourself. Before you learn a single slash command, get these right. This is the single highest-leverage thing in Claude Code and most people either skip it or write a novel nobody reads.

There are two levels: a global one at `~/.claude/CLAUDE.md` that applies to every project (mine has my communication style, installed tools, and machine context), and a project-level `./CLAUDE.md` in each repo root with architecture decisions, conventions, and deployment notes. Claude loads both at session start — they stack, not override. Every session starts knowing how I work and what I'm working on.

There's also `./CLAUDE.local.md` — your personal overrides for a specific project. Gitignored. Things only you need.

**Pro Tip: keep these files thin.** Opt for less over more — they get injected on each turn, so they eat up context. The more you stuff in there, the less Claude actually follows any of it. This is part of learning these tools — finding the sweet spot where context is functional and not hallucinatory. Be specific. "Use 2-space indentation in TypeScript files" beats "follow good coding practices" every time.

You can also organize instructions into `.claude/rules/` — one markdown file per topic. I have separate files for code style, testing conventions, and security rules. Each file can be scoped to specific paths:

```yaml
---
paths:
  - "src/api/**/*.ts"
---
# API Development Rules
Always validate request bodies at the handler level...
```

This means Claude only loads those rules when it's actually touching API files. Less noise, better adherence.

--

## How I Actually Manage Context

Most guides will tell you about `/compact` to summarize old conversation, `/context` to check your token usage, `/resume` to pick up old sessions. Those exist and they work fine.

I do something different.

When a session gets long or I'm switching gears, I don't try to compress or resume. I have the agent write a `handoff.md` file — a structured summary of what we did, what's still open, what decisions were made, and what the next agent needs to know. Then I open a fresh terminal and point the new session at that file.

Clean context every time. No compaction artifacts, no degraded recall, no hoping the auto-summary kept the right details. The handoff file is explicit — I can read it, edit it, and the next session starts with exactly the context it needs.

I've been experimenting with this approach and the results are noticeably better than trying to stretch a single session. Fresh context with a good handoff beats a long session with compacted memory.

The one slash command I use constantly: `/plan`. Before anything non-trivial, I put Claude in plan mode — it can read the codebase and research but can't change anything. The plan becomes a contract. I review it, adjust it, then tell Claude to execute. This prevents the "I refactored your entire codebase to fix a typo" problem.

--

## The Three Things I Do Constantly

Before I get to keyboard shortcuts, here are the three workflows I use most that rarely show up in getting-started guides.

### Paste Images Directly Into the Terminal

This one surprised me. Claude Code is a CLI tool, but you can copy an image and paste it straight into the input. Screenshots, design mockups, diagrams — copy, paste, ask.

My most common use: something looks wrong in the browser. I screenshot it, paste it in, and ask "what's broken here?" Claude sees the actual UI, not my description of it. The difference in diagnosis quality is night and day.

Paste a design mockup and say "build this" — Claude sees the spacing, the colors, the layout. Way more effective than describing what you want.

### Copy Browser Console Errors Straight In

Stack traces, network failures, React warnings, TypeScript errors — I copy the raw console output and paste it directly into Claude Code. No describing the error, no transcribing, no "I'm getting a TypeError that says something about..."

Just paste the full error and say "fix this." Claude has the exact error, the full stack trace, the line numbers. It can grep the codebase for the relevant file and fix it in one shot. This is probably 30% of my daily usage.

### Run With --dangerously-skip-permissions

I know what it sounds like. But when you're deep in a flow and you trust what Claude's doing, the constant permission prompts kill momentum. Every "Allow Edit to file X? [y/n]" breaks concentration.

I run with `--dangerously-skip-permissions` by default. I rely on CLAUDE.md guardrails to keep Claude away from things it shouldn't touch, and git to catch anything that goes sideways. If something breaks, I rewind or reset. The tradeoff is worth it for the uninterrupted flow.

Not for everyone. Not recommended for unfamiliar codebases or production systems. But for my own projects where I know the code and trust the guardrails? It's how I work.

--

## On Shortcuts, Swarms, and Doing Too Much

Most keyboard shortcut lists give you 30 bindings you'll forget. Most agent tutorials want you running dev swarms and orchestrating parallel agents from a single terminal. I'm going to push back on some of it.

The human mind has a context window too. Every shortcut you memorize, every parallel process you're monitoring in one window — that's cognitive load. And just like Claude's context window, when yours fills up, quality degrades.

The one shortcut I actually use: `Escape`. When I see Claude start to wander — wrong file, wrong approach, heading down a rabbit hole — I hit Escape, redirect, and move on. That one habit saves more time than every other shortcut combined.

I do work with multiple agents and multiple projects at once. But not by stacking everything into one session. I spend the time upfront prompting carefully, making a plan, then structuring the work so the agent can do more in a single turn — bash loops, chained commands, clear instructions that don't need babysitting. Then I walk to the next machine and do the same thing.

All of my machines are on standing desks for exactly this reason. I move back and forth physically — check one project, redirect if needed, walk to the next one. It's less "orchestrating a swarm from mission control" and more "managing a small team where everyone has their own desk."

The best results I've gotten came not from doing more at once, but from doing less per session and being deliberate about what each agent gets. One clear plan. One focused task. Good handoffs between sessions. The compound effect of that discipline beats any amount of parallel chaos.

--

## Custom Skills: The Real Power Move

Custom skills are where Claude Code goes from "smart autocomplete" to "custom AI workflow engine." Building these is a skill in itself — there are even skill-builder skills you can experiment with. They bundle context, scripts, and agent memory all in one spot, and they fully replaced custom slash commands for me with much better and more consistent results.

Skills are markdown files. Drop a `SKILL.md` file in `~/.claude/skills/my-skill/` and it becomes a `/my-skill` command.

Here's a real example. I have a `/publish-post` skill that takes a blog post from draft to published in under 60 seconds — creates the markdown file, commits, pushes, opens a PR:

```yaml
---
name: publish-post
description: Publish a blog post to kevinjordan.dev
disable-model-invocation: true
---
Create the blog post markdown file in content/blog/,
commit to a new branch, push, and open a PR.
Follow the frontmatter format from existing posts.
```

That's it. The skill is just instructions — no executable code, no build step. Claude reads them and follows them using its existing tools.

You can pass arguments too. I have a `/fix-issue` skill:

```yaml
---
name: fix-issue
description: Fix a GitHub issue by number
argument-hint: "[issue-number]"
---
Read GitHub issue $ARGUMENTS. Understand the problem.
Check out a branch, implement the fix, write tests, open a PR.
```

`/fix-issue 42` — Claude reads the issue, writes the code, runs the tests, opens the PR. One command.

Skills can also inject live data using shell commands:

```yaml
---
name: pr-review
description: Review current PR
context: fork
---
## Current diff
!`gh pr diff`

## PR comments
!`gh pr view --comments`

Review this PR for issues.
```

The shell commands run before Claude sees the prompt, so it gets live data every time. `context: fork` runs it in an isolated subagent so it doesn't pollute your main conversation.

No executable code. Just markdown instructions Claude follows. I have about 15 skills now. They replace what would otherwise be the same prompt typed every time I do a specific task. Skills make those one command.

--

## Hooks: Automated Guardrails

Hooks are shell commands that fire at specific points in Claude's lifecycle. They're deterministic — they always run, unlike CLAUDE.md instructions which are "suggestions."

I use hooks for three things:

### Auto-formatting on save

Every time Claude edits a file, Prettier runs:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$(jq -r '.tool_input.file_path')\""
          }
        ]
      }
    ]
  }
}
```

No more "can you format that?" — it's automatic.

### Protecting sensitive files

A `PreToolUse` hook that blocks edits to `.env` files and lockfiles:

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[[ "$FILE_PATH" == *".env"* ]] && echo "Blocked: .env is protected" >&2 && exit 2
exit 0
```

Exit code 2 blocks the action and sends the error message back to Claude as feedback. Claude sees "Blocked: .env is protected" and adjusts its approach instead of silently modifying something it shouldn't.

### Desktop notifications

When Claude finishes a long task and needs my input:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude needs input\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

I kick off a big task, switch to another window, and get a macOS notification when Claude's waiting for me.

--

## MCP Servers: Extending the Tool Set

MCP (Model Context Protocol) servers add external tools to Claude Code. Instead of Claude only being able to read files and run bash commands, you can give it access to databases, APIs, internal tools — anything you can wrap in the MCP protocol.

Configuration lives in your settings JSON:

```json
{
  "mcpServers": {
    "my-api": {
      "type": "http",
      "url": "https://internal-api.company.com/mcp"
    }
  }
}
```

Or for local tools:

```json
{
  "mcpServers": {
    "db-tool": {
      "type": "stdio",
      "command": "node",
      "args": ["./tools/db-query-server.js"]
    }
  }
}
```

Once connected, the tools show up as `mcp__<server>__<tool>` and Claude can use them like any built-in tool. You manage them with `/mcp`.

The real power is scoping. Global MCP servers go in `~/.claude/settings.json`. Project-specific ones go in `.claude/settings.json`. You can have a database tool that only activates when you're in a specific project.

--

## Permissions: I Skip Them

Claude Code has a granular permission system — allow/deny rules with wildcards, multiple modes you can cycle through with `Shift+Tab`. It's well-designed. I don't use it.

I run with `--dangerously-skip-permissions`. Every session. The name is intentionally scary, and Anthropic would probably prefer I didn't recommend this. But here's my reasoning:

When you're building fast and you trust your setup, every "Allow this? [y/n]" prompt is friction. Over a full day of coding, those prompts add up to minutes of interrupted flow and broken concentration.

My safety net isn't permissions — it's layers:

1. **CLAUDE.md guardrails** — Claude knows what it should and shouldn't touch
2. **Git** — Everything is version-controlled. If something goes sideways, I rewind or reset
3. **Hooks** — Deterministic protection for truly sensitive files (`.env`, lockfiles)
4. **Common sense** — I don't run this on production systems or unfamiliar codebases

If you're new to Claude Code, use the permission system. Learn what Claude does, build trust, understand the patterns. Then decide for yourself. For my own projects, the tradeoff is clear — uninterrupted flow wins.

For reference, the permission system supports:

```json
{
  "permissions": {
    "allow": ["Bash(npm *)", "Bash(git *)", "Edit(*.ts)"],
    "deny": ["Bash(rm -rf *)", "Edit(.env)"]
  }
}
```

And modes: Default (ask for everything), Plan (show plan first), AcceptEdits (auto-approve code changes), Auto (AI decides). Cycle with `Shift+Tab`. All useful — just not how I work.

--

## The Workflow That Works

After a year, here's the basic workflow that survived:

1. **Start every project with CLAUDE.md**. Keep it thin — just enough for Claude to know the stack, conventions, and what not to touch.

2. **Use Plan Mode**. `/plan` before anything non-trivial. Let Claude read the codebase and propose an approach before it starts changing things.

3. **Watch the output and hit Escape if something looks fishy**. Correct before it goes bananas. This is faster than letting it finish and then trying to undo.

4. **If you type the same instructions 3 times, make it a skill**. That's the threshold. Three times and it's a `/skill`.

5. **Don't worry about typos**. For long entries, just speak and have your machine transcribe it. Claude handles messy input fine.

6. **Background long tasks**. `Ctrl+B` when Claude's running tests or builds. Keep working on something else.

7. **Name and resume sessions**. `/rename` everything meaningful. Tomorrow-you will thank today-you.

--

## What I Don't Use

Honesty section. These features exist and I basically never touch them:

- **`/ide`** — I work in the terminal. If you live in VS Code, this is probably great.
- **`/voice`** — Push-to-talk dictation. Cool demo, not my workflow.
- **Most MCP marketplace servers** — I connect to my own tools. The generic marketplace ones feel like solutions looking for problems.
- **The permission system entirely** — I run with `--dangerously-skip-permissions` and rely on CLAUDE.md guardrails and git instead. The per-action permission prompts break flow.

--

## The Bottom Line

Claude Code is the most capable AI coding tool I've used. But like any powerful tool, most of its value is locked behind features you have to go find. The defaults are fine. The customized setup — CLAUDE.md files tuned to your workflow, skills that automate your repetitive tasks, hooks that enforce your standards, permissions that match your trust level — that's where the real leverage is.

The meta-lesson after a year: Claude Code rewards you for being specific about how you work. The more precisely you define your conventions, your workflows, your guardrails, the better it gets. Vague instructions get vague results. Specific instructions get a collaborator that feels like it's been on your team for months.

Start with CLAUDE.md. Build one skill. Add one hook. The compound effect is real.