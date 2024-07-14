<script lang="ts">
import type {
  MenuContentEmits,
  MenuContentProps,
} from '../Menu'

export type DropdownMenuContentEmits = MenuContentEmits

export interface DropdownMenuContentProps extends MenuContentProps {}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { injectDropdownMenuContext } from './DropdownMenu.vue'
import { MenuContent } from '../Menu'
// import { useForwardExpose, useForwardPropsEmits, useId } from '../../shared'

const props = defineProps<DropdownMenuContentProps>()
const emits = defineEmits<DropdownMenuContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()

const rootContext = injectDropdownMenuContext()

const hasInteractedOutsideRef = ref(false)

function handleCloseAutoFocus(event: Event) {
  if (event.defaultPrevented)
    return
  if (!hasInteractedOutsideRef.value) {
    setTimeout(() => {
      rootContext.triggerElement.value?.focus()
    }, 0)
  }
  hasInteractedOutsideRef.value = false

  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault()
}

rootContext.contentId ||= useUId(undefined, 'ui-dropdown-menu-content')
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    :id="rootContext.contentId"
    :aria-labelledby="rootContext?.triggerId"
    :style="{
      // '--ui-dropdown-menu-content-transform-origin':
      //   'var(--ui-popper-transform-origin)',
      // '--ui-dropdown-menu-content-available-width':
      //   'var(--ui-popper-available-width)',
      // '--ui-dropdown-menu-content-available-height':
      //   'var(--ui-popper-available-height)',
      // '--ui-dropdown-menu-trigger-width': 'var(--ui-popper-anchor-width)',
      // '--ui-dropdown-menu-trigger-height':
      //   'var(--ui-popper-anchor-height)',
    }"
    @close-auto-focus="handleCloseAutoFocus"
    @interact-outside="(event) => {
      if (event.defaultPrevented) return

      const originalEvent = event.detail.originalEvent as PointerEvent;
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
      if (!rootContext.modal.value || isRightClick) hasInteractedOutsideRef = true;
      if (rootContext.triggerElement.value?.contains(event.target as HTMLElement)) event.preventDefault()
    }"
  >
    <slot />
  </MenuContent>
</template>
