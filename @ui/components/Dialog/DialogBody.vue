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
const { ui }: any = useUI(toRef(props, 'ui'), dialogUI.body)
</script>

<template>
  <div
    :class="cn(
      'ui-dialog-body',
      ui.base,
      ui.padding[currentSize],
      // ui.text[currentSize],
      props.class
    )"
  >
    <slot />
  </div>
</template>
