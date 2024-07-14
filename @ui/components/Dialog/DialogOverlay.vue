<script lang="ts">
import DialogOverlayImpl, { type DialogOverlayImplProps } from './DialogOverlayImpl.vue'
import { useForwardExpose } from '../../shared'

export interface DialogOverlayProps extends DialogOverlayImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import { injectDialogRootContext } from './DialogRoot.vue'
import { Presence } from '../Presence'

defineProps<DialogOverlayProps>()
const rootContext = injectDialogRootContext()

const { forwardRef } = useForwardExpose()
</script>

<template>
  <Presence
    v-if="rootContext?.modal.value"
    :present="forceMount || rootContext.open.value"
    class="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
  >
    <DialogOverlayImpl
      v-bind="$attrs"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
    >
      <slot />
    </DialogOverlayImpl>
  </Presence>
</template>
