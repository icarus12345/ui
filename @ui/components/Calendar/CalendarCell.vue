<script lang="ts">
import type { PrimitiveProps } from '../Primitive'
import type { DateValue } from '@internationalized/date'

export interface CalendarCellProps extends PrimitiveProps {
  /** The date value for the cell */
  date: DateValue
}
</script>

<script setup lang="ts">
import { Primitive } from '../Primitive'
import { injectCalendarRootContext } from './CalendarRoot.vue'

withDefaults(defineProps<CalendarCellProps>(), { as: 'td' })
const rootContext = injectCalendarRootContext()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    role="gridcell"
    :aria-selected="rootContext.isDateSelected(date) ? true : undefined"
    :aria-disabled="rootContext.isDateDisabled(date) || rootContext.isDateUnavailable?.(date)"
    :data-disabled="rootContext.isDateDisabled(date) ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
