<script setup lang="ts">
const emit = defineEmits<{
  animationComplete: []
}>()

const proofPoints = [
  { value: '25+', label: 'years shipping' },
  { value: '24/7', label: 'agents running' },
  { value: '7', label: 'companies built' },
]

const activeSystems = [
  'AI agent infrastructure',
  'Telecom operations tooling',
  'Content and research pipelines',
]

const animateIn = async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    gsap.set(
      ['.hero-kicker', '.hero-title', '.hero-copy', '.hero-actions', '.hero-proof', '.proof-item', '.hero-track'],
      { opacity: 1, y: 0, clearProps: 'transform' }
    )
    emit('animationComplete')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => emit('animationComplete')
  })

  tl.to('.hero-section', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })

  tl.fromTo(
    ['.hero-kicker', '.hero-title', '.hero-copy', '.hero-actions'],
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.08,
      ease: 'power3.out'
    },
    '-=0.05'
  )

  tl.fromTo(
    '.hero-proof',
    { y: 14, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.25,
      ease: 'power3.out'
    },
    '-=0.2'
  )

  tl.fromTo(
    '.proof-item',
    { y: 14, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power3.out'
    },
    '-=0.2'
  )

  tl.fromTo(
    '.hero-track',
    { y: 18, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out'
    },
    '-=0.18'
  )
}

defineExpose({ animateIn })
</script>

<template>
  <section class="hero-section">
    <div class="section-container">
      <div class="hero-layout">
        <div class="hero-main">
          <p class="hero-kicker">
            Kevin Jordan / Technical founder
          </p>

          <h1 class="hero-title">
            I build AI systems and operator tools that survive real work.
          </h1>

          <p class="hero-copy">
            I turn messy business operations into production software: agent systems,
            telecom analytics, internal command centers, and the infrastructure that
            keeps them running when the demo is over.
          </p>

          <div class="hero-actions">
            <a href="#work" class="hero-button hero-button-primary">
              View work
            </a>
            <NuxtLink to="/blog" class="hero-button hero-button-secondary">
              Read writing
            </NuxtLink>
          </div>
        </div>

        <div class="hero-proof" aria-label="Proof points">
          <div
            v-for="point in proofPoints"
            :key="point.label"
            class="proof-item"
          >
            <span class="proof-value">{{ point.value }}</span>
            <span class="proof-label">{{ point.label }}</span>
          </div>
        </div>

        <div class="hero-track">
          <span class="track-label">Currently building</span>
          <ul class="track-list">
            <li v-for="system in activeSystems" :key="system">
              {{ system }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  @apply relative min-h-screen overflow-hidden;
  background:
    radial-gradient(circle at 10% 20%, rgba(44, 190, 180, 0.16), transparent 28rem),
    radial-gradient(circle at 80% 18%, rgba(245, 166, 35, 0.16), transparent 26rem),
    linear-gradient(135deg, #050505 0%, #07100f 42%, #10100a 100%);
}

.hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 82%);
}

.hero-layout {
  @apply relative z-10 min-h-screen flex flex-col justify-end pt-28 pb-10;
}

.hero-main {
  @apply max-w-4xl;
}

.hero-kicker,
.hero-title,
.hero-copy,
.hero-actions,
.hero-proof,
.proof-item,
.hero-track {
  opacity: 0;
}

.hero-kicker,
.hero-title,
.hero-copy,
.hero-actions {
  transform: translateY(18px);
}

.hero-proof,
.proof-item {
  transform: translateY(14px);
}

.hero-track {
  transform: translateY(18px);
}

.hero-kicker {
  @apply font-mono text-mono-sm uppercase text-accent tracking-widest mb-5;
  letter-spacing: 0;
}

.hero-title {
  @apply font-display text-text-primary font-semibold leading-none;
  font-size: 4.75rem;
  max-width: 13ch;
  letter-spacing: 0;
}

.hero-copy {
  @apply text-text-secondary leading-relaxed mt-7 max-w-2xl;
  font-size: 1.15rem;
}

.hero-actions {
  @apply flex flex-wrap gap-3 mt-8;
}

.hero-button {
  @apply inline-flex items-center justify-center border px-5 py-3 font-mono text-mono-sm uppercase transition-colors duration-snappy;
  min-height: 2.875rem;
  letter-spacing: 0;
}

.hero-button-primary {
  @apply border-accent bg-accent text-bg-primary;
}

.hero-button-primary:hover {
  @apply bg-text-primary border-text-primary;
}

.hero-button-secondary {
  @apply border-text-muted/50 text-text-primary bg-bg-primary/30;
}

.hero-button-secondary:hover {
  @apply border-frost text-frost;
}

.hero-proof {
  @apply grid grid-cols-3 gap-px mt-14 max-w-3xl bg-white/10;
}

.proof-item {
  @apply bg-bg-primary/75 px-5 py-4;
  backdrop-filter: blur(10px);
}

.proof-value {
  @apply block font-display text-text-primary font-semibold;
  font-size: 2rem;
}

.proof-label {
  @apply block font-mono text-mono-sm text-text-muted uppercase mt-1;
  letter-spacing: 0;
}

.hero-track {
  @apply mt-10 border-t border-white/10 pt-5 flex flex-col gap-4;
}

.track-label {
  @apply font-mono text-mono-sm text-text-muted uppercase;
  letter-spacing: 0;
}

.track-list {
  @apply grid grid-cols-1 md:grid-cols-3 gap-3;
}

.track-list li {
  @apply text-body-sm text-text-secondary border-l border-frost/40 pl-3;
}

@media (max-width: 900px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 640px) {
  .hero-layout {
    @apply pt-24 pb-8;
  }

  .hero-title {
    font-size: 2.65rem;
    max-width: 11ch;
  }

  .hero-copy {
    font-size: 1rem;
  }

  .hero-proof {
    @apply grid-cols-1 mt-10;
  }

  .hero-button {
    @apply w-full;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-kicker,
  .hero-title,
  .hero-copy,
  .hero-actions,
  .hero-proof,
  .proof-item,
  .hero-track {
    opacity: 1;
    transform: none;
  }
}
</style>
