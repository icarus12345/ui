<script lang="ts">
import type { VNode } from 'vue'
import type { PrimitiveProps } from '../Primitive'
import type { PopperContentProps } from '../Popper'
import { useForwardExpose } from '../../shared'

export type TooltipContentImplEmits = {
  /** Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault` */
  escapeKeyDown: [event: KeyboardEvent]
  /** Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`. */
  pointerDownOutside: [event: Event]
}

export interface TooltipContentImplProps
  extends PrimitiveProps,
  Pick<
    PopperContentProps,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'avoidCollisions'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'arrowPadding'
    | 'sticky'
    | 'hideWhenDetached'
  > {
  /**
   * By default, screenreaders will announce the content inside
   * the component. If this is not descriptive enough, or you have
   * content that cannot be announced, use aria-label as a more
   * descriptive label.
   *
   * @defaultValue String
   */
  ariaLabel?: string
}
</script>

<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue'
import { useEventListener } from '@vueuse/core'
import { TOOLTIP_OPEN } from './utils'
import { PopperContent } from '../Popper'
import { VisuallyHidden } from '../VisuallyHidden'
import { injectTooltipRootContext } from './TooltipRoot.vue'
import { DismissableLayer } from '../DismissableLayer'

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  side: 'top',
  sideOffset: 0,
  align: 'center',
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  arrowPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
})
const emits = defineEmits<TooltipContentImplEmits>()

const rootContext = injectTooltipRootContext()

const { forwardRef } = useForwardExpose()
const slot = useSlots()
const defaultSlot = computed(() => slot.default?.())
const ariaLabel = computed(() => {
  if (props.ariaLabel)
    return props.ariaLabel
  let content = ''

  function recursiveTextSearch(node: VNode) {
    if (typeof node.children === 'string')
      content += node.children
    else if (Array.isArray(node.children))
      node.children.forEach(child => recursiveTextSearch(child as VNode))
  }

  defaultSlot.value?.forEach(node => recursiveTextSearch(node))
  return content
})

const popperContentProps = computed(() => {
  const { ariaLabel: _, ...restProps } = props
  return restProps
})

onMounted(() => {
  // Close the tooltip if the trigger is scrolled
  useEventListener(window, 'scroll', (event) => {
    const target = event.target as HTMLElement
    if (target?.contains(rootContext.trigger.value!))
      rootContext.onClose()
  })
  // Close this tooltip if another one opens
  useEventListener(window, TOOLTIP_OPEN, rootContext.onClose)
})
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="(event) => {
      if (rootContext.disableClosingTrigger.value && rootContext.trigger.value?.contains(event.target as HTMLElement))
        event.preventDefault()

      emits('pointerDownOutside', event)
    }"
    @focus-outside.prevent
    @dismiss="rootContext.onClose()"
  >
    <PopperContent
      :ref="forwardRef"
      :data-state="rootContext.stateAttribute.value"
      v-bind="{ ...$attrs, ...popperContentProps }"
      :style="{
        // '--ui-tooltip-content-transform-origin': 'var(--ui-popper-transform-origin)',
        // '--ui-tooltip-content-available-width': 'var(--ui-popper-available-width)',
        // '--ui-tooltip-content-available-height': 'var(--ui-popper-available-height)',
        // '--ui-tooltip-trigger-width': 'var(--ui-popper-anchor-width)',
        // '--ui-tooltip-trigger-height': 'var(--ui-popper-anchor-height)',
      }"
    >
      <slot />
      <VisuallyHidden
        :id="rootContext.contentId"
        role="tooltip"
      >
        {{ ariaLabel }}
      </VisuallyHidden>
    </PopperContent>
  </DismissableLayer>
</template>
