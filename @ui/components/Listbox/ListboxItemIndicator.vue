<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
// import { useForwardExpose } from '../../shared'

export interface ListboxItemIndicatorProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { injectListboxItemContext } from './ListboxItem.vue'
import { Primitive } from '../Primitive'

const props = withDefaults(defineProps<ListboxItemIndicatorProps>(), {
  as: 'span',
})

useForwardExpose()
const itemContext = injectListboxItemContext()
</script>

<template>
  <Primitive
    v-if="itemContext.isSelected.value"
    aria-hidden
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
