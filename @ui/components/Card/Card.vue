<script lang="ts">
// import type { ComputedRef, Ref } from 'vue'
import type { PrimitiveProps } from '../Primitive'
import type { DataOrientation, Direction, SingleOrMultipleProps, SingleOrMultipleType } from '../../types'
// import { createContext, useDirection, useForwardExpose } from '@/shared'

export interface CardRootProps extends PrimitiveProps {
  /**
   * The reading direction of the Card when applicable. If omitted, assumes LTR (left-to-right) reading mode.
   *
   * @defaultValue "ltr"
   */
  dir?: Direction
  class?: HTMLAttributes['class'],
  size?: string
  ui?: object
}

export type CardRootEmits<T extends SingleOrMultipleType = SingleOrMultipleType> = {
  /**
   * Event handler called when the expanded state of an item changes
   */
  'update:modelValue': [value: (T extends 'single' ? string : string[]) | undefined]
}

export type CardRootContext<P extends CardRootProps> = {
  direction: Ref<P['dir']>
  ui?: object
  size: string
}

export const [injectCardRootContext, provideCardRootContext]
  = createContext<CardRootContext<CardRootProps>>('CardRoot')
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/utils'
import cardUI from './utils'

const uiSize: any = inject('ui-size', undefined)
// import CardHeader from './CardHeader.vue';
// import CardTitle from './CardTitle.vue';

// const slots = useSlots();
const props = withDefaults(defineProps<CardRootProps>(), {
  size: 'md'
})
// const showHead = computed(() => {
//   return props.title || slots.header !== undefined
// });
const { dir, size } = toRefs(props)
const direction = useDirection(dir)
provideCardRootContext({
  direction,
  // variant,
  size: size.value,
})
const currentSize = computed(() => {
  return uiSize?.value || props.size
})
provide('ui-size', currentSize)
const { ui, attrs }: any = useUI(toRef(props, 'ui'), cardUI)
</script>

<template>
  <div
    :class="[
      'ui-card',
      ui.rounded[currentSize],
      // baseVariants({
      //   size: 'none',
      //   round: size,
      // }),
      props.class,
    ]"
    >
    <!-- <slot name="header">
      <CardHeader v-if="showHead">
        <Icon v-if="icon" :name="icon"></Icon>
        <CardTitle>{{title}}</CardTitle>
      </CardHeader>
    </slot> -->
    <slot />
  </div>
</template>
