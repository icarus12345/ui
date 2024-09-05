<script lang="ts">
import type {
  DialogContentEmits,
  DialogContentProps,
  DialogType,
  DialogSize,
  DialogWidth,
} from '../Dialog/types'
import { 
  injectDialogRootContext,
} from '../Dialog/types'
export type AlertDialogEmits = DialogContentEmits & {
  'ok': [reason: string]
  'dismiss': [reason: string]
}
export interface AlertDialogContentProps extends Omit<DialogContentProps, 'modal'> {
  icon?: string
  title?: string
  description?: string
  content?: string
  OKText?: string
  cancelText?: string
  type?: string
  size?: string
  width?: string
  OKProps?: any
  cancelProps?: any
  callback?:any
}
</script>

<script setup lang="ts">
// import { useForwardExpose, useForwardPropsEmits } from '../../shared'

const props = withDefaults(defineProps<AlertDialogContentProps>(), {
  width: 'md',
  size: 'md',
  type: 'alert',
})
const emits = defineEmits<AlertDialogEmits>()
const loading = ref(false)
const forwarded = useForwardPropsEmits(props, emits)
useForwardExpose()
const rootContext = injectDialogRootContext()
const handleOk = async () => {
  if (typeof props.callback === 'function') {
    const rs = props.callback()
    if (rs instanceof Promise) {
      loading.value = true;
      rs
      .then((rs) => {
        if (rs !== false) {
          rootContext.onOpenChange(false)
        }
      })
      .finally(() => {
        loading.value = false;
      })
    } else if (rs !== false) {
      rootContext.onOpenChange(false)
    }
  } else {
    rootContext.onOpenChange(false)
  }
}

</script>

<template>
  <DialogContent
    :size="size"
    :width="width"
    >
    <DialogHeader>
      <DialogTitle>
        <Icon :name="icon" v-if="typeof icon === 'string'"/>
        {{ title }}
      </DialogTitle>
      <DialogDescription>
        {{ description }}
      </DialogDescription>
    </DialogHeader>
    <DialogBody>
      {{ content }}
    </DialogBody>
    <DialogFooter v-if="OKText || cancelText">
      <Button type="submit" v-if="OKText" @click="handleOk()" :loading="loading" v-bind="OKProps" :size="size">{{ OKText }}</Button>
      <Button type="button" variant="secondary" @click="rootContext.onOpenChange(false)" v-if="cancelText" v-bind="cancelProps" :size="size">
        {{ cancelText }}
      </Button>
    </DialogFooter>
    <DialogClose as-child>
      <IconButton
        class="absolute top-2 right-2"
        variant="ghost"
        aria-label="Close"
        :size="size"
      >
        <Icon name="lucide:x" />
      </IconButton>
    </DialogClose>
  </DialogContent>
</template>
