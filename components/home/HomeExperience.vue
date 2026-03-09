<script setup lang="ts">
import { jobs } from '~/data/jobs'
</script>

<template>
  <section id="experience" class="section-container">
    <!-- Section header -->
    <div class="section-header">
      <span class="section-number">04</span>
      <span class="section-label">Experience</span>
    </div>

    <!-- Timeline -->
    <div class="experience-list">
      <div
        v-for="(job, index) in jobs"
        :key="index"
        class="experience-item group"
      >
        <div class="experience-content">
          <div class="experience-employer">
            {{ job.employer }}
          </div>
          <div class="experience-meta">
            <span class="experience-role">{{ job.title }}</span>
            <span class="experience-brief">{{ job.brief }}</span>
          </div>
        </div>
        <div class="experience-dates">
          {{ job.dates }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-list {
  @apply space-y-0;
}

.experience-item {
  @apply flex justify-between items-start py-6 border-b border-text-muted/20;
  @apply transition-all duration-snappy ease-snappy;
}

.experience-item:first-child {
  @apply border-t;
}

.experience-item:hover {
  @apply pl-4 border-accent/30;
  background: linear-gradient(90deg, rgba(245, 166, 35, 0.02) 0%, transparent 50%);
}

.experience-content {
  @apply flex flex-col md:flex-row md:items-start gap-2 md:gap-8 flex-1;
}

.experience-employer {
  @apply font-display text-section-sub text-text-primary uppercase tracking-wide;
  @apply transition-colors duration-snappy;
  @apply md:w-48 md:shrink-0;
}

.experience-item:hover .experience-employer {
  @apply text-accent;
}

.experience-meta {
  @apply flex flex-col gap-1;
}

.experience-role {
  @apply font-mono text-mono-sm text-text-secondary uppercase tracking-wide;
}

.experience-brief {
  @apply text-body-sm text-text-muted mt-1 leading-relaxed;
  @apply max-w-xl;
}

.experience-dates {
  @apply font-mono text-mono-sm text-text-muted uppercase tracking-widest;
  @apply hidden md:block md:shrink-0;
}
</style>
