<script lang="ts">
import type { Point } from '../Menu/utils'
import type { PrimitiveProps } from '../Primitive'

export interface ContextMenuTriggerProps extends PrimitiveProps {
  /**
   * When `true`, the context menu would not open when right-clicking.
   *
   * Note that this will also restore the native context menu.
   */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { computed, nextTick, ref, toRefs } from 'vue'
import { injectContextMenuContext } from './ContextMenu.vue'
import { isTouchOrPen } from './utils'
// import { useForwardExpose } from '../../shared'
import { Primitive } from '../Primitive'
import { MenuAnchor } from '../Menu'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span',
  disabled: false,
})
const { disabled } = toRefs(props)

const { forwardRef } = useForwardExpose()
const context = injectContextMenuContext()
const point = ref<Point>({ x: 0, y: 0 })
const virtualEl = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: point.value.x,
      right: point.value.x,
      top: point.value.y,
      bottom: point.value.y,
      ...point.value,
    } as DOMRect),
}))

const longPressTimer = ref(0)
function clearLongPress() {
  window.clearTimeout(longPressTimer.value)
}

function handleOpen(event: MouseEvent | PointerEvent) {
  point.value = { x: event.clientX, y: event.clientY }
  context.onOpenChange(true)
}

async function handleContextMenu(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick()
    if (!event.defaultPrevented) {
      clearLongPress()
      handleOpen(event)
      event.preventDefault()
    }
  }
}

async function handlePointerDown(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick()

    if (isTouchOrPen(event) && !event.defaultPrevented) {
      // clear the long press here in case there's multiple touch points
      clearLongPress()
      longPressTimer.value = window.setTimeout(() => handleOpen(event), 700)
    }
  }
}

async function handlePointerEvent(event: PointerEvent) {
  if (!disabled.value) {
    await nextTick()
    if (isTouchOrPen(event) && !event.defaultPrevented)
      clearLongPress()
  }
}
</script>

<template>
  <MenuAnchor
    as="template"
    :element="virtualEl"
  />

  <Primitive
    :ref="forwardRef"
    :as="as"
    :as-child="asChild"
    :data-state="context.open.value ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :style="{
      WebkitTouchCallout: 'none',
    }"
    v-bind="$attrs"
    @contextmenu="handleContextMenu"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerEvent"
    @pointercancel="handlePointerEvent"
    @pointerup="handlePointerEvent"
  >
    <slot />
  </Primitive>
</template>
