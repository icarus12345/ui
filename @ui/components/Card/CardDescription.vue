<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'

const props = defineProps<{
  class?: HTMLAttributes['class'],
  ui?: object
}>()
</script>

<template>
  <p :class="cn('ui-card-description text-sm text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
