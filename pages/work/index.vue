<script setup lang="ts">
import projects from '~/data/projects'

useSeoMeta({
  title: 'Work — Kevin Jordan',
  description: 'Projects spanning AI agent systems, telecom platforms, fitness apps, and web development.'
})

const categories = ['all', 'ai', 'product', 'web'] as const
const activeCategory = ref<string>('all')

const filtered = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.category === activeCategory.value)
})
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
          AI agent systems, telecom platforms, consumer products, and web development.
          Everything from concept to production.
        </p>
      </div>

      <!-- Filter -->
      <div class="flex gap-6 mb-12 border-b border-text-muted/20 pb-4">
        <button
          v-for="cat in categories"
          :key="cat"
          class="font-mono text-mono-sm uppercase tracking-widest transition-colors duration-snappy"
          :class="activeCategory === cat ? 'text-accent' : 'text-text-muted hover:text-text-secondary'"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Project grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard
          v-for="project in filtered"
          :key="project.name"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>
