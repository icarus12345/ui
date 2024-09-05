<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface AccordionContentProps extends PrimitiveProps {
  ui?: object
}
</script>

<script setup lang="ts">
import { CollapsibleContent } from '../Collapsible'
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
import accordionUI from './utils'

// import { type Variants, baseVariants } from '@ui/shared/variants'
const props = defineProps<AccordionContentProps>()

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

useForwardExpose()
const { ui }: any = useUI(toRef(props, 'ui'), accordionUI.content)
const uiSize: any = inject('ui-size', undefined)
const currentSize = computed(() => {
  return uiSize?.value
})
</script>

<template>
  <CollapsibleContent
    role="region"
    :hidden="!itemContext.open.value"
    :as-child="props.asChild"
    :aria-labelledby="itemContext.triggerId"
    :data-state="itemContext.dataState.value"
    :data-disabled="itemContext.dataDisabled.value"
    :data-orientation="rootContext.orientation"
    style="
      --ui-accordion-content-width: var(--ui-collapsible-content-width);
      --ui-accordion-content-height: var(--ui-collapsible-content-height);
    "
    class="ui-accordion__content"
  >
  <div :class="cn(
      'ui-accordion__content--inner',
      ui.base,
      ui.padding[currentSize],

      // baseVariants({
      //   size: rootContext.size.value,
      // }),
    )">
    <slot />
  </div>
  </CollapsibleContent>
</template>
