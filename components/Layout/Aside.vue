<script setup lang="ts">
import { navMenu as items } from '@/constant/menus'
// const items = [
//   {
//     title: 'composables',
//     icon: 'lucide:folder',
//     children: [
//       { title: 'useAuth.ts', icon: 'vscode-icons:file-type-typescript' },
//       { title: 'useUser.ts', icon: 'vscode-icons:file-type-typescript' },
//     ],
//   },
//   {
//     title: 'components',
//     icon: 'lucide:folder',
//     children: [
//       {
//         title: 'Home',
//         icon: 'lucide:folder',
//         children: [
//           { title: 'Card.vue', icon: 'vscode-icons:file-type-vue' },
//           { title: 'Button.vue', icon: 'vscode-icons:file-type-vue' },
//         ],
//       },
//     ],
//   },
//   { title: 'app.vue', icon: 'vscode-icons:file-type-vue' },
//   { title: 'nuxt.config.ts', icon: 'vscode-icons:file-type-nuxt' },
// ]
</script>

<template>
  <TreeRoot
    v-slot="{ flattenItems }"
    class="list-none select-none w-56 bg-white text-blackA11 rounded-lg p-2 text-sm font-medium"
    :items="items"
    :get-key="(item) => item.title"
    :default-expanded="['components']"
  >
    <h2 class="font-semibold !text-base text-blackA11 px-2 pt-1">
      Directory Structure
    </h2>
    <TreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="flex items-center py-1 px-2 my-0.5 rounded outline-none focus:ring-grass8 focus:ring-2 data-[selected]:bg-grass4"
      :asChild="!item.hasChildren"
    >
      <template v-if="item.hasChildren">
        <Icon
          v-if="!isExpanded"
          name="lucide:folder"
          class="h-4 w-4"
        />
        <Icon
          v-else
          name="lucide:folder-open"
          class="h-4 w-4"
        />
        <div class="pl-2">
          {{ item.value.title }}
        </div>
      </template>
      <RouterLink :to="item.value.link" v-else>
        <Icon
          :name="item.value.icon || 'lucide:file'"
          class="h-4 w-4"
        />
        <div class="pl-2">
          {{ item.value.title }}
        </div>
      </RouterLink>
    </TreeItem>
  </TreeRoot>
</template>