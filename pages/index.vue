<script setup lang="ts">
useSeoMeta({
  title: 'Kevin Jordan - Developer & Builder',
  description: 'Portfolio of Kevin Jordan - Developer, entrepreneur, and builder.'
})

const onHeroComplete = async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default
  gsap.to('.about-section', {
    opacity: 1,
    duration: 0.7,
    delay: 0.5,
  })
}
</script>

<template>
  <div class="min-h-screen">
    <HomeHero @animation-complete="onHeroComplete" />
    <div class="about-section opacity-0 relative z-0">
      <SectionBreaker
        text="The About"
        centerLetter="A"
        :useScrollAnimation="false"
      />
      <HomeAbout />
    </div>
    <div class="experience-section">
      <SectionBreaker
        text="The Experience"
        centerLetter="E"
        :useScrollAnimation="true"
      />
      <HomeExperience />
    </div>
    <div class="contact-section">
      <SectionBreaker
        text="The Contacts"
        centerLetter="C"
        :useScrollAnimation="true"
      />
      <HomeContact />
    </div>
  </div>
</template>
