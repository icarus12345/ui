<script setup lang="ts">
import { 
  type DialogContentImplProps,
  type DialogContentImplEmits,
  injectDialogRootContext
} from './types'
import { DismissableLayer } from '../DismissableLayer'
import { FocusScope } from '../FocusScope'
import { getOpenState } from '../Menu/utils'
import { onMounted } from 'vue'

const props = defineProps<DialogContentImplProps>()
const emits = defineEmits<DialogContentImplEmits>()

const rootContext = injectDialogRootContext()
const { forwardRef, currentElement: contentElement } = useForwardExpose()

rootContext.titleId ||= useUId(undefined, 'ui-dialog-title')
rootContext.descriptionId ||= useUId(undefined, 'ui-dialog-description')

onMounted(() => {
  rootContext.contentElement = contentElement

  // Preserve the `DialogTrigger` element in case it was triggered programmatically
  if (document.activeElement !== document.body)
    rootContext.triggerElement.value = document.activeElement as HTMLElement
})


</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="props.trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <DismissableLayer
      :id="rootContext.contentId"
      :ref="forwardRef"
      :as="as"
      :as-child="asChild"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      role="dialog"
      :aria-describedby="rootContext.descriptionId"
      :aria-labelledby="rootContext.titleId"
      :data-state="getOpenState(rootContext.open.value)"
      v-bind="$attrs"
      @dismiss="rootContext.onOpenChange(false)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
    >
      <slot />
    </DismissableLayer>
  </FocusScope>
</template>
