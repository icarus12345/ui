import { computed, ref } from 'vue'
import type { Component, VNode } from 'vue'
import type { DialogRootProps } from '../components/Dialog/types'
import type { AlertDialogContentProps } from '../components/AlertDialog/AlertDialog.vue'

interface DialogConfig {
  root: DialogRootProps,
  content: AlertDialogContentProps
}
const items = ref<DialogConfig[]>([])

const find = (id: string) => {
  return items.value.find(item => item.id === id)
}

const findIndex = (id: string) => {
  return items.value.findIndex(item => item.id === id)
}

const create = (props: AlertDialogContentProps) => {
  const open = ref(true)
  const dismiss = () => {
    open.value = false;
  }
  const item = reactive({
    content: props,
    root: {
      open,
      defaultOpen: true,
      'onUpdate:open'(v) {
        dismiss()
        console.log('onUpdate:open', v);
      },
    },
    onOk() {
      console.log('onOk');
      dismiss()
    },
    dismiss,
  })
  items.value.push(item)
  return item
}

const close = (key?: string) => {
  const index = key ? findIndex(key) : items.value.length - 1
  items.value.splice(index, 1)
}
const $Dialog = {
  find,
  create,
  close
}

export  function useDialog() {
  return {
    items: computed(() => items.value),
    dialog: create,
    create,
    close
  }
}