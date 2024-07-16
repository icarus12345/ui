<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface SelectLabelProps extends PrimitiveProps {
  for?: string
}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'
import { injectSelectGroupContext } from './SelectGroup.vue'
import { injectSelectRootContext } from './SelectRoot.vue'
import { menuItemGroupVariants } from '@ui/shared/variants'

const props = withDefaults(defineProps<SelectLabelProps>(), {
  as: 'div',
})

const groupContext = injectSelectGroupContext({ id: '' })
const rootContext = injectSelectRootContext()
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
