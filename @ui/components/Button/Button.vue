<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from '../Primitive'
import { type ButtonVariants, buttonVariants } from './types'
import { cn } from '@/utils/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: Boolean,
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(
      buttonVariants({ variant, size }),
      props.class,
      { 'pointer-events-none': loading }
    )"
  >
    <slot />
    <span class="absolute inset-0 rounded-[inherit] border-inherit bg-background/50 flex" v-if="loading" >
      <Icon name="lucide:loader" class="w-4 h-4 animate-spin m-auto" />
    </span>
  </Primitive>
</template>
