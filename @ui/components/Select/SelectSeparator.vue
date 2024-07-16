<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface SelectSeparatorProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'

const props = defineProps<SelectSeparatorProps>()
</script>

<template>
  <Primitive
    aria-hidden
    v-bind="props"
    class="-mx-1 my-1 h-px bg-muted"
  >
    <slot />
  </Primitive>
</template>
