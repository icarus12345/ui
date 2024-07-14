<script lang="ts">
import type {
  MenuSubContentEmits,
  MenuSubContentProps,
} from '../Menu'
// import { useForwardExpose } from '../../shared'

export type DropdownMenuSubContentEmits = MenuSubContentEmits

export interface DropdownMenuSubContentProps extends MenuSubContentProps {}
</script>

<script setup lang="ts">
import { MenuSubContent } from '../Menu'
// import { useForwardPropsEmits } from '..'

const props = defineProps<DropdownMenuSubContentProps>()
const emits = defineEmits<DropdownMenuSubContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    :style="{
      // '--ui-dropdown-menu-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-dropdown-menu-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-dropdown-menu-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-dropdown-menu-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-dropdown-menu-trigger-height':
      //   'var(--ui-popper-anchor-height)',
    }"
  >
    <slot />
  </MenuSubContent>
</template>
