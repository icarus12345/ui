<script setup lang="ts">
import { ref } from 'vue'

const v = ref('')
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
</script>

<template>
  <ComboboxRoot
    v-model="v"
    class="relative"
  >
    <ComboboxAnchor class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
      <ComboboxInput
        class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
        placeholder="Placeholder..."
      />
      <ComboboxTrigger>
        <Icon
          name="radix-icons:chevron-down"
          class="h-4 w-4 text-grass11"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent>
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

        <ComboboxGroup>
          <ComboboxLabel >
            Fruits
          </ComboboxLabel>

          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >
            <ComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon name="radix-icons:check" />
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
          <ComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
        </ComboboxGroup>

        <ComboboxGroup>
          <ComboboxLabel
            
          >
            Vegetables
          </ComboboxLabel>
          <ComboboxItem
            v-for="(option, index) in vegetables"
            :key="index"
            :value="option"
          >
            <ComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon name="radix-icons:check" />
            </ComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>