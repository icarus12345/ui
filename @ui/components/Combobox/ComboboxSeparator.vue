<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
import { useForwardExpose } from '../../shared'

export interface ComboboxSeparatorProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'

const props = defineProps<ComboboxSeparatorProps>()
useForwardExpose()
</script>

<template>
  <Primitive
    v-bind="props"
    aria-hidden
    class="-mx-1 my-1 h-px bg-muted"
  >
    <slot />
  </Primitive>
</template>
