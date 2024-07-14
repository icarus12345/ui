export {
  default as DialogRoot,
  type DialogRootProps,
  type DialogRootEmits,
} from './DialogRoot.vue'
export {
  default as DialogTrigger,
  type DialogTriggerProps,
} from './DialogTrigger.vue'
export {
  default as DialogPortal,
  type DialogPortalProps,
} from './DialogPortal.vue'
export {
  default as DialogContent,
  type DialogContentProps,
  type DialogContentEmits,
} from './DialogContent.vue'
export {
  default as DialogOverlay,
  type DialogOverlayProps,
} from './DialogOverlay.vue'
export {
  default as DialogClose,
  type DialogCloseProps,
} from './DialogClose.vue'
export {
  default as DialogTitle,
  type DialogTitleProps,
} from './DialogTitle.vue'
export {
  default as DialogDescription,
  type DialogDescriptionProps,
} from './DialogDescription.vue'

import { type VariantProps, cva } from 'class-variance-authority'
export const dialogVariants = cva(
  '',
  {
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        default: 'max-w-sm',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type DialogVariants = VariantProps<typeof dialogVariants>