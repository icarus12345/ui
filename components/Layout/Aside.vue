<script setup lang="ts">
import { navMenu, navMenuBottom } from '@/constants/menus'
const route = useRoute()
const navbar = useNavbar()
const { toggle } = navbar
const { isOpen, hoveredNavItem, activeNavMenu } = navbar
const isActive = computed(() => {
  return route.path.startsWith(hoveredNavItem.value.link || '')
})
const activeNavItem = computed(() => {
  if (hoveredNavItem.value?.children?.length) {
    return hoveredNavItem.value
  }
  return navMenu.filter((item: any) => route.path.startsWith(item.link || '')).pop()
})
const onMouseLeave = () => {
  hoveredNavItem.value = undefined
}
const unSetHover = () => {
  hoveredNavItem.value = undefined
}
</script>

<template>
  <aside
    @mouseleave="onMouseLeave"
    class="
      sticky top-0 left-0 z-30 bg-foreground/[0.01] h-dvh
      flex-col items-center transition-width duration-300 flex
      pointer-events-auto
      md:w-20
      max-md:w-[min(75dvw,_28rem)]
    "
    :class="[
      { 'max-md:-translate-x-full' : !isOpen },
      { 'md:mr-48' : activeNavMenu?.children?.length }
    ]"
    >
    <ListboxRoot class="flex-1 flex flex-col">
      <ListboxContent class="flex flex-1 flex-col gap-2 p-2 ui-outline">
          <LayoutNavLink
            v-for="(item, index) in navMenu"
            :key="index"
            :item="item"
          />
          <div class="flex-1"></div>
          <LayoutNavLink
            v-for="(item, index) in navMenuBottom"
            :key="index"
            :item="item"
          />
      </ListboxContent>
    </ListboxRoot>
    <Transition name="fade">
      <nav
        class="
          absolute bg-background top-0 bottom-0 overflow-hidden z-10
          left-0 w-[min(75dvw,_28rem)]
          md:left-20 md:w-48
          transition-all duration-500
        "
        :class="[
          // isActive ? 'w-48' : 'w-0',
          {'max-md:-translate-x-full': !hoveredNavItem?.children?.length}
        ]"
        v-if="activeNavItem?.children?.length"
        >
        <ScrollArea class="w-60 md:w-48 h-dvh">
          <div class="p-3">
            <div class="flex items-center gap-2  mb-3">
              <Button variant="ghost" size="icon" @click="unSetHover" class="md:hidden">
                <Icon name="ic:round-arrow-back"/>
                <span class="sr-only">Back</span>
              </Button>
              <div class="text-muted-foreground uppercase">{{ activeNavItem?.title }}</div>
            </div>
            <TransitionGroup name="list" appear>
              <span v-for="(nav, index) in activeNavItem?.children" :key="index">
                <Button
                  as-child
                  variant="ghost"
                  class="w-full gap-2 justify-start mt-1"
                  :class="[
                    { 'bg-foreground/[0.05]': nav.link === $route.path },
                  ]"
                  :aria-label="nav.title"
                >
                  <RouterLink :to="nav.link">
                    <Icon name="ic:round-circle" class="!w-3 !h-3" />
                    <span>
                      {{ nav.title }}
                    </span>
                  </RouterLink>
                </Button>
              </span>
            </TransitionGroup>
          </div>
        </ScrollArea>
      </nav>
    </Transition>
  </aside>
</template>
<style scoped lang="postcss">
.list-move,
.list-enter-active,
.list-leave-active {
  /* transition: all 0.5s ease; */
  @apply md:transition-all md:duration-500
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-enter-from {
  transform: translateX(-1rem);
}
.list-leave-to {
  transform: translateX(1rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  /* opacity: 0; */
  width: 0;
  overflow: hidden;
}
</style>
