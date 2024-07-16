<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
// import { cn } from '@/utils/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:w-4 [&>svg]:h-4', props.class)"
  >
    <slot>
      <Icon name="material-symbols:chevron-right" />
    </slot>
  </li>
</template>
