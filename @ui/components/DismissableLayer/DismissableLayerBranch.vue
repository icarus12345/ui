<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
import { useForwardExpose } from '../../composables/useForwardExpose'

export interface DismissableLayerBranchProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'
import { onMounted, onUnmounted } from 'vue'
import { context } from './DismissableLayer.vue'

const props = defineProps<DismissableLayerBranchProps>()

const { forwardRef, currentElement } = useForwardExpose()
onMounted(() => {
  context.branches.add(currentElement.value)
})
onUnmounted(() => {
  context.branches.delete(currentElement.value)
})
</script>

<template>
  <Primitive
    :ref="forwardRef"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
