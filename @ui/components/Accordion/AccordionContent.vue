<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface AccordionContentProps extends PrimitiveProps {}
</script>

<script setup lang="ts">
import { CollapsibleContent } from '../Collapsible'
import { injectAccordionItemContext } from './AccordionItem.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'
import { type Variants, paddingVariants } from '@ui/shared/variants'
const props = defineProps<AccordionContentProps>()

const rootContext = injectAccordionRootContext()
const itemContext = injectAccordionItemContext()

useForwardExpose()
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
      --radix-accordion-content-width: var(--radix-collapsible-content-width);
      --radix-accordion-content-height: var(--radix-collapsible-content-height);
    "
    :class="cn(
      'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down bg-foreground/[0.02] rounded-[inherit]',
      paddingVariants({ size: rootContext.size.value }),
      )"
    sizeVariants
  >
    <slot />
  </CollapsibleContent>
</template>
