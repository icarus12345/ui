<script setup lang="ts">
import {
  injectDialogRootContext,
  type DialogDescriptionProps,
} from './types'
import { Primitive } from '../Primitive'
import { useForwardExpose } from '../../shared'
import dialogUI from './utils'

const props = withDefaults(defineProps<DialogDescriptionProps & {
  ui?: object
}>(), { as: 'p' })

useForwardExpose()
const rootContext = injectDialogRootContext()
const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize.value || 'md'
})
const { ui }: any = useUI(toRef(props, 'ui'), dialogUI.header)
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.descriptionId"
    :class="[
      'ui-dialog-description',
      ui.subText[currentSize]
    ]"
  >
    <slot />
  </Primitive>
</template>
