<script setup lang="ts">
const emit = defineEmits<{
  animationComplete: []
}>()

const heroRef = ref<HTMLElement | null>(null)

// Animate hero entrance after splash
const animateIn = async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default

  const tl = gsap.timeline({
    onComplete: () => {
      emit('animationComplete')
    }
  })

  // Fade in the whole section first
  tl.to('.hero-section', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })

  // Animate title lines sliding up
  tl.fromTo('.hero-line',
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15
    },
    '-=0.1'
  )

  // Animate subtitle
  tl.fromTo('.hero-subtitle',
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    },
    '-=0.5'
  )

  // Animate scroll indicator
  tl.fromTo('.scroll-indicator',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    },
    '-=0.3'
  )
}

// Expose animate method for parent to call
defineExpose({ animateIn })
</script>

<template>
  <section
    ref="heroRef"
    class="hero-section"
  >
    <div class="hero-content">
      <!-- Main title -->
      <h1 class="hero-title">
        <span class="hero-line block overflow-hidden">
          <span class="inline-block">KEVIN</span>
        </span>
        <span class="hero-line block overflow-hidden text-right">
          <span class="inline-block">JORDAN</span>
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle">
        <span class="text-accent">//</span>
        Builder of digital things
      </p>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  @apply relative min-h-screen flex flex-col justify-center;
  opacity: 0;
}

.hero-content {
  @apply w-full max-w-6xl mx-auto px-6 md:px-12;
}

.hero-title {
  @apply font-display text-hero leading-none tracking-tight text-text-primary;
}

.hero-line {
  @apply overflow-hidden;
}

.hero-subtitle {
  @apply font-body text-hero-sub text-text-secondary mt-8 tracking-wide;
}

/* Scroll indicator */
.scroll-indicator {
  @apply absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3;
  opacity: 0;
}

.scroll-text {
  @apply text-label text-text-muted uppercase tracking-widest;
}

.scroll-line {
  @apply w-px h-12 bg-gradient-to-b from-text-muted to-transparent;
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.2);
  }
}
</style>
