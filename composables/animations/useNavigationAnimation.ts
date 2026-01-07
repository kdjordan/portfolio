import { onBeforeUnmount, nextTick, ref } from 'vue'
import gsap from 'gsap'
import { useHeroAnimation } from './useHeroAnimation'

export function useNavigationAnimation() {
  // SSR guard - return no-op during server-side rendering
  if (!import.meta.client) {
    return {
      timeline: ref(null),
      animateIntro: () => {},
      toggleMenu: (_isOpen: boolean) => {},
    }
  }

  const timeline = gsap.timeline()
  const { animateHero } = useHeroAnimation()

  const animateIntro = () => {
    nextTick(() => {
      timeline
        .set('.top-nav', { opacity: 0 })
        .set('.nav-right rect', { opacity: 0, y: -100 })
        .to('.top-nav', { opacity: 1 })
        .to('.nav-right rect', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: {
            each: 0.1,
            from: 'start',
            ease: 'power2.inOut',
          },
        })
        .add('navComplete')
        .call(
          () => {
            animateHero()
          },
          [],
          '+=0.3'
        )
    })
  }

  const toggleMenu = (isOpen: boolean) => {
    const links = document.querySelectorAll('#overlay > ul > li')
    const upper = document.querySelectorAll('#upper')
    const middle = document.querySelectorAll('#middle')
    const lower = document.querySelectorAll('#lower')

    timeline.clear()

    if (!isOpen) {
      timeline
        .to(middle, { rotation: -360, transformOrigin: '50% 50%', duration: 0.4 })
        .to([upper, lower], { x: 0, opacity: 1, duration: 0.3 })
        .to(
          [links, '#overlay > ul > button'],
          {
            x: 1000,
            stagger: { amount: 0.2, ease: 'power2.inOut' },
            duration: 0.5,
          },
          '-=.3'
        )
        .to(
          '#overlay',
          {
            duration: 0.5,
            xPercent: 100,
            ease: 'power2.inOut',
          },
          '-=.3'
        )
    } else {
      timeline
        .to(middle, { rotation: 360, transformOrigin: '50% 50%', duration: 0.4 })
        .to([upper, lower], { x: 100, opacity: 0, duration: 0.3 })
        .set([links, '#overlay > ul > button'], { x: 1000 })
        .to('#overlay', {
          duration: 0.5,
          xPercent: -100,
          ease: 'power2.inOut',
        })
        .to([links, 'button'], {
          x: 0,
          duration: 0.5,
          stagger: { amount: 0.2, ease: 'power2.inOut' },
        })
    }
  }

  onBeforeUnmount(() => {
    timeline.kill()
  })

  return {
    timeline,
    animateIntro,
    toggleMenu,
  }
}
