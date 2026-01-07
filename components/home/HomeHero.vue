<script setup lang="ts">
import { onMounted } from 'vue'
import { useHeroAnimation } from '~/composables/animations/useHeroAnimation'

const emit = defineEmits(['animationComplete'])
const { animateHero } = useHeroAnimation()

onMounted(() => {
  if (!import.meta.client) return

  // Create a promise that resolves when the hero animation is done
  animateHero().then(() => {
    emit('animationComplete')
  })
})
</script>

<template>
  <section
    id="hero"
    class="flex flex-col max-h-[750px] w-full px-4 pt-32 md:pt-40 pb-32"
  >
    <div class="flex flex-col w-full">
      <h1 class="flex flex-col text-primary-white font-arial">
        <div class="overflow-hidden">
          <span class="text-[15vw] md:text-[12vw] uppercase leading-[0.9] tracking-tighter block name-reveal">
            <span class="letter">K</span>
            <span class="letter">E</span>
            <span class="letter">V</span>
            <span class="letter">I</span>
            <span class="letter">N</span>
          </span>
        </div>
        <div class="overflow-hidden self-end">
          <span class="text-[15vw] md:text-[12vw] uppercase leading-[0.9] tracking-tighter block name-reveal">
            <span class="letter">J</span>
            <span class="letter">O</span>
            <span class="letter">R</span>
            <span class="letter">D</span>
            <span class="letter">A</span>
            <span class="letter">N</span>
          </span>
        </div>
      </h1>
      <div
        id="job"
        class="text-primary-white text-xl md:text-2xl mt-8 tracking-widest font-mono"
      >
        <span class="prefix">>>> </span>
        <span class="word"></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
#hero {
  opacity: 1;
}

#job {
  opacity: 0;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
}

.name-reveal {
  transform: translateY(0);
}

#job .word {
  display: inline-block;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>
