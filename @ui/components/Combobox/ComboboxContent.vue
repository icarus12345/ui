<script lang="ts">
import type { ComboboxContentImplEmits, ComboboxContentImplProps } from './ComboboxContentImpl.vue'

export type ComboboxContentEmits = ComboboxContentImplEmits
export interface ComboboxContentProps extends ComboboxContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import { injectComboboxRootContext } from './ComboboxRoot.vue'
import ComboboxContentImpl from './ComboboxContentImpl.vue'
import { Presence } from '../Presence'
// import { useForwardExpose, useForwardPropsEmits, useId } from '../../shared'

const props = defineProps<ComboboxContentProps>()
const emits = defineEmits<ComboboxContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const { forwardRef } = useForwardExpose()

const rootContext = injectComboboxRootContext()

rootContext.contentId ||= useUId(undefined, 'ui-combobox-content')
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value"
    :class="[
      'ui-data-state-animate',
      'z-50 min-w-32 overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md border border-muted',
      'flex flex-col outline-none gap-px'
    ]"
    >
    <ComboboxContentImpl
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
    >
      <slot />
    </ComboboxContentImpl>
  </Presence>
</template>
