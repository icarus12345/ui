<script lang="ts">
import { RangeCalendarHeading, type RangeCalendarHeadingProps } from '../RangeCalendar'

export interface DateRangePickerHeadingProps extends RangeCalendarHeadingProps {}
</script>

<script setup lang="ts">
const props = defineProps<DateRangePickerHeadingProps>()
defineSlots<{
  default: (props: {
    /** Current month and year */
    headingValue: string
  }) => any
}>()
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    v-bind="props"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>
