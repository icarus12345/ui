import { type VariantProps, cva } from 'class-variance-authority'
const size = {
  xs: 'size-xs',
  sm: 'size-sm',
  default: 'size-default',
  md: 'size-md',
  lg: 'size-lg',
}
const config: any = {
  variants: {
    variant: {
      default: ''
    },
    size,
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
}
export const variants = cva(
  'flex items-center w-full border border-input bg-background ring-offset-background placeholder:text-muted-foreground ui-disable ui-outline',
  config,
)

export const fieldControlVariants = cva(
  'relative flex items-center w-full ring-offset-background placeholder:text-muted-foreground bg-transparent outline-none',
  config,
)

export const iconVariants = cva(
  '',
  {
    variants: {
      size: {
        xs: 'min-h-6 min-w-6 text-xs',
        sm: 'min-h-7 min-w-7 text-sm',
        default: 'min-h-8 min-w-8 text-base',
        md: 'min-h-9 min-w-9 text-md',
        lg: 'min-h-10 min-w-10 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export const menuItemVariants = cva(
  'relative gap-1 flex items-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none ui-disable text-foreground ui-focused',
  config,
)

export const menuItemGroupVariants = cva(
  'relative gap-1 flex items-center whitespace-nowrap text-foreground/50',
  config,
)

export const accordionTriggerVariants = cva(
  '',
  config,
)

export const paddingVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs p-2',
      sm: 'text-sm p-2.5',
      default: 'text-default p-3',
      md: 'text-md p-3.5',
      lg: 'text-lg p-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type Variants = VariantProps<typeof variants>