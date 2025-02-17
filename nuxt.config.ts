// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  spaLoadingTemplate: 'app-loading.html',
  app: {
    head: {
      bodyAttrs: {
        class: 'text-base',
      },
    },
    rootAttrs: {
      class: "",
    },
  },
  compatibilityDate: '2024-04-03',
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/themes.css',
  ],
  devtools: { enabled: false },
  extends: [
    '@ui',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    // '@pinia/nuxt'
  ],
  routeRules: {
    // '/': { redirect: '/home' },
    '/examples': { redirect: '/examples/accordion' },
  },
})