<script setup lang="ts">
import { onMounted, ref } from 'vue'

const contactRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!import.meta.client) return

  const gsap = (await import('gsap')).default
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  gsap.from('#contact', {
    opacity: 0,
    duration: 2,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '#contact',
      start: '25% 75%',
    },
  })
})
</script>
<template>
  <section
    id="contact"
    ref="contactRef"
    class="flex flex-col justify-center"
    style="scroll-margin-top: 200px"
  >
    <div class="flex flex-col w-full mb-32">
      <div>
        <div class="flex flex-col text-gray-200 justify-center items-center">
          <div class="mb-8 text-center gradient-text lg:mb-16">
            <p>
              If you are working on something interesting, I'd like to hear about it.
            </p>
            <p class="mt-4e">
              Here's the links - hope to hear from you.
            </p>
          </div>
          <div>
            <ul class="text-primary-white flex justify-center items-center h-full gap-8">
              <li>
                <a
                  href="https://github.com/kdjordan"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><font-awesome-icon
                    icon="fa-brands fa-github"
                    size="2xl"
                /></a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kevin-dean-jordan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><font-awesome-icon
                    icon="fa-brands fa-linkedin"
                    size="2xl"
                /></a>
              </li>
              <li>
                <a
                  href="mailto:k.dean.jordan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><font-awesome-icon
                    icon="fa-solid fa-envelope"
                    size="2xl"
                /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
