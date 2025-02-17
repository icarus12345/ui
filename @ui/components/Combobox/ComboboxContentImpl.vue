<script lang="ts">
import type { Ref } from 'vue'
import {
  createContext,
  useBodyScrollLock,
  useForwardExpose,
  useForwardProps,
  useHideOthers,
} from '../../shared'

import type { DismissableLayerEmits, DismissableLayerProps } from '../DismissableLayer/types'
import type { PopperContentProps } from '../Popper'

export type ComboboxContentImplEmits = DismissableLayerEmits

export interface ComboboxContentImplProps extends PopperContentProps, DismissableLayerProps {
  /**
   * The positioning mode to use, <br>
   * `inline` is the default and you can control the position using CSS. <br>
   * `popper` positions content in the same way as our other primitives, for example `Popover` or `DropdownMenu`.
   */
  position?: 'inline' | 'popper'
  /** The document.body will be lock, and scrolling will be disabled. */
  bodyLock?: boolean
  /**
   * Allow component to be dismissableLayer.
   * @deprecated (Will be removed in version 2.0, use `Listbox` instead)
   */
  dismissable?: boolean
}

export const [injectComboboxContentContext, provideComboboxContentContext]
  = createContext<{
    position: Ref<'inline' | 'popper'>
  }>('ComboboxContent')
</script>

<script setup lang="ts">
import {
  computed,
  onMounted,
  toRefs,
} from 'vue'
import { injectComboboxRootContext } from './ComboboxRoot.vue'
import { DismissableLayer } from '../DismissableLayer'
import { PopperContent } from '../Popper'
import { Primitive } from '../Primitive'
import { CollectionSlot } from '../Collection'

const props = withDefaults(defineProps<ComboboxContentImplProps>(), {
  position: 'inline',
  dismissable: true,
})
const emits = defineEmits<ComboboxContentImplEmits>()

const { position } = toRefs(props)
const rootContext = injectComboboxRootContext()

useBodyScrollLock(props.bodyLock)

const { forwardRef, currentElement } = useForwardExpose()
useHideOthers(currentElement)

const pickedProps = computed(() => {
  if (props.position === 'popper')
    return props
  else return {}
})

const forwardedProps = useForwardProps(pickedProps.value)

function handleLeave(ev: PointerEvent) {
  rootContext.onSelectedValueChange('')
}

onMounted(() => {
  rootContext.onContentElementChange(currentElement.value)
})

const popperStyle = {
  // Ensure border-box for floating-ui calculations
  'boxSizing': 'border-box',
  // '--ui-combobox-content-transform-origin':
  //       'var(--ui-popper-transform-origin)',
  // '--ui-combobox-content-available-width':
  //       'var(--ui-popper-available-width)',
  // '--ui-combobox-content-available-height':
  //       'var(--ui-popper-available-height)',
  // '--ui-combobox-trigger-width': 'var(--ui-popper-anchor-width)',
  // '--ui-combobox-trigger-height': 'var(--ui-popper-anchor-height)',
}

provideComboboxContentContext({ position })
</script>

<template>
  <CollectionSlot>
    <DismissableLayer
      v-if="dismissable"
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @dismiss="rootContext.onOpenChange(false)"
      @focus-outside="(ev) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(ev.target as Node)) ev.preventDefault()
        emits('focusOutside', ev)
      }"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @pointer-down-outside="(ev) => {
        // if clicking inside the combobox, prevent dismiss
        if (rootContext.parentElement.value?.contains(ev.target as Node)) ev.preventDefault()
        emits('pointerDownOutside', ev)
      }"
    >
      <component
        :is="position === 'popper' ? PopperContent : Primitive "
        v-bind="{ ...$attrs, ...forwardedProps }"
        :id="rootContext.contentId"
        :ref="forwardRef"
        role="listbox"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :style="{
          // flex layout so we can place the scroll buttons properly
          display: 'flex',
          flexDirection: 'column',
          // reset the outline by default as the content MAY get focused
          outline: 'none',
          ...(position === 'popper' ? popperStyle : {}),
        }"
        @pointerleave="handleLeave"
      >
        <slot />
      </component>
    </DismissableLayer>

    <component
      :is="position === 'popper' ? PopperContent : Primitive "
      v-else
      v-bind="{ ...$attrs, ...pickedProps }"
      :id="rootContext.contentId"
      :ref="forwardRef"
      role="listbox"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :style="{
        // flex layout so we can place the scroll buttons properly
        display: 'flex',
        flexDirection: 'column',
        // reset the outline by default as the content MAY get focused
        outline: 'none',
        ...(position === 'popper' ? popperStyle : {}),
      }"
      @pointerleave="handleLeave"
    >
      <slot />
    </component>
  </CollectionSlot>
</template>
