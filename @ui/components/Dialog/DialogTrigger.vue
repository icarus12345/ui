
<script setup lang="ts">
import { onMounted } from 'vue'
import type { DialogTriggerProps } from './types'
import { injectDialogRootContext } from './types'
// import { useForwardExpose } from '../../composables/useForwardExpose'
// import { useId } from '../../composables/useId'
import { Primitive } from '../Primitive'

const props = withDefaults(defineProps<DialogTriggerProps>(), {
  as: 'button',
})
const rootContext = injectDialogRootContext()
const { forwardRef, currentElement } = useForwardExpose()

rootContext.contentId ||= useUId(undefined, 'ui-dialog-content')
onMounted(() => {
  rootContext.triggerElement.value = currentElement.value
})
</script>

<template>
  <Primitive
    v-bind="props"
    :ref="forwardRef"
    :type="as === 'button' ? 'button' : undefined"
    aria-haspopup="dialog"
    :aria-expanded="rootContext.open.value || false"
    :aria-controls="rootContext.open.value ? rootContext.contentId : undefined"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    @click="rootContext.onOpenToggle"
    class="dialog-trigger"
  >
    <slot />
  </Primitive>
</template>
