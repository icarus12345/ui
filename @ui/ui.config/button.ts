export default {
  base: 'ui-button',
  gap: {
    xs: 'gap-1',
    sm: 'gap-1.5',
    md: 'gap-2',
  },
  padding: {
    xs: 'px-2 py-1.5',
    sm: 'px-3 py-[0.7rem]',
    md: 'px-4 py-2',
  },
  iconText: {
    xs: 'text-[1.3rem]',
    md: 'text-[1.95rem]',
  },
  iconPadding: {
    xs: 'p-1',
    md: 'p-1',
  },
  rounded: {
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded',
  },
  text: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  },
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline:
      'border-input bg-background hover:bg-accent hover:text-accent-foreground before:border',
    gradient:
      'gradient-border',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    none: ''
  },
  shape: {
    square: '',
    circle: '',
  },
  default: {
    size: 'md',
    variant: 'default',
    shape: '',
  }
}