// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // SSG mode
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],

  app: {
    head: {
      title: 'Kevin Jordan',
      htmlAttrs: {
        lang: 'en',
        style: 'scroll-behavior: smooth; background-color: #0a0a0a'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/image/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;400&family=Space+Grotesk&display=swap' }
      ]
    }
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/main.css'
  ],

  content: {
    highlight: {
      theme: 'github-dark'
    }
  },

  compatibilityDate: '2024-11-01'
})
