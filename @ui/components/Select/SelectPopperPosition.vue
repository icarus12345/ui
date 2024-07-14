<script lang="ts">
import type { PopperContentProps } from '../Popper'

export interface SelectPopperPositionProps extends PopperContentProps {}
</script>

<script setup lang="ts">
// import { useForwardProps } from '..'
import { CONTENT_MARGIN } from './utils'
import { PopperContent } from '../Popper'

const props = withDefaults(defineProps<SelectPopperPositionProps>(), {
  align: 'start',
  collisionPadding: CONTENT_MARGIN,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PopperContent
    v-bind="forwarded"
    :style="{
      // Ensure border-box for floating-ui calculations
      'boxSizing': 'border-box',
      // '--ui-select-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-select-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-select-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-select-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-select-trigger-height': 'var(--ui-popper-anchor-height)',
    }"
  >
    <slot />
  </PopperContent>
</template>
