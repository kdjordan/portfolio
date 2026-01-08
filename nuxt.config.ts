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
      title: 'KJ - Kevin Jordan',
      htmlAttrs: {
        lang: 'en',
        style: 'background-color: #050505'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'theme-color', content: '#050505' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/image/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        }
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
