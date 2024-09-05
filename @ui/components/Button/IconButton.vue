<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from '../Primitive'
import { cn } from '@/utils/utils'
import { useUI } from '../../composables/useUI'
import buttonUI from './utils'
import type { ButtonSize, ButtonVariant } from '../../types/button.d'

const appConfig = useAppConfig()


interface IconButtonProps extends PrimitiveProps {
  variant?: string
  size?: string
  class?: HTMLAttributes['class']
  loading?: Boolean,
  ui?: object
}

const uiSize: any = inject('ui-size', undefined)


const props = withDefaults(defineProps<IconButtonProps>(), {
  as: 'button',
})

const currentSize: any = computed(() => {
  return props.size || uiSize?.value as ButtonSize || 'md'
})
// const config = mergeConfig<typeof button>(appConfig.ui?.button, button)
const { ui, attrs }: any = useUI(toRef(props, 'ui'), buttonUI)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(
      ui.base,
      ui.iconText[currentSize],
      ui.iconPadding[currentSize],
      ui.rounded[currentSize],
      ui.variant[variant || 'default'],
      ui.gap[currentSize],
      // props.padded && ui.value[isSquare.value ? 'square' : 'padding'][size.value],
      // variant?.replaceAll('{color}', props.color),
      // props.block ? ui.value.block : ui.value.inline
      props.class,
    )"
    :data-loading="loading"
  >
    <slot />
  </Primitive>
</template>
