<script setup lang="ts">
const emit = defineEmits<{
  animationComplete: []
}>()

const heroRef = ref<HTMLElement | null>(null)
const firstLineRef = ref<HTMLElement | null>(null)
const lastLineRef = ref<HTMLElement | null>(null)

const firstName = 'KEVIN'
const lastName = 'JORDAN'

const firstSize = ref(100)
const lastSize = ref(100)

const stats = [
  { target: 25, suffix: '+', label: 'Years Building' },
  { target: 7, suffix: '', label: 'Companies' },
]

const displayValues = ref(stats.map(() => 0))

// Measure text at a base size, then scale to fill container width
function fitText(el: HTMLElement, sizeRef: Ref<number>) {
  const container = el.parentElement!.clientWidth
  // Temporarily shrink-to-fit to measure true text width (overflow:hidden clips scrollWidth)
  const origDisplay = el.style.display
  const origWidth = el.style.width
  const origOverflow = el.style.overflow
  el.style.display = 'inline-block'
  el.style.width = 'max-content'
  el.style.overflow = 'visible'
  el.style.fontSize = '200px'
  const measured = el.getBoundingClientRect().width
  // Restore
  el.style.display = origDisplay
  el.style.width = origWidth
  el.style.overflow = origOverflow
  const fit = Math.floor(200 * (container / measured))
  sizeRef.value = fit
  el.style.fontSize = fit + 'px'
}

function fitAll() {
  if (!firstLineRef.value || !lastLineRef.value) return

  // Step 1: Fit each word to container width independently
  fitText(firstLineRef.value, firstSize)
  fitText(lastLineRef.value, lastSize)

  // Step 2: Check if combined height exceeds available viewport space
  const navHeight = 120 // nav + generous breathing room
  const bottomHeight = 220 // subtitle + stats + scroll indicator + padding
  const availableHeight = window.innerHeight - navHeight - bottomHeight
  const titleEl = firstLineRef.value.parentElement!
  const currentHeight = titleEl.getBoundingClientRect().height

  if (currentHeight > availableHeight) {
    const scale = availableHeight / currentHeight
    firstSize.value = Math.floor(firstSize.value * scale)
    lastSize.value = Math.floor(lastSize.value * scale)
    firstLineRef.value.style.fontSize = firstSize.value + 'px'
    lastLineRef.value.style.fontSize = lastSize.value + 'px'
  }
}

let resizeTimer: ReturnType<typeof setTimeout>
function onResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(fitAll, 100)
}

onMounted(async () => {
  if (!import.meta.client) return
  // Explicitly load Bebas Neue before measuring
  try {
    await document.fonts.load('200px "Bebas Neue"')
  } catch {}
  // Extra frame to ensure font is rendered
  await new Promise(r => requestAnimationFrame(r))
  fitAll()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

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
    duration: 0.3,
    ease: 'power2.out'
  })

  // KEVIN — each letter slides up from mask with slight rotation
  tl.fromTo('.hero-first .hero-char',
    { y: '120%', rotate: 5, scaleY: 1.1 },
    {
      y: '0%',
      rotate: 0,
      scaleY: 1,
      duration: 1.0,
      stagger: 0.09,
      ease: 'power4.out'
    },
    '-=0.2'
  )

  // JORDAN — each letter slides up, overlapping timing
  tl.fromTo('.hero-last .hero-char',
    { y: '120%', rotate: -3, scaleY: 1.1 },
    {
      y: '0%',
      rotate: 0,
      scaleY: 1,
      duration: 1.0,
      stagger: 0.09,
      ease: 'power4.out'
    },
    '-=0.6'
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
    '-=0.3'
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
      delay: 1.2 + (i * 0.12),
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
    <!-- Everything in one flow block, centered vertically -->
    <div class="hero-content">
      <h1 class="hero-title">
        <!-- KEVIN -->
        <span
          ref="firstLineRef"
          class="hero-line hero-first"
          :style="{ fontSize: firstSize + 'px' }"
        >
          <span
            v-for="(char, i) in firstName"
            :key="'f' + i"
            class="hero-char"
          >{{ char }}</span>
        </span>

        <!-- JORDAN -->
        <span
          ref="lastLineRef"
          class="hero-line hero-last"
          :style="{ fontSize: lastSize + 'px' }"
        >
          <span
            v-for="(char, i) in lastName"
            :key="'l' + i"
            class="hero-char"
          >{{ char }}</span>
        </span>
      </h1>

      <!-- Subtitle + stats aligned with nav via section-container -->
      <div class="section-container hero-info">
        <p class="hero-subtitle">
          <span class="text-accent font-mono text-mono-sm">//</span>
          Technical Founder. Builder. AI Systems.
        </p>

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
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  @apply relative min-h-screen flex flex-col justify-center;
  opacity: 0;
}

/* Full-bleed content — px matches section-container (px-6 md:px-12) for nav alignment */
.hero-content {
  @apply w-full px-6 md:px-12;
}

/* Title block */
.hero-title {
  @apply relative;
}

/* Each name row — overflow hidden for mask reveal */
.hero-line {
  @apply block overflow-hidden text-center;
  line-height: 0.88;
  height: 0.88em;
}

.hero-last {
  margin-top: 0.02em;
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
  @apply font-body text-hero-sub text-text-secondary tracking-wide mt-6;
}

/* Stats */
.hero-stats {
  @apply flex gap-12 mt-6 pt-6 border-t border-text-muted/20;
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
  @apply flex flex-col items-center gap-3 mt-8;
  opacity: 0;
}

.scroll-text {
  @apply text-label text-text-muted uppercase tracking-widest;
}

.scroll-line {
  @apply w-px h-10 bg-gradient-to-b from-accent/50 to-transparent;
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
  .hero-content {
    @apply px-6;
  }

  .hero-stats {
    @apply flex-col gap-4;
  }

  .scroll-indicator {
    @apply hidden;
  }
}
</style>
