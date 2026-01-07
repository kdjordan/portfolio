<template>
  <div
    class="section-breaker relative w-full h-[200px] flex items-center justify-center my-32 transition-all duration-700"
    :class="
      useScrollAnimation ? { 'opacity-0 translate-y-10': !hasScrolled, 'opacity-100 translate-y-0': hasScrolled } : {}
    "
    ref="sectionRef"
  >
    <!-- Fixed Center Letter Container -->
    <span
      v-if="centerLetter"
      class="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[4rem] font-bold"
    >
      {{ centerLetter.toUpperCase() }}
    </span>

    <div
      ref="textCircle"
      class="text-circle"
    >
      <!-- Rotating Text -->
      <span
        v-for="(letter, index) in circularText"
        :key="index"
        class="absolute left-1/2 text-white text-lg"
        :style="`
          transform-origin: 0 100px;
          transform: rotate(${index * rotationPerLetter}deg) translateX(-50%);
        `"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount, onUnmounted } from 'vue'

const props = defineProps<{
  text: string
  centerLetter?: string
  useScrollAnimation?: boolean
}>()

const textCircle = ref<HTMLElement | null>(null)
const tl = ref<gsap.core.Timeline | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const hasScrolled = ref(false)

const circularText = computed(() => {
  return (props.text + ' ' + props.text + ' ').toUpperCase().split('')
})

const rotationPerLetter = computed(() => {
  return 360 / circularText.value.length
})

const handleScroll = () => {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const triggerPoint = window.innerHeight * 0.8 // Show when element is 80% up the screen

  if (rect.top < triggerPoint) {
    hasScrolled.value = true
  }
}

onMounted(async () => {
  // SSR guard
  if (!import.meta.client) return

  if (props.useScrollAnimation) {
    window.addEventListener('scroll', handleScroll)
    // Check initial position
    handleScroll()
  }

  if (textCircle.value) {
    const gsap = (await import('gsap')).default
    tl.value = gsap.timeline({ repeat: -1 }).to(textCircle.value, {
      rotation: -360,
      duration: 20,
      ease: 'none',
    })
  }
})

onBeforeUnmount(() => {
  if (tl.value) {
    tl.value.kill()
  }
})

onUnmounted(() => {
  if (props.useScrollAnimation && import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.text-circle {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
