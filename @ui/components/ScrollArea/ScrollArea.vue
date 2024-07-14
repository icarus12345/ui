<script lang="ts">
import type { ScrollAreaRootProps } from './ScrollAreaRoot'
export interface ScrollAreaProps extends /* @vue-ignore */ ScrollAreaRootProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import ScrollAreaCorner from './ScrollAreaCorner.vue'
import ScrollAreaViewport from './ScrollAreaViewport.vue'
import ScrollAreaRoot from './ScrollAreaRoot.vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/utils/utils'

const props = defineProps<ScrollAreaProps>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)" style="--scrollbar-size: 10px">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
