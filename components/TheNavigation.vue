<script setup lang="ts">
import { ref } from 'vue'
import { useNavigationAnimation } from '~/composables/animations/useNavigationAnimation'

const isOpen = ref(false)
const { toggleMenu } = useNavigationAnimation()

function toggleOpen() {
  isOpen.value = !isOpen.value
  toggleMenu(isOpen.value)
}
</script>
<template>
  <div class="top-nav fixed top-0 left-0 w-full h-16 z-10 backdrop-blur-md bg-black/30">
    <div
      id="overlay"
      class="fixed top-0 right-0 bg-bg-secondary z-20 w-full h-screen translate-x-[100%]"
    >
      <ul
        class="flex flex-col justify-center items-center gap-y-[20px] fixed top-0 left-0 text-4xl text-primary-white h-screen w-full"
      >
        <li @click="toggleOpen">
          <a
            href="#about"
            class="hover:text-gray-200 transition-colors"
            >about</a
          >
        </li>
        <li @click="toggleOpen">
          <a
            href="#experience"
            class="hover:text-gray-200 transition-colors"
            >experience</a
          >
        </li>
        <li @click="toggleOpen">
          <a
            href="#contact"
            class="hover:text-gray-200 transition-colors"
            >contact</a
          >
        </li>
      </ul>
    </div>
    <nav class="flex justify-between px-4 items-center h-full container mx-auto">
      <div class="nav-left"></div>
      <div
        class="nav-right z-30 cursor-pointer"
        @click="toggleOpen"
      >
        <svg
          viewBox="0 0 90 70"
          width="40"
          height="40"
          fill="currentColor"
          class="text-white"
        >
          <rect
            id="upper"
            x="15"
            width="75"
            height="6"
            rx="8"
          ></rect>
          <rect
            id="middle"
            x="40"
            y="25"
            width="50"
            height="6"
            rx="8"
          ></rect>
          <rect
            id="lower"
            x="65"
            y="50"
            width="25"
            height="6"
            rx="8"
          ></rect>
        </svg>
      </div>
    </nav>
  </div>
</template>
