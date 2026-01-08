<script setup lang="ts">
const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/kdjordan',
    icon: 'fa-brands fa-github'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kevin-dean-jordan/',
    icon: 'fa-brands fa-linkedin'
  },
  {
    name: 'Email',
    href: 'mailto:k.dean.jordan@gmail.com',
    icon: 'fa-solid fa-envelope'
  }
]
</script>

<template>
  <section id="contact" class="section-container min-h-[50vh] flex flex-col justify-center">
    <!-- Section header -->
    <div class="mb-12">
      <span class="text-accent text-label uppercase tracking-widest">Contact</span>
    </div>

    <!-- Main message -->
    <div class="max-w-3xl mb-16">
      <h2 class="text-section font-display text-text-primary leading-tight">
        LET'S BUILD<br />
        <span class="text-accent">SOMETHING.</span>
      </h2>
    </div>

    <!-- Links -->
    <ul class="flex items-center gap-12">
      <li v-for="link in links" :key="link.name">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link group"
          :aria-label="link.name"
        >
          <font-awesome-icon
            :icon="link.icon"
            class="contact-icon"
          />
          <span class="contact-label">{{ link.name }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.contact-link {
  @apply flex flex-col items-center gap-3;
  @apply transition-transform duration-snappy ease-snappy;
}

.contact-link:hover {
  @apply -translate-y-1;
}

.contact-icon {
  @apply text-3xl md:text-4xl text-text-primary;
  @apply transition-colors duration-snappy;
}

.contact-link:hover .contact-icon {
  @apply text-accent;
}

.contact-label {
  @apply text-label text-text-muted uppercase tracking-widest;
  @apply opacity-0 transition-opacity duration-snappy;
}

.contact-link:hover .contact-label {
  @apply opacity-100;
}
</style>
