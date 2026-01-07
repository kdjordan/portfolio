<template>
  <section
    ref="aboutRef"
    id="about"
    class="w-full flex flex-col transition-all duration-700"
    :class="{
      'opacity-0 translate-y-10': !hasScrolled,
      'opacity-100 translate-y-0': hasScrolled,
    }"
    style="scroll-margin-top: 350px"
  >
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-1 gap-8">
        <div class="about-content flex flex-col gap-6">
          <p class="text-lg dark:text-gray-300">
            Hey, I'm Kevin. I've always been a builder — whether that's
            companies, products, or tools. Over the years I've founded startups,
            launched side projects, and coached teams, but the common thread has
            been creating something new from scratch and pushing it out into the
            world.
          </p>
          <p class="text-lg dark:text-gray-300">
            These days I'm deep in the telecom world — leading U.S. operations
            at BTS, one of the largest wholesale VoIP carriers — while also
            building tools that help operators make sense of rates, routing, and
            strategy.
          </p>
          <p class="text-lg dark:text-gray-300">
            At the end of the day, I'm happiest when I'm creating — taking ideas
            off the whiteboard and turning them into something real.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const aboutRef = ref<HTMLElement | null>(null)
const hasScrolled = ref(false)

const handleScroll = () => {
  if (!aboutRef.value) return

  const rect = aboutRef.value.getBoundingClientRect()
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
