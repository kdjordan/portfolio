<template>
  <footer class="footer section-container py-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
      <span class="text-label text-text-muted">
        &copy; {{ new Date().getFullYear() }} Kevin Jordan
      </span>

      <div class="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/kevin-dean-jordan/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-label text-text-muted link-hover"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/kdjordan_io"
          target="_blank"
          rel="noopener noreferrer"
          class="text-label text-text-muted link-hover"
        >
          X
        </a>
        <a
          href="https://github.com/kdjordan"
          target="_blank"
          rel="noopener noreferrer"
          class="text-label text-text-muted link-hover"
        >
          GitHub
        </a>
      </div>

      <span class="font-mono text-mono-sm text-text-muted">
        Built with Nuxt, Claude Code &amp; GSAP
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply border-t border-text-muted/10;
}
</style>
