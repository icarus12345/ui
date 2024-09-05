// import { padding, rounded, titleText, subTitleText, gap, contentText } from '../../utils/ui'
// export const dialogWidth = {
//   xs: 'max-w-xs',
//   sm: 'max-w-sm',
//   default: 'max-w-[min(44rem,_calc(100dvw_-_3.2rem))]',
//   md: 'max-w-md',
//   lg: 'max-w-lg',
//   xl: 'max-w-xl',
// }

// export const dialogUI: any = {
//   width: dialogWidth,
//   gap,
//   padding,
//   rounded,
//   title: titleText,
//   subTitle: subTitleText,
//   content: contentText
// }

export default {
  base: '',
  header: {
    base: 'rounded-[inherit]',
    padding: {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
    },
    text: {
      xs: 'text-sm',
      sm: 'text-base',
      md: 'text-md',
    },
    subText: {
      xs: 'text-xxs',
      sm: 'text-xs',
      md: 'text-sm',
    }
  },
  footer: {
    base: 'rounded-[inherit] flex gap-2',
    padding: {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
    },
  },
  body: {
    padding: {
      xs: 'px-2',
      sm: 'px-3',
      md: 'px-4',
    },
  },
  rounded: {
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded',
  },
  padding: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
  },
  text: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  },
  width: {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
  },
  // variant: {
  //   none: ''
  // },
  // shape: {
  //   square: '',
  //   circle: '',
  // },
  default: {
    size: 'md',
  }
}