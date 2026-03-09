<script setup lang="ts">
import projects from '~/data/projects'

const featured = computed(() => projects.filter(p => p.featured))
</script>

<template>
  <section id="work" class="section-container dot-grid">
    <!-- Section header -->
    <div class="section-header">
      <span class="section-number">02</span>
      <span class="section-label">Featured Work</span>
    </div>

    <!-- Project grid -->
    <div class="project-grid">
      <div
        v-for="project in featured"
        :key="project.name"
        class="project-card group"
      >
        <!-- Image or gradient placeholder -->
        <div class="project-image">
          <img
            v-if="project.image"
            :src="`/image/${project.image}`"
            :alt="project.name"
            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div
            v-else
            class="w-full h-full bg-gradient-to-br from-bg-tertiary to-bg-secondary flex items-center justify-center"
          >
            <span class="font-display text-4xl text-text-muted/30">{{ project.name.charAt(0) }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="project-content">
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
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.techs"
              :key="tech"
              class="font-mono text-mono-sm text-text-muted px-2 py-0.5 border border-text-muted/20 rounded-sm"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex gap-4 mt-4" v-if="project.link || project.github">
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
    </div>

    <!-- View all link -->
    <div class="mt-16">
      <NuxtLink
        to="/work"
        class="font-mono text-mono-sm text-accent link-hover inline-flex items-center gap-2"
      >
        View all work &rarr;
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.project-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.project-card {
  @apply border border-text-muted/10 bg-bg-card transition-all duration-smooth;
}

.project-card:hover {
  @apply border-accent/30;
  box-shadow: 0 0 30px rgba(245, 166, 35, 0.08), 0 0 60px rgba(245, 166, 35, 0.04);
}

.project-image {
  @apply w-full h-48 overflow-hidden;
}

.project-content {
  @apply p-6;
}
</style>
