
<script setup lang="ts">
import { useMounted } from '@vueuse/core'
import { type TeleportProps } from './types'
withDefaults(defineProps<TeleportProps>(), {
  to: 'body',
})

const isMounted = useMounted()
</script>

<template>
  <Teleport
    v-if="isMounted || forceMount"
    :to="to"
    :disabled="disabled"
  >
    <slot />
  </Teleport>
</template>
