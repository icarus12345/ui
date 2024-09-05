import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  alias: { '@ui': resolve('./') },
  components: [
    { 
      path: '@ui/components',
      ignore: ['**/index.ts', '**/utils.ts', '**/types.ts', '**/theme.ts', '**/ui.ts'],
      pathPrefix: false,
    }
  ],
  modules: [
    // 'ui',
  ],
})
