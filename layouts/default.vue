<script setup lang="ts">
import { useNavigationAnimation } from '~/composables/animations/useNavigationAnimation'

const { animateIntro } = useNavigationAnimation()

onMounted(() => {
  if (import.meta.client) {
    animateIntro()
  }
})
</script>

<template>
  <!-- Grid background -->
  <div
    class="fixed inset-0 pointer-events-none"
    style="
      background-image: radial-gradient(circle at bottom right, transparent, rgba(0, 0, 0, 0.95) 70%),
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 100% 100%, 40px 40px, 40px 40px;
      mask-image: radial-gradient(circle at bottom right, transparent, black 70%);
    "
  ></div>

  <!-- Main content -->
  <div class="text-sizeBase px-[5vw] lg:max-w-7xl mx-auto relative">
    <TheNavigation />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<style>
#scrollerContainer {
  width: max-content;
  justify-content: center;
}
.scroller {
  scrollbar-color: var(--gray-200) transparent;
  scrollbar-width: thin;
}

body {
  background-color: #000;
}
</style>
