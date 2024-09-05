<script setup lang="ts">
const useIdFunction = () => useId()
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout vaul-drawer-wrapper>
      <NuxtPage />
    </NuxtLayout>
    <DialogProvider />
  </ConfigProvider>
</template>
