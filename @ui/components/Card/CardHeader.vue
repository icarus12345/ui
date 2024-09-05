<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import cardUI from './utils'

const uiSize: any = inject('ui-size', undefined)

const props = defineProps<{
  class?: HTMLAttributes['class'],
  ui?: object
}>()
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), cardUI.header)

</script>

<template>
  <div
    :class="cn(
      'ui-card-header flex items-center gap-[0.5em] rounded-[inherit]',
      ui.padding[currentSize],
      props.class,
    )">
    <slot />
  </div>
</template>
