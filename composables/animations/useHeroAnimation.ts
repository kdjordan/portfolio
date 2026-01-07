import { onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const baseSkillWords = [
  'DEVELOP',
  'DESIGN',
  'CREATE',
  'BUILD',
  'DEPLOY',
  'OPTIMIZE',
  'INNOVATE',
  'ARCHITECT',
  'ENGINEER',
  'SOLVE',
  'RUN',
  'SKI',
  'CODE',
  'EXPLORE',
  'LEARN',
  'LIFT',
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function useHeroAnimation() {
  // SSR guard - return no-op during server-side rendering
  if (!import.meta.client) {
    return {
      timeline: ref(null),
      animateHero: () => Promise.resolve(),
    }
  }

  const timeline = gsap.timeline({
    delay: 1.2,
  })
  let wordIndex = Math.floor(Math.random() * baseSkillWords.length)
  const skillWords = [...baseSkillWords]
  const wordTimelines: gsap.core.Timeline[] = []

  const animateHero = () => {
    return new Promise<void>((resolve) => {
      timeline
        .to('#hero h1 div:first-child .letter', {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.out',
        })
        .to(
          '#hero h1 div:last-child .letter',
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to('#job', {
          opacity: 1,
          duration: 0.1,
          onComplete: () => {
            const wordElement = document.querySelector('#job .word')
            if (wordElement) {
              const el = wordElement as HTMLElement
              el.style.opacity = '0'

              // Start the word animation cycle
              startWordAnimation(el)
              resolve()
            }
          },
        })
    })
  }

  const startWordAnimation = (el: HTMLElement) => {
    // Set initial word
    el.textContent = skillWords[wordIndex]

    // Fade in first word
    gsap.to(el, {
      opacity: 1,
      duration: 0.4,
      onComplete: () => {
        // Start the cycle with next word after delay
        setTimeout(() => {
          wordIndex = (wordIndex + 1) % skillWords.length
          animateWord(el)
        }, 2000)
      },
    })
  }

  const animateWord = (wordElement: Element) => {
    const currentWord = skillWords[wordIndex]
    const el = wordElement as HTMLElement

    const wordTimeline = gsap
      .timeline()
      .to(el, {
        duration: 0.6,
        rotateX: -90,
        opacity: 0,
        transformOrigin: 'center center',
        transformPerspective: 1000,
        ease: 'power2.in',
      })
      .call(() => {
        el.textContent = currentWord
      })
      .to(el, {
        duration: 0.6,
        rotateX: 0,
        opacity: 1,
        ease: 'power2.out',
        onComplete: () => {
          setTimeout(() => {
            wordIndex = (wordIndex + 1) % skillWords.length
            if (wordIndex === 0) {
              shuffleArray(skillWords)
            }
            animateWord(wordElement)
          }, 2000)
        },
      })

    wordTimelines.push(wordTimeline)
  }

  onBeforeUnmount(() => {
    timeline.kill()
    wordTimelines.forEach((tl) => tl.kill())
  })

  return {
    timeline,
    animateHero,
  }
}
