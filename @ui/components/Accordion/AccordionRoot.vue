<script lang="ts">
// import type { ComputedRef, Ref } from 'vue'
import type { PrimitiveProps } from '../Primitive'
import type { DataOrientation, Direction, SingleOrMultipleProps, SingleOrMultipleType } from '../../types'
// import { createContext, useDirection, useForwardExpose } from '@/shared'

export interface AccordionRootProps<ValidValue = string | string[], ExplicitType = SingleOrMultipleType>
  extends PrimitiveProps, SingleOrMultipleProps<ValidValue, ExplicitType> {
  /**
   * When type is "single", allows closing content when clicking trigger for an open item.
   * When type is "multiple", this prop has no effect.
   *
   * @defaultValue false
   */
  collapsible?: boolean

  /**
   * When `true`, prevents the user from interacting with the accordion and all its items
   *
   * @defaultValue false
   */
  disabled?: boolean

  /**
   * The reading direction of the accordion when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @defaultValue "ltr"
   */
  dir?: Direction

  /**
   * The orientation of the accordion.
   *
   * @defaultValue "vertical"
   */
  orientation?: DataOrientation,
  class?: HTMLAttributes['class'],
  variant?: string
  size?: string,
  ui?: object

}

export type AccordionRootEmits<T extends SingleOrMultipleType = SingleOrMultipleType> = {
  /**
   * Event handler called when the expanded state of an item changes
   */
  'update:modelValue': [value: (T extends 'single' ? string : string[]) | undefined]
}

export type AccordionRootContext<P extends AccordionRootProps> = {
  disabled: Ref<P['disabled']>
  direction: Ref<P['dir']>
  orientation: P['orientation']
  parentElement: Ref<HTMLElement | undefined>
  changeModelValue: (value: string) => void
  isSingle: ComputedRef<boolean>
  modelValue: Ref<string | undefined | string[]>
  collapsible: boolean,

  variant: Ref<string | undefined>
  size: Ref<string | undefined>
}

export const [injectAccordionRootContext, provideAccordionRootContext]
  = createContext<AccordionRootContext<AccordionRootProps>>('AccordionRoot')
</script>

<script setup lang="ts" generic="ValidValue extends (string | string[]), ExplicitType extends SingleOrMultipleType">
import { Primitive } from '../Primitive'
import accordionUI from './utils'
import type { HTMLAttributes } from 'vue'
// import { useSingleOrMultipleValue } from '@/shared/useSingleOrMultipleValue'
// import { toRefs } from 'vue'
const uiSize: any = inject('ui-size', undefined)
const props = withDefaults(defineProps<AccordionRootProps<ValidValue, ExplicitType>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
})

const emits = defineEmits<AccordionRootEmits<ExplicitType>>()

defineSlots<{
  default: (props: {
    /** Current active value */
    modelValue: typeof modelValue.value
  }) => any
}>()

const { dir, disabled, variant, size } = toRefs(props)
const direction = useDirection(dir)

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits)

const { forwardRef, currentElement: parentElement } = useForwardExpose()
const currentSize = computed(() => {
  return uiSize?.value || props.size
})
provideAccordionRootContext({
  disabled,
  direction,
  orientation: props.orientation,
  parentElement,
  isSingle,
  collapsible: props.collapsible,
  modelValue,
  changeModelValue,
  variant,
  size,
})

provide('ui-size', currentSize)
const { ui, attrs }: any = useUI(toRef(props, 'ui'), accordionUI)

</script>

<template>
  <Primitive
    :ref="forwardRef"
    :as-child="asChild"
    :as="as"
    :class="[
      'ui-accordion',
      ui.rounded[currentSize],
      props.class,
    ]"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
