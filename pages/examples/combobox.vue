<script setup lang="ts">
import { ref } from 'vue'

const v = ref('')
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
const sizes = ['xs', 'sm', 'default', 'md', 'lg']
const size = ref()
</script>

<template>
  <div class="mb-10">
    <SelectRoot v-model="size" size="sm">
      <SelectTrigger
        aria-label="Customise options"
      >
        <SelectValue placeholder="Select a fruit..." />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
        >
          <SelectViewport>
              <SelectItem
                v-for="(size, index) in sizes"
                :key="index"
                :value="size"
              >
                <!-- <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <Icon name="radix-icons:check" />
                </SelectItemIndicator> -->
                <SelectItemText>
                  {{ size }}
                </SelectItemText>
              </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
  <ComboboxRoot
    v-model="v"
    class="relative"
    :size="size"
  >
    <ComboboxAnchor >
      <ComboboxInput
        placeholder="Placeholder..."
      />
      <ComboboxTrigger />
    </ComboboxAnchor>

    <ComboboxContent>
      <ComboboxViewport>
        <ComboboxEmpty/>

        <ComboboxGroup>
          <ComboboxLabel >
            Fruits
          </ComboboxLabel>

          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >
            <!-- <ComboboxItemIndicator>
              <Icon name="radix-icons:check" />
            </ComboboxItemIndicator> -->
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
          <ComboboxSeparator />
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
            <!-- <ComboboxItemIndicator >
              <Icon name="radix-icons:check" />
            </ComboboxItemIndicator> -->
            <span>
              {{ option }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>