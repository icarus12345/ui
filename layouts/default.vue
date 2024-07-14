<script setup lang="ts">
const navbar = useNavbar()
const { theme, radius } = useCustomize()

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value}`,
    style: `--radius: ${radius.value}rem;`,
  },
})
</script>

<template>
  <div :class="[
      `grid min-h-dvh md:grid-cols-[auto_1fr] grid-rows-[4rem_auto] [grid-template-areas:'aside_header''aside_main']`,
    ]">
    <LazyLayoutHeader class="[grid-area:header] col-span-2" />
    <LazyLayoutAside class="[grid-area:aside]" />
    <main class="[grid-area:main] bg-foreground/[0.05] p-4">
      <slot />
    </main>
  </div>
</template>

<style scoped>
  
</style>
