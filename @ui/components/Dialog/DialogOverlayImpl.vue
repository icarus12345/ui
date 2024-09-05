<script setup lang="ts">
import {
  injectDialogRootContext,
  type DialogOverlayImplProps,
} from './types'
import { Primitive } from '../Primitive'
import { useBodyScrollLock, useForwardExpose } from '../../shared'

defineProps<DialogOverlayImplProps>()
const rootContext = injectDialogRootContext()

useBodyScrollLock(true)
useForwardExpose()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    style="pointer-events: auto"
  >
    <slot />
  </Primitive>
</template>
