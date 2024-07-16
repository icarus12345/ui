<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
export interface AccordionTriggerProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
// import { useId } from '../../composables/useId'
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
import { type Variants, accordionTriggerVariants } from '@ui/shared/variants'
import { CollapsibleTrigger } from '../Collapsible'

const props = defineProps<AccordionTriggerProps & {
  class?: HTMLAttributes['class'],
}>()

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

itemContext.triggerId ||= useUId(undefined, 'ui-accordion-trigger')
function changeItem() {
  if (itemContext.disabled.value)
    return
  rootContext.changeModelValue(itemContext.value.value)
}
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
      'w-full outline-none flex items-center justify-center shadow-[0_1px_0_hsl(var(--border))] rounded-none ui-hovered',
      accordionTriggerVariants({ variant: rootContext.variant.value, size: rootContext.size.value }),
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
