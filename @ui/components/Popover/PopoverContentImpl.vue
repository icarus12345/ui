<script lang="ts">
import type { PopperContentProps } from '../Popper'
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '../DismissableLayer'
import type { FocusScopeProps } from '../FocusScope'

export type PopoverContentImplEmits = DismissableLayerEmits & {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]
}

export interface PopoverContentImplProps
  extends PopperContentProps,
  DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `MenuContent`
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped']
}
</script>

<script setup lang="ts">
import { injectPopoverContext } from './Popover.vue'
import { PopperContent } from '../Popper'
import { DismissableLayer } from '../DismissableLayer'
import { FocusScope } from '../FocusScope'
// import { useFocusGuards, useForwardExpose, useForwardProps } from '../../shared'

const props = defineProps<PopoverContentImplProps>()
const emits = defineEmits<PopoverContentImplEmits>()

const forwarded = useForwardProps(props)
const { forwardRef } = useForwardExpose()

const rootContext = injectPopoverContext()
useFocusGuards()
</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @dismiss="rootContext.onOpenChange(false)"
    >
      <PopperContent
        v-bind="forwarded"
        :id="rootContext.contentId"
        :ref="forwardRef"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        role="dialog"
        :style="{
          // '--ui-popover-content-transform-origin':
          //   'var(--ui-popper-transform-origin)',
          // '--ui-popover-content-available-width':
          //   'var(--ui-popper-available-width)',
          // '--ui-popover-content-available-height':
          //   'var(--ui-popper-available-height)',
          // '--ui-popover-trigger-width': 'var(--ui-popper-anchor-width)',
          // '--ui-popover-trigger-height': 'var(--ui-popper-anchor-height)',
        }"
      >
        <slot />
      </PopperContent>
    </DismissableLayer>
  </FocusScope>
</template>
