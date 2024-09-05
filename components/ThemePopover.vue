<script setup lang="ts">
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <IconButton variant="ghost" size="xs">
        <Icon name="i-lucide-paintbrush" />
      </IconButton>
    </PopoverTrigger>
    <PopoverContent class="w-92" align="end">
      <ThemeCustomize />
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>
