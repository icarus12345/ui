<script lang="ts">
import { type ScrollAreaScrollbarProps } from './ScrollAreaScrollbar'
export interface ScrollbarProps extends /* @vue-ignore */ ScrollAreaScrollbarProps {
  class?: HTMLAttributes['class']
}
</script>
<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import ScrollAreaScrollbar from './ScrollAreaScrollbar.vue'
import ScrollAreaThumb from './ScrollAreaThumb.vue'
import { cn } from '@/utils/utils'

const props = withDefaults(defineProps<ScrollbarProps>(), {
  orientation: 'vertical',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn('flex touch-none select-none transition-colors data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:h-1.5',
         orientation === 'vertical'
           && 'h-full w-2 border-l border-l-transparent p-px ',
         orientation === 'horizontal'
           && 'h-2 flex-col border-t border-t-transparent p-px ',
         props.class)"
  >
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-foreground/[0.1] w-2" />
  </ScrollAreaScrollbar>
</template>
