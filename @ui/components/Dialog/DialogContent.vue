<script lang="ts">
import { type HTMLAttributes } from 'vue'
import type {
  DialogContentImplEmits,
  DialogContentImplProps,
} from './DialogContentImpl.vue'

export type DialogContentEmits = DialogContentImplEmits

export interface DialogContentProps extends DialogContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean,
  class?: HTMLAttributes['class'],
  size?: DialogVariants['size']
}
</script>

<script setup lang="ts">
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import { injectDialogRootContext } from './DialogRoot.vue'
import { Presence } from '../Presence'
// import { useForwardExpose } from '../../composables/useForwardExpose'
// import { useId } from '../../composables/useId'
import { type DialogVariants, dialogVariants } from '.'

const props = defineProps<DialogContentProps>()
const emits = defineEmits<DialogContentEmits>()

const rootContext = injectDialogRootContext()

const emitsAsProps = useEmitAsProps(emits)
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value"
    :class="
    cn(
      'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 border border-muted bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
      dialogVariants({ size }),
      props.class,
    )"
    >
    <DialogContentModal
      v-if="rootContext.modal.value"
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </DialogContentModal>
    <DialogContentNonModal
      v-else
      :ref="forwardRef"
      v-bind="{ ...props, ...emitsAsProps, ...$attrs }"
    >
      <slot />
    </DialogContentNonModal>
  </Presence>
</template>
