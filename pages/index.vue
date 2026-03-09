<script setup lang="ts">
useSeoMeta({
  title: 'Kevin Jordan — Technical Founder & Builder',
  description: 'Kevin Jordan — Technical founder, builder, and AI systems engineer. 25+ years shipping products, scaling companies, and building autonomous agent systems.'
})

const heroRef = ref<InstanceType<typeof HomeHero> | null>(null)
const pageReady = ref(false)

onMounted(async () => {
  if (!import.meta.client) return

  // Quick fade-in instead of splash screen
  await nextTick()
  pageReady.value = true

  // Trigger hero animation
  setTimeout(() => {
    heroRef.value?.animateIn()
  }, 200)

  // Setup scroll-triggered animations
  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  setTimeout(() => {
    const sections = document.querySelectorAll('.scroll-section')

    sections.forEach((section) => {
      gsap.fromTo(section,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, 800)
})
</script>

<template>
  <div class="page-wrapper" :class="{ 'page-ready': pageReady }">
    <HomeHero ref="heroRef" />

    <div class="scroll-section">
      <HomeAbout />
    </div>

    <div class="scroll-section">
      <HomeWork />
    </div>

    <div class="scroll-section">
      <HomeServices />
    </div>

    <div class="scroll-section">
      <HomeExperience />
    </div>

    <div class="scroll-section">
      <HomeArticles />
    </div>

    <div class="scroll-section">
      <HomeContact />
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  @apply relative;
  opacity: 0;
  transition: opacity 0.4s ease-out;
}

.page-wrapper.page-ready {
  opacity: 1;
}

.scroll-section {
  @apply py-section;
  opacity: 0;
  transform: translateY(40px);
}
</style>
