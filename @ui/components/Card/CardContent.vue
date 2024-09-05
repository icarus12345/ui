<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import cardUI from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  ui?: object
}>()

const uiSize:any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), cardUI)
</script>

<template>
  <div
    :class="cn(
      'ui-card-content rounded-[inherit]',
      ui.padding[currentSize],
      ui.text[currentSize],
      props.class
    )">
    <slot />
  </div>
</template>
