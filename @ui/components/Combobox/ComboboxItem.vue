<script lang="ts">
import type { Ref } from 'vue'
import type { PrimitiveProps } from '../Primitive'
// import { createContext, handleAndDispatchCustomEvent, useForwardExpose, useId } from '../../shared'
import type { AcceptableValue } from './ComboboxRoot.vue'
import type { HTMLAttributes } from 'vue'

export type SelectEvent<T> = CustomEvent<{ originalEvent: PointerEvent, value?: T }>
interface ComboboxItemContext {
  isSelected: Ref<boolean>
}

export const [injectComboboxItemContext, provideComboboxItemContext]
  = createContext<ComboboxItemContext>('ComboboxItem')

export type ComboboxItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>]
}

export interface ComboboxItemProps<T = AcceptableValue> extends PrimitiveProps {
  /** The value given as data when submitted with a `name`. */
  value: T
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean,
  class?: HTMLAttributes['class']
}

const COMBOBOX_SELECT = 'combobox.select'
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import {
  computed,
  nextTick,
  ref,
  toRefs,
} from 'vue'
import { injectComboboxRootContext } from './ComboboxRoot.vue'
import { injectComboboxGroupContext } from './ComboboxGroup.vue'
import {
  Primitive,
} from '../Primitive'
import { CollectionItem } from '../Collection'
import isEqual from 'fast-deep-equal'
import { type Variants, menuItemVariants } from '@ui/shared/variants'
import { cn } from '@/utils/utils'
const props = defineProps<ComboboxItemProps<T>>()
const emits = defineEmits<ComboboxItemEmits<T>>()

const { disabled } = toRefs(props)

const rootContext = injectComboboxRootContext()
injectComboboxGroupContext({ id: '', options: ref([]) })
const { forwardRef } = useForwardExpose()

const isSelected = computed(() =>
  rootContext.multiple.value && Array.isArray(rootContext.modelValue.value)
    ? rootContext.modelValue.value?.some(val => isEqual(val, props.value))
    : isEqual(rootContext.modelValue?.value, props.value),
)

const isFocused = computed(() => isEqual(rootContext.selectedValue.value, props.value))
const textId = useUId(undefined, 'ui-combobox-item')
const optionId = useUId(undefined, 'ui-combobox-option')

const isInOption = computed(() =>
  rootContext.isUserInputted.value
    ? rootContext.searchTerm.value === ''
    || !!rootContext.filteredOptions.value.find(i => isEqual(i, props.value))
    : true)

async function handleSelect(ev: SelectEvent<T>) {
  emits('select', ev)
  if (ev?.defaultPrevented)
    return

  if (!disabled.value && ev)
    rootContext!.onValueChange(props.value)
}

function handleSelectCustomEvent(ev?: PointerEvent) {
  if (!ev)
    return
  const eventDetail = { originalEvent: ev, value: props.value }
  handleAndDispatchCustomEvent(COMBOBOX_SELECT, handleSelect, eventDetail)
}

async function handlePointerMove(event: PointerEvent) {
  await nextTick()
  if (event.defaultPrevented)
    return

  rootContext.onSelectedValueChange(props.value)
}

if (props.value === '') {
  throw new Error(
    'A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.',
  )
}

provideComboboxItemContext({
  isSelected,
})

</script>

<template>
  <CollectionItem
    :value="value"
    :class="cn(menuItemVariants({ variant: rootContext.variant.value, size: rootContext.size.value }), props.class)"
    >
    <Primitive
      v-show="isInOption"
      :id="optionId"
      :ref="forwardRef"
      role="option"
      tabindex="-1"
      :aria-labelledby="textId"
      :data-highlighted="isFocused ? '' : undefined"
      :aria-selected="isSelected"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      :as="as"
      :as-child="asChild"
      :data-hidden="!isInOption ? true : undefined"
      @click="handleSelectCustomEvent"
      @pointermove="handlePointerMove"
    >
      <slot>{{ value }}</slot>
      <ComboboxItemIndicator as-child>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-auto" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>
      </ComboboxItemIndicator>
    </Primitive>
  </CollectionItem>
</template>
