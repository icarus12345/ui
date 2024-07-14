// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'text-base theme-green dark',
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