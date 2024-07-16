<script setup lang="ts">
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="i-lucide-paintbrush" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-92" align="end">
      <ThemeCustomize />
    </PopoverContent>
  </Popover>
</template>

<style scoped>

</style>
