<script setup lang="ts">
const featuredProjects = [
  {
    name: 'ReconcileCDR',
    label: 'CDRcompare rebrand',
    domain: 'reconcilecdr.com',
    href: 'https://reconcilecdr.com',
    status: 'Production',
    outcome: 'Web-based VoIP CDR reconciliation: upload two call files, auto-map columns, find missing and mismatched calls, quantify monetary impact, and export PDF reports.',
    techs: ['Next.js 16', 'React 19', 'Drizzle', 'BullMQ']
  },
  {
    name: 'VoIP Accelerator',
    label: 'Rate and LERG ops',
    domain: 'voipaccelerator.com',
    href: 'https://voipaccelerator.com',
    status: 'Production',
    outcome: 'Operator tool for LERG data, US/AZ rate sheets, NANP categorization, and pricing comparisons used inside the telecom workflow.',
    techs: ['Vue 3', 'TypeScript', 'Pinia', 'Supabase']
  },
  {
    name: 'TelcoOS Webapp',
    label: 'Customer AI workspace',
    domain: 'telcoos.io',
    href: 'https://telcoos.io',
    status: 'Production',
    outcome: 'Customer-hosted Claude Code workspace with WebSocket-streamed sessions, chat history, per-customer storage, and a browser terminal.',
    techs: ['React', 'Express', 'WebSocket', 'SQLite']
  },
  {
    name: 'SIP Reasoner',
    label: 'Rejected call AI',
    domain: 'Offline harness',
    href: null,
    status: 'Phase 1',
    outcome: 'AI answering-service pipeline for rejected inbound SIP calls, classifying caller intent and collecting fraud-intelligence transcripts before real traffic.',
    techs: ['Python', 'uv', 'Stdlib harness', 'SIP']
  },
  {
    name: 'GRHIIT Web',
    label: 'Fitness content site',
    domain: 'grhiit.com',
    href: 'https://grhiit.com',
    status: 'Pre-launch',
    outcome: 'Brutalist marketing and content site for the GRHIIT bodyweight HIIT methodology, with Nuxt Content articles and a ConvertKit-ready waitlist.',
    techs: ['Nuxt 3', 'Vue 3', 'Tailwind', 'Amplify']
  },
  {
    name: 'GRHIIT App',
    label: 'Mobile training app',
    domain: 'iOS / Android',
    href: null,
    status: 'Beta polish',
    outcome: 'Expo mobile product for 20s work / 10s rest bodyweight HIIT sessions, local-first workouts, identity check-ins, post-session sharing, and stats sync.',
    techs: ['Expo', 'React Native', 'Firebase', 'Zustand']
  }
]
</script>

<template>
  <section id="work" class="section-container work-section dot-grid">
    <div class="section-header">
      <span class="section-number">02</span>
      <span class="section-label">Featured Work</span>
    </div>

    <div class="work-shell">
      <div class="work-summary">
        <p class="work-kicker">Selected systems</p>
        <h2>Production work, built for operators.</h2>
        <p>
          The projects worth featuring are the ones closest to real usage:
          telecom reconciliation, rate operations, customer AI workspaces,
          SIP automation, and a separate fitness product line.
        </p>

        <div class="work-proof">
          <div>
            <span>6</span>
            <p>systems highlighted</p>
          </div>
          <div>
            <span>3</span>
            <p>operating domains</p>
          </div>
        </div>

        <NuxtLink
          to="/work"
          class="work-link"
        >
          View all work &rarr;
        </NuxtLink>
      </div>

      <div class="work-list">
        <a
          v-for="(project, index) in featuredProjects"
          :key="project.name"
          :href="project.href || undefined"
          :target="project.href ? '_blank' : undefined"
          :rel="project.href ? 'noopener noreferrer' : undefined"
          class="work-item group"
        >
          <span class="work-index">{{ String(index + 1).padStart(2, '0') }}</span>

          <div class="work-copy">
            <span class="work-label">{{ project.label }}</span>
            <h3>{{ project.name }}</h3>
            <span class="work-domain">{{ project.domain }} / {{ project.status }}</span>
            <p>{{ project.outcome }}</p>
          </div>

          <div class="work-meta">
            <span
              v-for="tech in project.techs.slice(0, 4)"
              :key="tech"
            >
              {{ tech }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-shell {
  @apply grid grid-cols-1 lg:grid-cols-[0.38fr_1fr] gap-10 lg:gap-16;
}

.work-summary {
  @apply lg:sticky lg:top-28 self-start;
}

.work-kicker {
  @apply font-mono text-mono-sm uppercase text-accent mb-4;
  letter-spacing: 0;
}

.work-summary h2 {
  @apply font-display text-text-primary leading-tight mb-5;
  font-size: clamp(2.2rem, 4vw, 4.25rem);
  letter-spacing: 0;
}

.work-summary > p {
  @apply text-body-sm text-text-secondary leading-relaxed max-w-md;
}

.work-proof {
  @apply grid grid-cols-2 gap-px mt-8 mb-8 bg-text-muted/15 max-w-md;
}

.work-proof div {
  @apply bg-bg-primary/80 p-4;
}

.work-proof span {
  @apply block font-display text-text-primary font-semibold;
  font-size: 2rem;
}

.work-proof p {
  @apply font-mono text-mono-sm text-text-muted uppercase mt-1;
  letter-spacing: 0;
}

.work-link {
  @apply font-mono text-mono-sm text-accent inline-flex items-center gap-2 relative;
}

.work-link::after {
  content: '';
  @apply absolute left-0 -bottom-1 w-0 h-px bg-accent transition-all duration-snappy;
}

.work-link:hover::after {
  @apply w-full;
}

.work-list {
  @apply border-t border-text-muted/20;
}

.work-item {
  @apply grid grid-cols-1 md:grid-cols-[3.5rem_1fr] xl:grid-cols-[3.5rem_1fr_0.42fr] gap-4 md:gap-6 py-6 border-b border-text-muted/20;
  @apply transition-all duration-snappy;
}

.work-item:hover {
  @apply border-accent/35;
}

.work-index {
  @apply font-mono text-mono-sm text-text-muted pt-1 transition-colors duration-snappy;
  letter-spacing: 0;
}

.work-item:hover .work-index {
  @apply text-accent;
}

.work-copy {
  @apply max-w-2xl;
}

.work-label {
  @apply font-mono text-mono-sm text-text-muted uppercase;
  letter-spacing: 0;
}

.work-copy h3 {
  @apply font-display text-section-sub text-text-primary group-hover:text-accent transition-colors duration-snappy;
  @apply mt-1;
}

.work-domain {
  @apply block font-mono text-mono-sm text-accent mt-2 mb-3;
  letter-spacing: 0;
}

.work-copy p {
  @apply text-body-sm text-text-secondary leading-relaxed max-w-2xl;
}

.work-meta {
  @apply flex flex-wrap content-start gap-2 md:pl-[4.75rem] xl:pl-0;
}

.work-meta span {
  @apply font-mono text-mono-sm text-text-muted px-2 py-0.5 border border-text-muted/20 bg-bg-primary/40;
}

@media (max-width: 640px) {
  .work-summary h2 {
    font-size: 2.45rem;
  }

  .work-proof {
    @apply grid-cols-1;
  }

  .work-item {
    @apply py-8;
  }

  .work-meta {
    @apply pl-0;
  }
}
</style>
