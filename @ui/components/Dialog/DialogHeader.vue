<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import dialogUI from './utils'

const uiSize: any = inject('ui-size', undefined)
const props = defineProps<{
  class?: HTMLAttributes['class'],
  ui?: object
}>()
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), dialogUI.header)
</script>

<template>
  <div
    :class="cn(
      'ui-dialog-header',
      ui.base,
      ui.padding[currentSize],
      props.class
    )"
  >
    <slot />
  </div>
</template>
