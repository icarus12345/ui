<script setup lang="ts">

const isDateUnavailable: CalendarRootProps['isDateUnavailable'] = (date) => {
  return date.day === 17 || date.day === 18
}
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    :is-date-unavailable="isDateUnavailable"
    class="mt-6 rounded-xl bg-white p-4 shadow-md"
    fixed-weeks
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev
        class="inline-flex items-center cursor-pointer text-black justify-center rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          name="radix-icons:chevron-left"
          class="w-6 h-6"
        />
      </CalendarPrev>
      <CalendarHeading class="text-[15px] text-black font-medium" />

      <CalendarNext
        class="inline-flex items-center cursor-pointer justify-center text-black rounded-[9px] bg-transparent w-8 h-8 hover:bg-black hover:text-white active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:shadow-black"
      >
        <Icon
          name="radix-icons:chevron-right"
          class="w-6 h-6"
        />
      </CalendarNext>
    </CalendarHeader>
    <div
      class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none space-y-1"
      >
        <CalendarGridHead>
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="rounded-md text-xs text-green8"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="relative text-center text-sm"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center justify-center rounded whitespace-nowrap text-sm font-normal text-black w-8 h-8 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[disabled]:text-black/30 data-[selected]:!bg-green10 data-[selected]:text-white hover:bg-green5 data-[highlighted]:bg-green5 data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:top-[5px] before:hidden before:rounded-full before:w-1 before:h-1 before:bg-white data-[today]:before:block data-[today]:before:bg-green9 "
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>