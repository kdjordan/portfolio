<script setup lang="ts">
import projects from '~/data/projects'

useSeoMeta({
  title: 'Work — Kevin Jordan',
  description: 'MockDeskAI — AI-powered design-to-proof automation for decorated apparel.'
})

const showcased = computed(() => projects.filter(project => project.featured))
</script>

<template>
  <div class="min-h-screen pt-32 pb-24">
    <div class="section-container">
      <!-- Page header -->
      <div class="mb-16">
        <h1 class="text-section font-display text-text-primary leading-tight mb-4">
          WORK
        </h1>
        <p class="text-body-lg text-text-secondary max-w-2xl">
          The current public showcase is focused on MockDeskAI: AI-powered
          design-to-proof automation for decorated apparel, shipping as both a
          desktop product and a webapp.
        </p>
      </div>

      <!-- Project grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard
          v-for="project in showcased"
          :key="project.name"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>
