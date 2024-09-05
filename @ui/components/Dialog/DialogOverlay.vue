<script setup lang="ts">
import { useForwardExpose } from '../../shared'
import {
  injectDialogRootContext,
  type DialogOverlayProps,
} from './types'
import { Presence } from '../Presence'

defineProps<DialogOverlayProps>()
const rootContext = injectDialogRootContext()

const { forwardRef } = useForwardExpose()
</script>

<template>
  <Presence
    v-if="rootContext?.modal.value"
    :present="forceMount || rootContext.open.value"
    class="ui-dialog-overlay"
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
