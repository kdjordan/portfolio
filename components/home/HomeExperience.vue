<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { jobs } from '~/data/jobs'

const experienceRef = ref<HTMLElement | null>(null)
const hasScrolled = ref(false)

const handleScroll = () => {
  if (!experienceRef.value) return

  const rect = experienceRef.value.getBoundingClientRect()
  const triggerPoint = window.innerHeight * 0.8

  if (rect.top < triggerPoint) {
    hasScrolled.value = true
  }
}

onMounted(() => {
  if (!import.meta.client) return

  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial position
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <section
    ref="experienceRef"
    id="experience"
    class="w-full flex flex-col transition-all duration-700"
    :class="{ 'opacity-0 translate-y-10': !hasScrolled, 'opacity-100 translate-y-0': hasScrolled }"
    style="scroll-margin-top: 350px"
  >
    <!-- Each job row -->
    <div
      v-for="(job, index) in jobs"
      :key="index"
      class="flex justify-between items-center py-8 border-t border-white/70 last:border-b"
    >
      <div class="font-oswald text-lg md:text-2xl tracking-widest uppercase text-stone-300">
        {{ job.employer }}
      </div>
      <div class="font-oswald text-base md:text-xl tracking-wider uppercase text-stone-400 text-right ml-4">
        {{ job.title }}
      </div>
    </div>
  </section>
</template>
