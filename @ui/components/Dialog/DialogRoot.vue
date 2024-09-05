<script setup lang="ts">
import type { Ref } from 'vue'
import {
  type DialogRootProps,
  type DialogRootEmits,
  provideDialogRootContext,
} from './types'
import { ref, toRefs } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})
const emit = defineEmits<DialogRootEmits>()

defineSlots<{
  default: (props: {
    /** Current open state */
    open: typeof open.value
  }) => any
}>()

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false,
}) as Ref<boolean>

const triggerElement = ref<HTMLElement>()
const contentElement = ref<HTMLElement>()
const { modal } = toRefs(props)

provideDialogRootContext({
  open,
  modal,
  openModal: () => {
    open.value = true
  },
  onOpenChange: (value) => {
    open.value = value
  },
  onOpenToggle: () => {
    open.value = !open.value
  },
  contentId: '',
  titleId: '',
  descriptionId: '',
  triggerElement,
  contentElement,
})
</script>

<template>
  <slot :open="open" />
</template>
