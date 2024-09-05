<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
export interface AccordionTriggerProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
// import { useId } from '../../composables/useId'
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
// import { type Variants, baseVariants } from '@ui/shared/variants'
import { CollapsibleTrigger } from '../Collapsible'
import accordionUI from './utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<AccordionTriggerProps & {
  class?: HTMLAttributes['class'],
  ui?: object
}>()

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

itemContext.triggerId ||= useUId(undefined, 'ui-accordion-trigger')
function changeItem() {
  if (itemContext.disabled.value)
    return
  rootContext.changeModelValue(itemContext.value.value)
}
const { ui }: any = useUI(toRef(props, 'ui'), accordionUI.trigger)
const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize?.value
})
</script>

<template>
  <CollapsibleTrigger
    :id="itemContext.triggerId"
    :ref="itemContext.currentRef"
    data-radix-vue-collection-item
    :as="props.as"
    :as-child="props.asChild"
    :aria-disabled="itemContext.disabled.value || undefined"
    :aria-expanded="itemContext.open.value || false"
    :data-disabled="itemContext.dataDisabled.value"
    :data-orientation="rootContext.orientation"
    :data-state="itemContext.dataState.value"
    :disabled="itemContext.disabled.value"
    @click="changeItem"
    :class="cn(
      'ui-accordion__trigger',
      ui.base,
      ui.padding[currentSize],
      // baseVariants({
      //   variant: rootContext.variant.value,
      //   size: rootContext.size.value,
      //   round: rootContext.size.value,
      // }),
      props.class
    )"
  >
    <slot />
    <Icon
      name="radix-icons:chevron-down"
      :class="[
        'ms-auto transition-transform',
        {'rotate-180': itemContext.open.value}
      ]"
    />
  </CollapsibleTrigger>
</template>
