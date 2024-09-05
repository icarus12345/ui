export type Size = 'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl'
export const padding = {
  xs: 'p-2',
  sm: 'p-3',
  default: 'p-3.5',
  md: 'p-4',
  lg: 'p-5',
  xl: 'p-6',
}
export const paddingX = {
  xs: 'px-2',
  sm: 'px-3',
  default: 'px-3.5',
  md: 'px-4',
  lg: 'px-5',
  xl: 'px-6',
}
export const paddingY = {
  xs: 'py-1.5',
  sm: 'py-[0.7rem]',
  default: 'py-2',
  md: 'py-[0.9rem]',
  lg: 'py-2.5',
  xl: 'py-3',
}
export const rounded = {
  xs: 'rounded-xs',
  sm: 'rounded-sm',
  default: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
}
export const titleText = {
  xs: 'text-sm',
  sm: 'text-md',
  default: 'text-md',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-xxl',
}
export const subTitleText = {
  xs: 'text-xxs',
  sm: 'text-xs',
  default: 'text-sm',
  md: 'text-base',
  lg: 'text-md',
  xl: 'text-lg',
}
export const gap = {
  xs: 'gap-2',
  sm: 'gap-3',
  default: 'gap-3.5',
  md: 'gap-4',
  lg: 'gap-5',
  xl: 'gap-6',
}
export const contentText = {
  xs: 'text-xs',
  sm: 'text-sm',
  default: 'text-base',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
}

import { defu, createDefu } from 'defu'
import { extendTailwindMerge } from 'tailwind-merge'
import type { Strategy } from '../types'

const customTwMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      icons: [(classPart: string) => /^i-/.test(classPart)]
    }
  }
})

const defuTwMerge = createDefu((obj, key, value, namespace) => {
  if (namespace === 'default' || namespace.startsWith('default.')) {
    return false
  }
  if (namespace === 'popper' || namespace.startsWith('popper.')) {
    return false
  }
  if (namespace.endsWith('avatar') && key === 'size') {
    return false
  }
  if (namespace.endsWith('chip') && key === 'size') {
    return false
  }
  if (namespace.endsWith('badge') && key === 'size' || key === 'color' || key === 'variant') {
    return false
  }
  if (typeof obj[key] === 'string' && typeof value === 'string' && obj[key] && value) {
    // @ts-ignore
    obj[key] = customTwMerge(obj[key], value)
    return true
  }
})

export function mergeConfig<T> (strategy: Strategy, ...configs: any): T {
  if (strategy === 'override') {
    return defu({}, ...configs) as T
  }

  return defuTwMerge({}, ...configs) as T
}

export function hexToRgb (hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (_, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : null
}

export function getSlotsChildren (slots: any) {
  let children = slots.default?.()
  if (children?.length) {
    children = children.flatMap(c => {
      if (typeof c.type === 'symbol') {
        if (typeof c.children === 'string') {
          // `v-if="false"` or commented node
          return
        }
        return c.children
      } else if (c.type.name === 'ContentSlot') {
        return c.ctx.slots.default?.()
      }
      return c
    }).filter(Boolean)
  }
  return children || []
}

/**
 * "123-foo" will be parsed to 123
 * This is used for the .number modifier in v-model
 */
export function looseToNumber (val: any): any {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}