<script setup lang="ts">
// import { Button } from '@ui/components/button'
const route = useRoute()
const navbar = useNavbar()
const { hoveredNavItem } = navbar
const props = defineProps<{
  item: any
}>()

const { activeNavMenu } = useNavbar()

const onClick = (e) => {
  hoveredNavItem.value = props.item
  if (props.item.children?.length) {
    e.stopPropagation()
    e.preventDefault()
    return false
  }
}
</script>

<template>
  <ListboxItem
    v-if="item"
    asChild
    :value="item.link"
    :class="
      [
        'group w-full gap-1 rounded-lg px-0 md:flex-col group max-md:justify-start md:py-1',
        'text-foreground',
        'select-none',
        'data-[highlighted]:ring-green9- data-[highlighted]:ring-1-',
        'data-[state=checked]:bg-green9- data-[state=checked]:text-primary-',
        'data-[disabled]:opacity-50',
        activeNavMenu === item ? 'bg-foreground/[0.05] hover:bg-foreground/[0.05]' : 'bg-transparent hover:bg-transparent',
      ]
    "
  >
    <Button asChild @mouseover="hoveredNavItem = item">
      <RouterLink :to="item.link">
        <!-- <ListboxItemIndicator
          class="absolute left-0 w-[25px] inline-flex items-center justify-center"
        >
          <Icon name="radix-icons:check" />
        </ListboxItemIndicator> -->
        <span class="group-hover:bg-foreground/[0.05] rounded-full px-3 md:py-0.5 transition-all inline-flex">
          <Icon v-if="item.icon" :name="item.icon" class="!w-4 !h-4 md:!w-5 md:!h-5" />
        </span>
        <span class="md:text-xxs">{{ item.title }}</span>
        <span class="absolute inset-0 md:hidden" @click="onClick"></span>
      </RouterLink>
    </Button>
  </ListboxItem>
</template>
