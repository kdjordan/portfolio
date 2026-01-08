<script setup lang="ts">
const emit = defineEmits<{
  complete: []
}>()

const isVisible = ref(true)
const isReady = ref(false)

onMounted(async () => {
  if (!import.meta.client) return

  // Wait for DOM to be ready
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(resolve))

  isReady.value = true

  const gsap = (await import('gsap')).default

  // Let the red screen sit for a moment
  await new Promise(resolve => setTimeout(resolve, 300))

  const tl = gsap.timeline({
    onComplete: () => {
      // Delay before hiding to let hero animate in
      setTimeout(() => {
        isVisible.value = false
      }, 100)
      emit('complete')
    }
  })

  // Reveal K upward - slower
  tl.to('.letter-k', {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1,
    ease: 'power2.out'
  })

  // Reveal J downward - slower, more overlap
  tl.to('.letter-j', {
    clipPath: 'inset(0 0 0% 0)',
    duration: 1,
    ease: 'power2.out'
  }, '-=0.6')

  // Hold to appreciate the logo
  tl.to({}, { duration: 0.8 })

  // Swipe curtain up - slower, smoother
  tl.to('.splash-curtain', {
    yPercent: -100,
    duration: 1.2,
    ease: 'power2.inOut'
  })
})
</script>

<template>
  <div
    v-if="isVisible"
    class="splash-curtain"
    :class="{ 'splash-ready': isReady }"
  >
    <div class="splash-content">
      <span class="letter letter-k">K</span>
      <span class="letter letter-j">J</span>
    </div>
  </div>
</template>

<style scoped>
.splash-curtain {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: #ff2d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  will-change: transform;
}

.splash-curtain.splash-ready {
  opacity: 1;
}

.splash-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.02em;
}

.letter {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 20vw, 12rem);
  color: #050505;
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.02em;
  will-change: clip-path;
}

.letter-k {
  clip-path: inset(100% 0 0 0);
}

.letter-j {
  clip-path: inset(0 0 100% 0);
}
</style>
