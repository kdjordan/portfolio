<script setup lang="ts">
import type { Project } from '~/data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div class="project-card group">
    <!-- Image -->
    <div class="card-image">
      <img
        v-if="project.image"
        :src="`/image/${project.image}`"
        :alt="project.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-bg-tertiary to-bg-secondary flex items-center justify-center"
      >
        <span class="font-display text-5xl text-text-muted/20">{{ project.name.charAt(0) }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="card-content">
      <div class="flex items-baseline justify-between gap-4 mb-3">
        <h3 class="font-display text-section-sub text-text-primary uppercase group-hover:text-accent transition-colors duration-snappy">
          {{ project.name }}
        </h3>
        <span class="font-mono text-mono-sm text-text-muted uppercase shrink-0">
          {{ project.category }}
        </span>
      </div>

      <p class="text-body-sm text-text-secondary mb-4 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.techs"
          :key="tech"
          class="font-mono text-mono-sm text-text-muted px-2 py-0.5 border border-text-muted/20 rounded-sm"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex gap-4" v-if="project.link || project.github">
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-mono-sm text-accent link-hover"
        >
          Visit &rarr;
        </a>
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-mono-sm text-text-muted link-hover"
        >
          Source
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  @apply border border-text-muted/10 bg-bg-card transition-all duration-smooth;
}

.project-card:hover {
  @apply border-accent/30;
  box-shadow: 0 0 30px rgba(245, 166, 35, 0.08), 0 0 60px rgba(245, 166, 35, 0.04);
}

.card-image {
  @apply w-full h-48 overflow-hidden;
}

.card-content {
  @apply p-6;
}
</style>
