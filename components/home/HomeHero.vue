<script setup lang="ts">
const emit = defineEmits<{
  animationComplete: []
}>()

const heroRef = ref<HTMLElement | null>(null)

const firstName = 'KEVIN'
const lastName = 'JORDAN'

const stats = [
  { target: 25, suffix: '+', label: 'Years Building' },
  { target: 7, suffix: '', label: 'Companies' },
]

const displayValues = ref(stats.map(() => 0))

const animateIn = async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default

  const tl = gsap.timeline({
    onComplete: () => {
      emit('animationComplete')
    }
  })

  // Section fade in
  tl.to('.hero-section', {
    opacity: 1,
    duration: 0.2,
    ease: 'power2.out'
  })

  // KEVIN — each letter slides up from mask with slight rotation
  tl.fromTo('.hero-first .hero-char',
    { y: '120%', rotate: 6 },
    {
      y: '0%',
      rotate: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: 'power4.out'
    },
    '-=0.3'
  )

  // JORDAN — each letter slides up, overlapping timing
  tl.fromTo('.hero-last .hero-char',
    { y: '120%', rotate: -4 },
    {
      y: '0%',
      rotate: 0,
      duration: 0.7,
      stagger: 0.04,
      ease: 'power4.out'
    },
    '-=0.5'
  )

  // Subtitle
  tl.fromTo('.hero-subtitle',
    { y: 15, opacity: 0, filter: 'blur(4px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power3.out'
    },
    '-=0.2'
  )

  // Stats stagger in
  tl.fromTo('.hero-stat',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.08
    },
    '-=0.2'
  )

  // Count up stats
  stats.forEach((stat, i) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.target,
      duration: 1.5,
      delay: 1.0 + (i * 0.12),
      ease: 'power2.out',
      onUpdate: () => {
        displayValues.value[i] = Math.round(obj.val)
      }
    })
  })

  // Scroll indicator
  tl.fromTo('.scroll-indicator',
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    },
    '-=0.1'
  )
}

const formatStat = (index: number) => {
  const stat = stats[index]
  return `${displayValues.value[index]}${stat.suffix}`
}

defineExpose({ animateIn })
</script>

<template>
  <section
    ref="heroRef"
    class="hero-section dot-grid"
  >
    <div class="hero-content">
      <!-- Main title -->
      <h1 class="hero-title">
        <!-- KEVIN -->
        <span class="hero-line hero-first">
          <span
            v-for="(char, i) in firstName"
            :key="'f' + i"
            class="hero-char"
          >{{ char }}</span>
        </span>

        <!-- JORDAN -->
        <span class="hero-line hero-last">
          <span
            v-for="(char, i) in lastName"
            :key="'l' + i"
            class="hero-char"
          >{{ char }}</span>
        </span>
      </h1>

      <!-- Subtitle -->
      <p class="hero-subtitle">
        <span class="text-accent font-mono text-mono-sm">//</span>
        Technical Founder. Builder. AI Systems.
      </p>

      <!-- Stats -->
      <div class="hero-stats">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="hero-stat"
        >
          <span class="stat-value">{{ formatStat(index) }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
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

/* Title block */
.hero-title {
  @apply relative;
}

/* Each name row — overflow hidden for mask reveal */
.hero-line {
  @apply block overflow-hidden;
  font-size: clamp(4rem, 14vw, 12rem);
  line-height: 1.1;
  height: 1.1em;
}

.hero-first {
  @apply text-left;
}

.hero-last {
  @apply text-right;
  margin-top: 0.05em;
}

/* Individual characters — start offscreen behind mask */
.hero-char {
  @apply inline-block font-hero text-text-primary;
  font-size: inherit;
  letter-spacing: -0.02em;
  will-change: transform;
  transform: translateY(120%);
}

/* Subtitle */
.hero-subtitle {
  @apply font-body text-hero-sub text-text-secondary mt-10 tracking-wide;
}

/* Stats */
.hero-stats {
  @apply flex gap-12 mt-14 pt-8 border-t border-text-muted/20;
}

.hero-stat {
  @apply flex flex-col gap-1;
}

.stat-value {
  @apply font-display text-section-sub text-text-primary;
  min-width: 3ch;
}

.stat-label {
  @apply font-mono text-mono-sm text-text-muted uppercase tracking-widest;
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
  @apply w-px h-12 bg-gradient-to-b from-accent/50 to-transparent;
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

/* Mobile adjustments */
@media (max-width: 640px) {
  .hero-line {
    font-size: clamp(3.5rem, 16vw, 6rem);
    height: 1.1em;
  }

  .hero-stats {
    @apply flex-col gap-6;
  }

  .hero-last {
    @apply text-left;
    margin-top: 0;
  }

  .scroll-indicator {
    @apply hidden;
  }
}
</style>
