<script lang="ts">
import type { PrimitiveProps } from '../Primitive'

export interface ComboboxTriggerProps extends PrimitiveProps {
  /** When `true`, prevents the user from interacting with item */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'
import { useForwardExpose } from '../../shared'
import { computed } from 'vue'
import { injectComboboxRootContext } from './ComboboxRoot.vue'
import { type Variants, iconVariants } from '@ui/shared/variants'
import { cn } from '@/utils/utils'
const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
  as: 'button',
})

useForwardExpose()
const rootContext = injectComboboxRootContext()
const disabled = computed(() => props.disabled || rootContext.disabled.value || false)
const { variant, size} = rootContext
</script>

<template>
  <Primitive
    v-bind="props"
    :type="as === 'button' ? 'button' : undefined"
    tabindex="-1"
    aria-label="Show popup"
    aria-haspopup="listbox"
    :aria-expanded="rootContext.open.value"
    :aria-controls="rootContext.contentId"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :aria-disabled="disabled ?? undefined"
    @click="rootContext.onOpenChange(!rootContext.open.value)"
    :class="cn(
      'flex items-center justify-center',
      iconVariants({ size: rootContext.size.value }),
      {'rotate-180': rootContext.open.value}
    )"
  >
    <Icon
      name="radix-icons:chevron-down"
      class=""
    />
  </Primitive>
</template>
