<template>
  <footer class="footer section-container py-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <span class="text-label text-text-muted">
        KJ &copy; {{ new Date().getFullYear() }}
      </span>
      <span class="text-label text-text-muted">
        Built with Nuxt, Three.js &amp; GSAP
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply border-t border-text-muted/10;
}
</style>
