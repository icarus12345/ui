<script setup lang="ts">
const { activeNavMenu } = useNavbar()
const { theme, radius } = useCustomize()

useServerHead({
  htmlAttrs: {
    class: `theme-${theme.value}`,
    style: `--radius: ${radius.value}rem;`,
  },
})
</script>

<template>
  <div :class="cn(
      `max-w-[132rem] mx-auto shadow-[0_0_0_100vmax_hsl(var(--foreground)_/_0.02)] md:pl-[8rem] pt-10 transition-[padding-left]`,
      { 'md:pl-[27.2rem]' : true },
      { 'text-[blue]]' : !!activeNavMenu?.children?.length },
    )">
    <LazyLayoutHeader :class="cn(
      'md:pl-[8rem] transition-[padding-left]',
      { 'md:pl-[27.2rem]' : !!activeNavMenu?.children?.length }
    )" />
    <LazyLayoutAside class="" />
    <main class="bg-foreground/[0.05] py-4 px-6 min-h-[calc(100dvh_-_4rem)]">
      <div class="ms-[50vw]">{{ activeNavMenu?.children?.length }}</div>
      <slot />
    </main>
  </div>
</template>

<style scoped>
  
</style>
