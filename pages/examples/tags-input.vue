<script setup lang="ts">
import { ref } from 'vue'
// import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue'

const modelValue = ref(['Apple', 'Banana'])
</script>

<template>
  <TagsInputRoot
    v-model="modelValue"
    class="flex gap-2 items-center border p-2 rounded-lg w-full max-w-[480px] flex-wrap border-blackA7 bg-white"
  >
    <TagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="text-white flex shadow-md items-center justify-center gap-2 bg-green8 aria-[current=true]:bg-green9 rounded p-1"
    >
      <TagsInputItemText class="text-sm pl-1" />
      <TagsInputItemDelete class="p-0.5 rounded bg-transparent hover:bg-blackA4">
        <Icon name="lucide:x" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      placeholder="Fruits..."
      class="text-sm focus:outline-none flex-1 rounded text-green9 bg-transparent placeholder:text-mauve9 px-1"
    />
  </TagsInputRoot>
</template>
