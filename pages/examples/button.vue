<script setup lang="ts">

const breadcrumbLinks = ref([
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Components',
    href: '#',
  },
  {
    title: 'Button',
    href: '/components/button',
  },
])
</script>

<template>
  <div class="flex flex-col gap-4">
    <LayoutBreadcrumb :links="breadcrumbLinks" />
    <div class="grid gap-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Button
      </h2>
      <p class="text-muted-foreground">
        Displays a button or a component that looks like a button.
      </p>
      <div class="flex gap-2">
        <Button size="xs" variant="outline" class="text-xs" as-child>
          <NuxtLink
            to="https://www.shadcn-vue.com/docs/components/button"
            external
            target="_blank"
          >
            <span class="i-radix-icons-code mr-2" />
            Component Source1
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Default</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button class="rounded-full" :ui="{ base: 'ui-button--custom' }">Default</Button>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button variant="secondary">
              Secondary
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline">
              Outline
            </Button>
            <Button variant="gradient">
              Gradient
            </Button>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Destructive</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button variant="destructive" :loading="true">
              Destructive
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Ghost</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button variant="ghost">
              Ghost
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Button variant="link">
              Link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full md:col-span-3">
        <CardHeader>
          <CardTitle>Size</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              v-for="size in ['xs', 'md']"
              :key="size"
              :size="size"
              :loading="true"
              >
              <Icon name="lucide:chevron-right" />
              Button {{ size }}
            </Button>
            <IconButton
              variant="outline"
              v-for="size in ['xs', 'md']"
              :key="size"
              :size="size"
              :loading="false"
              shape="square"
              >
              <Icon name="lucide:chevron-right" />
            </IconButton>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
