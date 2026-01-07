import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(CSSPlugin, TextPlugin, ScrollTrigger)
  return { provide: { gsap, ScrollTrigger } }
})
