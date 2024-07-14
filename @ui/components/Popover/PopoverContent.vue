<script lang="ts">
import type {
  PopoverContentImplEmits,
  PopoverContentImplProps,
} from './PopoverContentImpl.vue'

export type PopoverContentEmits = PopoverContentImplEmits

export interface PopoverContentProps extends PopoverContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import PopoverContentModal from './PopoverContentModal.vue'
import PopoverContentNonModal from './PopoverContentNonModal.vue'
import { injectPopoverContext } from './Popover.vue'
// import { useForwardExpose, useForwardPropsEmits, useId } from '../../shared'
import { Presence } from '../Presence'

const props = defineProps<PopoverContentProps>()
const emits = defineEmits<PopoverContentEmits>()

const rootContext = injectPopoverContext()

const forwarded = useForwardPropsEmits(props, emits)
const { forwardRef } = useForwardExpose()

rootContext.contentId ||= useUId(undefined, 'ui-popover-content')
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value"
    class="
      ui-data-state-animate
      z-50 w-72 rounded-md border border-muted bg-popover p-4 text-popover-foreground shadow-md outline-none
    "
    >
    <PopoverContentModal
      v-if="rootContext.modal.value"
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </PopoverContentModal>
    <PopoverContentNonModal
      v-else
      v-bind="forwarded"
      :ref="forwardRef"
    >
      <slot />
    </PopoverContentNonModal>
  </Presence>
</template>
