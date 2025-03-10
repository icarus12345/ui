<script lang="ts">
// import type { ComputedRef, VNodeRef } from 'vue'
import type { CollapsibleRootProps } from '../Collapsible'
import { injectAccordionRootContext } from './AccordionRoot.vue'
// import { createContext, useArrowNavigation, useForwardExpose } from '../../shared'

enum AccordionItemState {
  Open = 'open',
  Closed = 'closed',
}

export interface AccordionItemProps
  extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   * When `true`, prevents the user from interacting with the item.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string
  ui?: object
}

interface AccordionItemContext {
  open: ComputedRef<boolean>
  dataState: ComputedRef<AccordionItemState>
  disabled: ComputedRef<boolean>
  dataDisabled: ComputedRef<'' | undefined>
  triggerId: string
  currentRef: VNodeRef
  currentElement: ComputedRef<HTMLElement | undefined>
  value: ComputedRef<string>
}

export const [injectAccordionItemContext, provideAccordionItemContext]
  = createContext<AccordionItemContext>('AccordionItem')
</script>

<script setup lang="ts">
import { CollapsibleRoot } from '../Collapsible'
// import { computed } from 'vue'
import accordionUI from './utils'

const props = defineProps<AccordionItemProps& {
  class?: HTMLAttributes['class'],
}>()

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value
  }) => any
}>()

const rootContext = injectAccordionRootContext()

const open = computed(() =>
  rootContext.isSingle.value
    ? props.value === rootContext.modelValue.value
    : Array.isArray(rootContext.modelValue.value)
    && rootContext.modelValue.value.includes(props.value),
)

const disabled = computed(() => {
  return (
    rootContext.disabled.value
    || props.disabled
    || (rootContext.isSingle.value && open.value && !rootContext.collapsible)
  )
})

const dataDisabled = computed(() => (disabled.value ? '' : undefined))

const dataState = computed(() =>
  open.value ? AccordionItemState.Open : AccordionItemState.Closed,
)

defineExpose({ open, dataDisabled })
const { currentRef, currentElement } = useForwardExpose()

provideAccordionItemContext({
  open,
  dataState,
  disabled,
  dataDisabled,
  triggerId: '',
  currentRef,
  currentElement,
  value: computed(() => props.value),
})

function handleArrowKey(e: KeyboardEvent) {
  useArrowNavigation(
    e,
    currentElement.value,
    rootContext.parentElement.value!,
    {
      arrowKeyOptions: rootContext.orientation,
      dir: rootContext.direction.value,
      focus: true,
    },
  )
}
const { ui }: any = useUI(toRef(props, 'ui'), accordionUI.item)
</script>

<template>
  <CollapsibleRoot
    :data-orientation="rootContext.orientation"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :disabled="disabled"
    :open="open"
    :as="props.as"
    :as-child="props.asChild"
    @keydown.up.down.left.right.home.end="handleArrowKey"
    :class="cn(
      'ui-accordion__item',
      ui.base,
      props.class
      )"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
