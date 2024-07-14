<script lang="ts">
import type {
  MenuContentImplEmits,
  MenuRootContentTypeProps,
} from './MenuContentImpl.vue'

export type MenuContentEmits = Omit<MenuContentImplEmits, 'entryFocus' | 'openAutoFocus'>

export interface MenuContentProps extends MenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}
</script>

<script setup lang="ts">
import MenuContentModal from './MenuContentModal.vue'
import MenuContentNonModal from './MenuContentNonModal.vue'
import { injectMenuContext, injectMenuRootContext } from './Menu.vue'
import { Presence } from '../Presence'
import { useForwardPropsEmits } from '../../composables/useForwardPropsEmits'

const props = defineProps<MenuContentProps>()
const emits = defineEmits<MenuContentImplEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const menuContext = injectMenuContext()
const rootContext = injectMenuRootContext()
</script>

<template>
  <Presence :present="forceMount || menuContext.open.value">
    <MenuContentModal
      v-if="rootContext.modal.value"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuContentModal>
    <MenuContentNonModal
      v-else
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />
    </MenuContentNonModal>
  </Presence>
</template>
