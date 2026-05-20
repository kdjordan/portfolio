<script setup lang="ts">
const featuredProjects = [
  {
    name: 'MockDeskAI',
    label: 'Design-to-proof automation',
    domain: 'mockdeskai.com',
    href: 'https://mockdeskai.com',
    status: 'v0.1 shipping',
    outcome: 'AI-powered proof generation for decorated apparel: upload a PSD or image, mask the regions to change, describe edits in plain text, and generate pixel-accurate variants through provider-agnostic inpainting.',
    techs: ['Electron', 'React 19', 'Fastify', 'Ideogram']
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
        <h2>One product, built for a real workflow.</h2>
        <p>
          MockDeskAI is the only project I am showcasing right now: a desktop
          and web product for apparel reps who need to turn design changes into
          production-ready proofs without rebuilding mockups by hand.
        </p>

        <div class="work-proof">
          <div>
            <span>1</span>
            <p>product showcased</p>
          </div>
          <div>
            <span>2</span>
            <p>surfaces shipping</p>
          </div>
        </div>

        <a
          href="https://mockdeskai.com"
          target="_blank"
          rel="noopener noreferrer"
          class="work-link"
        >
          Visit MockDeskAI &rarr;
        </a>
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
