<script  lang="ts">
import { Button } from '../Button'
import DialogRoot from './DialogRoot.vue'
import DialogContent from './DialogContent.vue'
import DialogHeader from './DialogHeader.vue'
import DialogTitle from './DialogTitle.vue'
import DialogDescription from './DialogDescription.vue'
import DialogFooter from './DialogFooter.vue'
// import { createContext } from 'radix-vue'
const { items } = useDialog()

// const { dialogs } = useDialog()
type DialogProviderContext = {

}
export interface DialogProviderProps {

}
export const [injectDialogProviderContext, dialogProviderContext] = createContext<DialogProviderContext>('DialogProvider')
</script>
<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = withDefaults(defineProps<DialogProviderProps>(), {
  label: 'Dialog',
})
const { label } = toRefs(props)

const viewport = ref<HTMLElement>()
const dialogCount = ref(0)
const isFocusedDialogEscapeKeyDownRef = ref(false)
const isClosePausedRef = ref(false)


dialogProviderContext({
  label,
  dialogCount,
  viewport,
  onViewportChange(el) {
    viewport.value = el
  },
  onDialogAdd() {
    dialogCount.value++
  },
  onDialogRemove() {
    dialogCount.value--
  },
  isFocusedDialogEscapeKeyDownRef,
  isClosePausedRef,

})

const callback = () => {
  alert(0)
}

// <component v-bind="item" v-if="item.component"></component>
</script>

<template>
  <div class="dialog-provider">
    <template v-for="(item, index) in items">
      <DialogRoot v-bind="item.root" >
        <DialogPortal>
          <DialogOverlay />
          <AlertDialog v-bind="item.content" />
        </DialogPortal>
      </DialogRoot>
    </template>
  </div>
</template>