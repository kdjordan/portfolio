<script setup lang="ts">
useSeoMeta({
  title: 'Kevin Jordan — Technical Founder & Builder',
  description: 'Kevin Jordan — Technical founder, builder, and AI systems engineer. 25+ years shipping products, scaling companies, and building autonomous agent systems.'
})

const heroRef = ref<InstanceType<typeof HomeHero> | null>(null)

onMounted(async () => {
  if (!import.meta.client) return

  await nextTick()

  setTimeout(() => {
    heroRef.value?.animateIn()
  }, 200)
})
</script>

<template>
  <div class="page-wrapper">
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
}

.scroll-section {
  @apply py-section;
}
</style>
