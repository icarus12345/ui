<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/utils/utils'
import { type Variants, variants } from '@ui/shared/variants'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  variant?: Variants['variant']
  size?: Variants['size']
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn(variants({ variant, size }), props.class)">
</template>
