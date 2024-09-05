<script lang="ts">
import type { PopperContentProps } from '../Popper'
import type { DismissableLayerEmits } from '../DismissableLayer/types'
// import { useForwardExpose, useGraceArea } from '../../shared'
import { syncRef } from '@vueuse/shared'

export type HoverCardContentImplEmits = DismissableLayerEmits
export interface HoverCardContentImplProps extends PopperContentProps {}
</script>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { injectHoverCardRootContext } from './HoverCardRoot.vue'
import { PopperContent } from '../Popper'
import { DismissableLayer } from '../DismissableLayer'
import { getTabbableNodes } from './utils'
// import { useForwardProps } from '..'

const props = defineProps<HoverCardContentImplProps>()
const emits = defineEmits<HoverCardContentImplEmits>()
const forwarded = useForwardProps(props)

const { forwardRef, currentElement: contentElement } = useForwardExpose()
const rootContext = injectHoverCardRootContext()
const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement)

syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: 'rtl' })

onPointerExit(() => {
  rootContext.onClose()
})

const containSelection = ref(false)

let originalBodyUserSelect: string
watchEffect((cleanupFn) => {
  if (containSelection.value) {
    const body = document.body

    // Safari requires prefix
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect

    body.style.userSelect = 'none'
    body.style.webkitUserSelect = 'none'

    cleanupFn(() => {
      body.style.userSelect = originalBodyUserSelect
      body.style.webkitUserSelect = originalBodyUserSelect
    })
  }
})

function handlePointerUp() {
  containSelection.value = false
  rootContext.isPointerDownOnContentRef.value = false

  // Delay a frame to ensure we always access the latest selection
  nextTick(() => {
    const hasSelection = document.getSelection()?.toString() !== ''
    if (hasSelection)
      rootContext.hasSelectionRef.value = true
  })
}
onMounted(() => {
  if (contentElement.value) {
    document.addEventListener('pointerup', handlePointerUp)

    const tabbables = getTabbableNodes(contentElement.value)
    tabbables.forEach(tabbable => tabbable.setAttribute('tabindex', '-1'))
  }
})

onUnmounted(() => {
  document.removeEventListener('pointerup', handlePointerUp)
  rootContext.hasSelectionRef.value = false
  rootContext.isPointerDownOnContentRef.value = false
})
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
    @focus-outside.prevent="emits('focusOutside', $event)"
    @dismiss="rootContext.onDismiss"
  >
    <PopperContent
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :style="{
        'userSelect': containSelection ? 'text' : undefined,
        // Safari requires prefix
        'WebkitUserSelect': containSelection ? 'text' : undefined,
        // re-namespace exposed content custom properties
        // '--ui-hover-card-content-transform-origin': 'var(--ui-popper-transform-origin)',
        // '--ui-hover-card-content-available-width': 'var(--ui-popper-available-width)',
        // '--ui-hover-card-content-available-height': 'var(--ui-popper-available-height)',
        // '--ui-hover-card-trigger-width': 'var(--ui-popper-anchor-width)',
        // '--ui-hover-card-trigger-height': 'var(--ui-popper-anchor-height)',
      }"
      @pointerdown="(event: PointerEvent) => {
        // Contain selection to current layer
        if ((event.currentTarget as HTMLElement).contains(event.target as HTMLElement)) {
          containSelection = true
        }
        rootContext.hasSelectionRef.value = false;
        rootContext.isPointerDownOnContentRef.value = true;
      }"
    >
      <slot />
    </PopperContent>
  </DismissableLayer>
</template>
