<script setup lang="ts">

const fruit = ref()

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
</script>

<template>
  <SelectRoot v-model="fruit" size="sm">
    <SelectTrigger
      aria-label="Customise options"
    >
      <SelectValue placeholder="Select a fruit..." />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
      >
        <SelectScrollUpButton>
          <Icon name="radix-icons:chevron-up" />
        </SelectScrollUpButton>

        <SelectViewport>
          <SelectLabel>
            Fruits
          </SelectLabel>
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in options"
              :key="index"
              :value="option"
            >
              <!-- <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <Icon name="radix-icons:check" />
              </SelectItemIndicator> -->
              <SelectItemText>
                {{ option }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
          <SelectSeparator class="h-[1px] bg-green6 m-[5px]" />
          <SelectLabel>
            Vegetables
          </SelectLabel>
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in vegetables"
              :key="index"
              :value="option"
              :disabled="option === 'Courgette'"
            >
              <!-- <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <Icon name="radix-icons:check" />
              </SelectItemIndicator> -->
              <SelectItemText>
                {{ option }}
              </SelectItemText>
            </SelectItem>
          </SelectGroup>
        </SelectViewport>

        <SelectScrollDownButton>
          <Icon name="radix-icons:chevron-down" />
        </SelectScrollDownButton>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>