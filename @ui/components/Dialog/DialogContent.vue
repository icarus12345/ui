
<script setup lang="ts">
import {
  type DialogContentProps,
  type DialogContentEmits,
  injectDialogRootContext,
} from './types'
import DialogContentModal from './DialogContentModal.vue'
import DialogContentNonModal from './DialogContentNonModal.vue'
import { Presence } from '../Presence'
// import { useForwardExpose } from '../../composables/useForwardExpose'
// import { useId } from '../../composables/useId'
import dialogUI from './utils'

const props = withDefaults(defineProps<DialogContentProps>(), {
  size: 'md',
  width: 'md',
})
const emits = defineEmits<DialogContentEmits>()

const rootContext = injectDialogRootContext()

const emitsAsProps = useEmitAsProps(emits)
const { forwardRef } = useForwardExpose()


const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize?.value || props.size
})
provide('ui-size', currentSize)
const { ui, attrs }: any = useUI(toRef(props, 'ui'), dialogUI)

</script>

<template>
  <Presence :present="forceMount || rootContext.open.value"
    :class="
    cn(
      'ui-dialog',
      ui.base,
      ui.rounded[currentSize],
      // ui.gap[size],
      ui.width[width],
      ui.text[currentSize],
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
