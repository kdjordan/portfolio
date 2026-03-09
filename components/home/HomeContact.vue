<script setup lang="ts">
const links = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kevin-dean-jordan/',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/kdjordan',
  },
  {
    name: 'X',
    href: 'https://x.com/',
  },
]
</script>

<template>
  <section id="contact" class="section-container min-h-[60vh] flex flex-col justify-center">
    <!-- Section header -->
    <div class="section-header">
      <span class="section-number">06</span>
      <span class="section-label">Contact</span>
    </div>

    <!-- Main message -->
    <div class="max-w-3xl mb-12">
      <h2 class="text-section font-display text-text-primary leading-tight">
        LET'S BUILD<br />
        <span class="text-accent">SOMETHING.</span>
      </h2>
    </div>

    <!-- Email CTA -->
    <div class="mb-12">
      <a
        href="mailto:k.dean.jordan@gmail.com"
        class="email-cta inline-block font-mono text-body text-accent border border-accent px-8 py-4 hover:bg-accent hover:text-bg-primary transition-all duration-smooth"
      >
        k.dean.jordan@gmail.com
      </a>
    </div>

    <!-- Social links -->
    <ul class="flex items-center gap-8">
      <li v-for="link in links" :key="link.name">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-mono-sm text-text-muted link-hover uppercase tracking-widest"
        >
          {{ link.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.email-cta:hover {
  box-shadow: 0 0 30px rgba(245, 166, 35, 0.25), 0 0 60px rgba(245, 166, 35, 0.1);
}
</style>
