
<script setup lang="ts">
import { 
  type DialogCloseProps,
  injectDialogRootContext,
} from './types'
import { useForwardExpose } from '../../composables/useForwardExpose'
import { Primitive } from '../Primitive'

const props = withDefaults(defineProps<DialogCloseProps>(), {
  as: 'button',
})

useForwardExpose()
const rootContext = injectDialogRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onOpenChange(false)"
    class="dialog-close"
  >
    <slot />
  </Primitive>
</template>
