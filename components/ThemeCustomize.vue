<script setup lang="ts">
import { themes } from '@/utils/registry/themes'

const { theme, radius, setTheme, setRadius } = useCustomize()

type Color =
  | 'zinc'
  | 'slate'
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet'

// Create an array of color values
const allColors: Color[] = [
  'zinc',
  'rose',
  'blue',
  'green',
  'orange',
  'red',
  'slate',
  'stone',
  'gray',
  'neutral',
  'yellow',
  'violet',
]

const RADII = [0, 0.4, 0.6, 1.0, 1.6]

// Whenever the theme value changes, update the document class list
watch(theme, () => {
  setClassTheme()
})

// Whenever the radius value changes, update the document style
watch(radius, () => {
  setStyleRadius()
})

function setClassTheme() {
  document.documentElement.classList.remove(
    ...allColors.map(color => `theme-${color}`),
  )
  document.documentElement.classList.add(`theme-${theme.value}`)
}

function setStyleRadius() {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
}

function backgroundColor(color: Color) {
  const bg = themes.find(theme => theme.name === color)
  return `hsl(${bg?.activeColor.light})`
}

const colorMode = useColorMode()
</script>

<template>
  <div class="grid gap-6">
    <div class="grid space-y-1">
      <h1 class="text-md text-foreground font-semibold">
        Customize
      </h1><p class="text-xs text-muted-foreground">
        Pick a style and color for your components.
      </p>
    </div>
    <div class="space-y-1.5">
      <Label>Color</Label>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="color in allColors" :key="color">
          <Button
            class="justify-start gap-2"
            variant="outline"
            size="sm"
            :class="{ 'border-primary border-2': theme === color }"
            @click="setTheme(color)"
          >
            <span class="h-4 w-4 flex items-center justify-center rounded-full" :style="{ backgroundColor: backgroundColor(color) }">
              <Icon v-if="theme === color" name="i-radix-icons-check" size="16" class="text-white" />
            </span>
            <span class="capitalize">{{ color }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>Radius</Label>
      <div class="grid grid-cols-5 gap-2">
        <template v-for="r in RADII" :key="r">
          <Button
            class="justify-center gap-2"
            variant="outline"
            size="sm"
            :class="{ 'border-primary border-2': radius === r }"
            @click="setRadius(r)"
          >
            <span class="capitalize">{{ r }}</span>
          </Button>
        </template>
      </div>
    </div>
    <div class="space-y-1.5">
      <Label>Theme</Label>
      <div class="grid grid-cols-3 gap-2">
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :class="{ 'border-primary border-2': colorMode.preference === 'light' }"
          @click="colorMode.preference = 'light'"
        >
          <Icon name="i-ph-sun-dim-duotone" size="16" />
          <span class="capitalize">Light</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
          @click="colorMode.preference = 'dark'"
        >
          <Icon name="i-ph-moon-stars-duotone" size="16" />
          <span class="capitalize">Dark</span>
        </Button>
        <Button
          class="justify-center gap-2"
          variant="outline"
          size="sm"
          :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
          @click="colorMode.preference = 'system'"
        >
          <Icon name="i-lucide-monitor" size="16" />
          <span class="capitalize">System</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
