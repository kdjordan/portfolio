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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProjectCard
        v-for="project in featured"
        :key="project.name"
        :project="project"
      />
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
