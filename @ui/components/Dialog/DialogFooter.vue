<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import dialogUI from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  ui?: object
}>()
const uiSize:any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), dialogUI.footer)
</script>

<template>
  <div
    :class="
      cn(
        'ui-dialog-footer',
        ui.base,
        ui.padding[currentSize],
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
