<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '../Menu'

export type MenubarSubContentEmits = MenuSubContentEmits

export interface MenubarSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { injectMenubarRootContext } from './Menubar.vue'
import { injectMenubarMenuContext } from './MenubarMenu.vue'
import { MenuSubContent } from '../Menu'
// import { useCollection, useForwardExpose, useForwardPropsEmits } from '../../shared'
// import { wrapArray } from '../../shared/useTypeahead'

const props = defineProps<MenubarSubContentProps>()
const emits = defineEmits<MenubarSubContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()

const { injectCollection } = useCollection('menubar')

const rootContext = injectMenubarRootContext()
const menuContext = injectMenubarMenuContext()
const collections = injectCollection()

function handleArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  const targetIsSubTrigger = target.hasAttribute(
    'data-radix-menubar-subtrigger',
  )

  // Prevent navigation when we're opening a submenu
  if (targetIsSubTrigger)
    return

  let candidateValues = collections.value.map(i => i.dataset.value)

  const currentIndex = candidateValues.indexOf(menuContext.value)

  candidateValues = rootContext.loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1)

  const [nextValue] = candidateValues
  if (nextValue)
    rootContext.onMenuOpen(nextValue)
}
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    data-radix-menubar-content=""
    :style="{
      // '--ui-menubar-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-menubar-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-menubar-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-menubar-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-menubar-trigger-height': 'var(--ui-popper-anchor-height)',
    }"
    @keydown.arrow-right="handleArrowNavigation"
  >
    <slot />
  </MenuSubContent>
</template>
