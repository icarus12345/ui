<script lang="ts">
import type { Ref } from 'vue'
import type { Direction } from '@ui/types'
// import { createContext, useDirection, useForwardExpose } from '../../shared'
import type { MenuEmits, MenuProps } from '../Menu'

type ContextMenuContext = {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  modal: Ref<boolean>
  dir: Ref<Direction>
}

export interface ContextMenuProps extends Omit<MenuProps, 'open'> {}
export type ContextMenuEmits = MenuEmits

export const [injectContextMenuContext, provideContextMenuContext]
  = createContext<ContextMenuContext>('ContextMenu')
</script>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { Menu } from '../Menu'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuProps>(), {
  modal: true,
})
const emits = defineEmits<ContextMenuEmits>()
const { dir: propDir, modal } = toRefs(props)
useForwardExpose()
const dir = useDirection(propDir)

const open = ref(false)

provideContextMenuContext({
  open,
  onOpenChange: (value: boolean) => {
    open.value = value
  },
  dir,
  modal,
})

watch(open, (value) => {
  emits('update:open', value)
})
</script>

<template>
  <Menu
    v-model:open="open"
    :dir="dir"
    :modal="modal"
  >
    <slot />
  </Menu>
</template>
