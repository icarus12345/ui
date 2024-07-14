import { type VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-base ring-offset-background transition-colors ui-outline ui-disable',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-6 rounded px-2 text-xs',
        sm: 'h-7 rounded-md px-2.5 text-sm',
        default: 'h-8 px-3 py-2',
        md: 'h-9 rounded-md px-3.5 text-md',
        lg: 'h-10 rounded-md px-4 text-lg',
        icon: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
