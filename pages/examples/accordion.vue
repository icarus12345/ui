<script setup lang="ts">

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it unstyled?',
    content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.',
  },
  {
    value: 'item-3',
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
  },
]
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <Card
      v-for="size in ['xs', 'md']"
      :key="size"
      :size="size"
      >
      <CardHeader>
        <CardTitle>
          <Icon name="ic:home"/>
          Size: {{ size }}
        </CardTitle>
        <div class="flex items-center gap-2">
          <IconButton
            variant="ghost"
            :key="size"
            shape="square"
            :size="size"
            >
            <Icon name="material-symbols:more-vert" />
          </IconButton>
        </div>
      </CardHeader>
      <CardContent>
        <AccordionRoot
          default-value="item-1"
          :collapsible="true"
          :size="size"
        >
          <AccordionItem
            v-for="item in accordionItems"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger>
              <span>{{ item.title }}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {{ item.content }}
              </div>
              <Button type="submit">OKText</Button>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </CardContent>
      <CardFooter>
        <Button type="submit">OKText</Button>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>