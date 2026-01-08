<script setup lang="ts">
// Navigation animation will be triggered after splash completes
</script>

<template>
  <div class="min-h-screen bg-bg-primary">
    <TheNavigation />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style>
/* Ensure smooth scrolling handled by Lenis */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
