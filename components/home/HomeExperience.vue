<script setup lang="ts">
import { jobs } from '~/data/jobs'
</script>

<template>
  <section id="experience" class="section-container">
    <!-- Section header -->
    <div class="mb-12">
      <span class="text-accent text-label uppercase tracking-widest">Experience</span>
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
          <div class="experience-role">
            {{ job.title }}
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
  @apply flex justify-between items-baseline py-6 border-b border-text-muted/20;
  @apply transition-all duration-snappy ease-snappy;
}

.experience-item:first-child {
  @apply border-t;
}

.experience-item:hover {
  @apply pl-4 border-accent/50;
}

.experience-content {
  @apply flex flex-col md:flex-row md:items-baseline md:gap-4;
}

.experience-employer {
  @apply font-display text-section-sub text-text-primary uppercase tracking-wide;
  @apply transition-colors duration-snappy;
}

.experience-item:hover .experience-employer {
  @apply text-accent;
}

.experience-role {
  @apply text-body text-text-secondary mt-1 md:mt-0;
}

.experience-dates {
  @apply text-label text-text-muted uppercase tracking-widest;
  @apply hidden md:block;
}
</style>
