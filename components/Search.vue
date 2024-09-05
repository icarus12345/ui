<script setup lang="ts">
// import { Button } from '@ui/components/button'
// import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@ui/components/Command'
import { navMenu } from '@/constants/menus'
import type { NavGroup } from '~/types/nav'
// import { default as BaseKbd } from '@/components/base/Kbd.vue'
const { metaSymbol } = useShortcuts()

const openCommand = ref(false)
const router = useRouter()

defineShortcuts({
  Meta_K: () => openCommand.value = true,
})

const componentsNav = computed<NavGroup>(() => {
  return navMenu.find((nav: any) => nav.title === 'Components') as NavGroup
})

function handleSelectLink(link: string) {
  router.push(link)
  openCommand.value = false
}
</script>

<template>
  <Button variant="outline" @click="openCommand = !openCommand">
    <span class="hidden sm:inline-flex">Search documentation</span>
    <span class="sm:hidden">Search...</span>
    <BaseKbd>
      <span class="text-xs">{{ metaSymbol }}</span>K
    </BaseKbd>
  </Button>

  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="Home" @select="handleSelectLink('/')">
          Home
          <Shortcut>
            <BaseKbd>G</BaseKbd>
            <BaseKbd>H</BaseKbd>
          </Shortcut>
        </CommandItem>
        <CommandItem value="email" @select="handleSelectLink('/email')">
          Email
          <Shortcut>
            <BaseKbd>G</BaseKbd>
            <BaseKbd>E</BaseKbd>
          </Shortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Components">
        <CommandItem
          v-for="nav in componentsNav?.children"
          :key="nav.title"
          :value="nav.title"
          @select="handleSelectLink(nav.link)"
          class="flex items-center"
        >
          <Icon name="i-radix-icons-circle" class="w-4 h-4 mr-2" />
          {{ nav.title }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<style scoped>

</style>
