<script lang="ts">
import type {
  MenuContentEmits,
  MenuContentProps,
} from '../Menu'
// import { useForwardExpose, useForwardPropsEmits } from '../../shared'

export type ContextMenuContentEmits = MenuContentEmits

export interface ContextMenuContentProps
  extends Omit<
    MenuContentProps,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'arrowPadding'
    | 'updatePositionStrategy'
  > {}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { injectContextMenuContext } from './ContextMenu.vue'
import { MenuContent } from '../Menu'

const props = withDefaults(defineProps<ContextMenuContentProps>(), {
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
})
const emits = defineEmits<ContextMenuContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)

useForwardExpose()
const context = injectContextMenuContext()
const hasInteractedOutside = ref(false)
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    side="right"
    :side-offset="2"
    align="start"
    :style="{
      // '--ui-context-menu-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-context-menu-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-context-menu-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-context-menu-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-context-menu-trigger-height':
      //   'var(--ui-popper-anchor-height)',
    }"
    @close-auto-focus="
      (event) => {
        if (!event.defaultPrevented && hasInteractedOutside) {
          event.preventDefault();
        }
        hasInteractedOutside = false;
      }
    "
    @interact-outside="
      (event) => {
        if (!event.defaultPrevented && !context.modal.value)
          hasInteractedOutside = true;
      }
    "
  >
    <slot />
  </MenuContent>
</template>
