<script setup lang="ts">
const isOpen = ref(false)

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
]

const toggleMenu = async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    // Open menu
    gsap.to('#overlay', {
      x: 0,
      duration: 0.4,
      ease: 'power3.out'
    })
    gsap.to('.nav-link', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
      delay: 0.2,
      ease: 'power3.out'
    })
  } else {
    // Close menu
    gsap.to('.nav-link', {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.2,
      ease: 'power2.in'
    })
    gsap.to('#overlay', {
      x: '100%',
      duration: 0.4,
      delay: 0.2,
      ease: 'power3.in'
    })
  }
}

const handleNavClick = () => {
  if (isOpen.value) {
    toggleMenu()
  }
}
</script>

<template>
  <header class="nav-header">
    <nav class="nav-container section-container">
      <!-- Logo -->
      <a href="#" class="nav-logo">
        <span class="font-display text-2xl text-text-primary">KJ</span>
      </a>

      <!-- Hamburger -->
      <button
        class="nav-hamburger"
        :class="{ 'is-open': isOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </nav>

    <!-- Overlay menu -->
    <div
      id="overlay"
      class="nav-overlay"
    >
      <ul class="nav-menu">
        <li
          v-for="link in navLinks"
          :key="link.name"
          class="nav-link"
        >
          <a
            :href="link.href"
            class="nav-menu-link"
            @click="handleNavClick"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.nav-header {
  @apply fixed top-0 left-0 w-full z-50;
}

.nav-container {
  @apply flex justify-between items-center h-20;
}

.nav-logo {
  @apply relative z-50;
  @apply transition-opacity duration-snappy;
}

.nav-logo:hover {
  @apply opacity-70;
}

/* Hamburger */
.nav-hamburger {
  @apply relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-2;
  @apply cursor-pointer;
}

.hamburger-line {
  @apply block h-[2px] bg-text-primary;
  @apply transition-all duration-smooth ease-snappy;
}

.hamburger-line:first-child {
  @apply w-8;
}

.hamburger-line:last-child {
  @apply w-5;
}

.nav-hamburger:hover .hamburger-line {
  @apply bg-accent;
}

.nav-hamburger:hover .hamburger-line:last-child {
  @apply w-8;
}

/* Open state */
.nav-hamburger.is-open .hamburger-line:first-child {
  @apply rotate-45 translate-y-[5px];
}

.nav-hamburger.is-open .hamburger-line:last-child {
  @apply -rotate-45 -translate-y-[5px] w-8;
}

/* Overlay */
.nav-overlay {
  @apply fixed inset-0 bg-bg-primary z-40;
  transform: translateX(100%);
}

.nav-menu {
  @apply flex flex-col justify-center items-center h-full gap-8;
}

.nav-link {
  opacity: 0;
  transform: translateY(20px);
}

.nav-menu-link {
  @apply font-display text-6xl md:text-8xl text-text-primary uppercase;
  @apply transition-colors duration-snappy;
}

.nav-menu-link:hover {
  @apply text-accent;
}
</style>
