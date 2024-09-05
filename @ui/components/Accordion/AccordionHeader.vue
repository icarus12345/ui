<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface AccordionHeaderProps extends PrimitiveProps {
  ui?: object
}
</script>

<script setup lang="ts">
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
import { Primitive } from '../Primitive'
import accordionUI from './utils'

const props = withDefaults(defineProps<AccordionHeaderProps>(), {
  as: 'div',
})

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

useForwardExpose()
const { ui }: any = useUI(toRef(props, 'ui'), accordionUI.header)
const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize?.value
})
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :data-orientation="rootContext.orientation"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
    :class="[
      'ui-accordion__header',
      ui.base,
      ui.padding[currentSize],
    ]"
  >
    <slot />
  </Primitive>
</template>
