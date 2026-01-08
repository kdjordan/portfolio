<script setup lang="ts">
useSeoMeta({
  title: 'KJ - Kevin Jordan | Builder of Digital Things',
  description: 'Portfolio of Kevin Jordan - Iconoclastic developer, entrepreneur, and builder.'
})

const splashComplete = ref(false)
const heroRef = ref<InstanceType<typeof HomeHero> | null>(null)

const onSplashComplete = async () => {
  // Trigger hero animation as curtain is sliding up
  heroRef.value?.animateIn()

  // Mark complete after hero starts animating
  await new Promise(resolve => setTimeout(resolve, 300))
  splashComplete.value = true
}

// Setup scroll-triggered animations for sections
onMounted(async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)

  // Wait for splash to complete before setting up scroll triggers
  watch(splashComplete, (complete) => {
    if (!complete) return

    // Small delay to let hero animation finish
    setTimeout(() => {
      const sections = document.querySelectorAll('.scroll-section')

      sections.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }, 500)
  }, { immediate: true })
})
</script>

<template>
  <div class="page-wrapper">
    <!-- Splash Screen - sits on top -->
    <TheSplash @complete="onSplashComplete" />

    <!-- Main Content - always rendered, just covered by splash -->
    <div class="main-content">
      <HomeHero ref="heroRef" />

      <div class="scroll-section">
        <HomeAbout />
      </div>

      <div class="scroll-section">
        <HomeExperience />
      </div>

      <div class="scroll-section">
        <HomeContact />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  @apply relative;
}

.main-content {
  @apply relative;
}

.scroll-section {
  @apply py-section;
}
</style>
