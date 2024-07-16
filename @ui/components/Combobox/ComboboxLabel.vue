<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface ComboboxLabelProps extends PrimitiveProps {
  for?: string
}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'
import { useForwardExpose } from '../../shared'
import { injectComboboxGroupContext } from './ComboboxGroup.vue'
import { injectComboboxRootContext } from './ComboboxRoot.vue'
import { menuItemGroupVariants } from '@ui/shared/variants'
const props = withDefaults(defineProps<ComboboxLabelProps>(), {
  as: 'div',
})

useForwardExpose()
const groupContext = injectComboboxGroupContext({ id: '' })
const rootContext = injectComboboxRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="groupContext.id"
    :class="menuItemGroupVariants({size: rootContext.size.value})"
  >
    <slot />
  </Primitive>
</template>
