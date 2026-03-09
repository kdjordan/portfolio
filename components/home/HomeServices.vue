<script setup lang="ts">
import { services } from '~/data/services'
</script>

<template>
  <section id="services" class="section-container dot-grid">
    <!-- Section header -->
    <div class="section-header">
      <span class="section-number">03</span>
      <span class="section-label">What I Do</span>
    </div>

    <!-- Services grid -->
    <div class="services-grid">
      <div
        v-for="service in services"
        :key="service.number"
        class="service-card group"
      >
        <span class="font-mono text-mono-sm text-accent mb-4 block">{{ service.number }}</span>
        <h3 class="font-display text-section-sub text-text-primary uppercase mb-4">
          {{ service.title }}
        </h3>
        <p class="text-body-sm text-text-secondary leading-relaxed">
          {{ service.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-px bg-text-muted/10;
}

.service-card {
  @apply p-8 bg-bg-primary transition-all duration-smooth;
}

.service-card:hover {
  @apply bg-bg-secondary;
  box-shadow: inset 0 0 30px rgba(245, 166, 35, 0.03);
}

.service-card:hover .font-mono {
  text-shadow: 0 0 10px rgba(245, 166, 35, 0.4);
}
</style>
