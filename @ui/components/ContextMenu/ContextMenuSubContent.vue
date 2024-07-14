<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '../Menu'

export type ContextMenuSubContentEmits = MenuSubContentEmits
export interface ContextMenuSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '../Menu'
// import { useForwardExpose, useForwardPropsEmits } from '../../shared'

const props = defineProps<ContextMenuSubContentProps>()

const emits = defineEmits<ContextMenuSubContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    :style="{
      // '--ui-context-menu-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-context-menu-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-context-menu-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-context-menu-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-context-menu-trigger-height':
      //   'var(--ui-popper-anchor-height)',
    }"
  >
    <slot />
  </MenuSubContent>
</template>
