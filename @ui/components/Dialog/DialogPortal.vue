<script setup lang="ts">
import type { DialogPortalProps } from './types'
import { TeleportPrimitive } from '../Teleport'

const props = defineProps<DialogPortalProps>()
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
