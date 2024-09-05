<script setup lang="ts">
import { useForwardExpose } from '../../shared'
import {
  injectDialogRootContext,
  type DialogTitleProps
} from './types'
import { Primitive } from '../Primitive'

const props = withDefaults(defineProps<DialogTitleProps>(), { as: 'h2' })
const rootContext = injectDialogRootContext()
useForwardExpose()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.titleId"
    class="ui-dialog-title"
  >
    <slot />
  </Primitive>
</template>
