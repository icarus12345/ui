<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import cardUI from './utils'


const props = defineProps<{
  class?: HTMLAttributes['class'],
  ui?: object
}>()
const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), cardUI.header)

</script>

<template>
  <h3
    :class="
      cn(
        'card-title flex gap-[0.5em] flex-1',
        ui.text[currentSize],
        props.class
      )
    "
  >
    <slot />
  </h3>
</template>
