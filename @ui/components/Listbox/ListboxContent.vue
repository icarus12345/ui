<script lang="ts">
import { Primitive, type PrimitiveProps } from '../Primitive'
import { injectListboxRootContext } from './ListboxRoot.vue'
import { refAutoReset } from '@vueuse/shared'

export interface ListboxContentProps extends PrimitiveProps { }
</script>

<script setup lang="ts">
import { CollectionSlot } from '../Collection'

defineProps<ListboxContentProps>()

const rootContext = injectListboxRootContext()

const isClickFocus = refAutoReset(false, 10)
</script>

<template>
  <CollectionSlot>
    <Primitive
      role="listbox"
      :as="as"
      :as-child="asChild"
      :tabindex="rootContext.focusable.value ? rootContext.highlightedElement.value ? '-1' : '0' : undefined"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="isClickFocus = true"
      @focus="(ev) => {
        if (isClickFocus)
          return
        rootContext.onEnter(ev)
      }"
      @keydown.down.up.home.end.prevent="(event) => {
        rootContext.focusable.value ? rootContext.onKeydownNavigation(event) : undefined
      }"
      @keydown.enter="rootContext.onKeydownEnter"
      @keydown="rootContext.onKeydownTypeAhead"
    >
      <slot />
    </Primitive>
  </CollectionSlot>
</template>
