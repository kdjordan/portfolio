# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 3 portfolio site with SSG (Static Site Generation) for AWS Amplify deployment. Features GSAP animations, Tailwind CSS styling, and Nuxt Content for blog functionality.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Generate static site (for AWS Amplify)
npm run generate

# Preview generated static site
npx serve .output/public
```

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3 + Nitro)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (with ScrollTrigger, TextPlugin, CSSPlugin)
- **Icons**: FontAwesome (brands, solid)
- **Content**: Nuxt Content (Markdown blog posts)
- **Deployment**: AWS Amplify (SSG)

## Architecture

### Key Directories

- `pages/` - File-based routing (index.vue, blog/)
- `components/` - Auto-imported Vue components
- `components/home/` - Home page section components
- `composables/animations/` - Reusable GSAP animation logic
- `layouts/` - Page layouts (default.vue)
- `plugins/` - Nuxt plugins (GSAP, FontAwesome)
- `data/` - TypeScript data files (projects, jobs, techs)
- `content/blog/` - Markdown blog posts
- `assets/css/` - Global styles
- `public/` - Static assets (images, PDF)

### SSR Safety

GSAP uses browser APIs that don't exist during SSR. All animation code must include SSR guards:

```typescript
// In composables
if (!import.meta.client) {
  return { /* no-op functions */ }
}

// In components
onMounted(() => {
  if (!import.meta.client) return
  // animation code
})
```

### Animation System

- **useHeroAnimation** - Hero text reveal with rotating skill words
- **useNavigationAnimation** - Nav intro and mobile menu toggle
- GSAP plugins registered in `plugins/gsap.client.ts` (client-only)

### Data Management

Content is centralized in TypeScript files under `data/`:
- `projects.ts` - Portfolio projects
- `jobs.ts` - Work experience
- `techs.ts` - Technology stack

Blog posts are Markdown files in `content/blog/` with frontmatter.

## Nuxt Auto-imports

Nuxt auto-imports:
- Components from `components/`
- Composables from `composables/`
- Vue APIs (ref, computed, onMounted, etc.)
- Nuxt utilities (useRoute, useSeoMeta, useAsyncData, etc.)

No manual imports needed for these.

## AWS Amplify Deployment

Static site generates to `.output/public/`. The `amplify.yml` config handles:
- `npm ci` for dependencies
- `npm run generate` for SSG build
- Serves from `.output/public`

## Development Notes

### Adding Blog Posts

Create Markdown files in `content/blog/` with frontmatter:

```markdown
---
title: Post Title
description: Brief description
date: 2025-01-07
tags:
  - tag1
  - tag2
---

# Content here
```

### Animation Development

- All animation timelines should be killed in `onBeforeUnmount`
- Use `nextTick()` when animating elements that may not be in DOM yet
- Dynamic imports for GSAP in components: `const gsap = (await import('gsap')).default`

### Component Naming

- `TheNavigation.vue`, `TheFooter.vue` - Single-instance layout components
- `Home*.vue` - Home page section components
- `SectionBreaker.vue` - Reusable rotating text circle
