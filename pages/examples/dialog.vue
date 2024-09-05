<script setup lang="ts">
// import { Button } from '@ui/components/button'
// import { Label } from '@ui/components/label'
// import { Input } from '@ui/components/input'
// import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@ui/components/card'
// import { Dialog, DialogHeader, DialogContent, DialogTrigger, DialogTitle, DialogFooter, DialogScrollContent, DialogDescription } from '@ui/components/dialog'
// import { useToast } from '@ui/components/toast'
// import Demo from '@ui/components/dialog/Demo.vue'


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
    title: 'Dialog',
    href: '/components/dialog',
  },
])

// const { toast } = useToast()

const link = ref('https://shadcn-vue.com/docs/installation')
// const { text, copy, copied, isSupported } = useClipboard({ source: link })

async function handleCopyLink() {
  await copy(link.value)
  // if (isSupported.value && copied.value) {
  //   toast({
  //     title: 'Text Copied',
  //     description: text.value,
  //   })
  // }
  // else {
  //   toast({
  //     title: 'Copy failed',
  //     description: 'Your browser does not support Clipboard API',
  //   })
  // }
}

const isOpen = ref(false)
const { dialog } = useDialog()
const showDialog = () => {
  // dialog({
  //   // title: 'My Title',
  //   // description: 'My description',
  //   // content: 'My content',
  //   component: markRaw(Demo),
  // })
}
const showDialog2 = (size = 'md') => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(() => {
      resolve(true)
    }, ms));
  }
  dialog({
    title: 'My Title',
    description: 'My description',
    content: 'My content',
    icon: 'lucide:info',
    size,
    OKText: 'Delete',
    cancelText: 'Cancel',
    async callback() {
      await timeout(3000);
      return true
    },
    OKProps: {
      variant: 'destructive'
    },
    cancelProps: {
      variant: 'outline',
    }
  })
  // .then(() => {
  //   alert(0)
  // })
}

onMounted(() => {
  // alert(useId())
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseBreadcrumbCustom :links="breadcrumbLinks" />
    <div class="grid gap-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Dialog
      </h2>
      <h3 class="text-md font-bold tracking-tight">
        Dialog
      </h3>
      <p class="text-muted-foreground">
        A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
      </p>
      <div class="flex gap-2">
        <Button size="xs" variant="outline" class="text-xs" as-child>
          <NuxtLink
            to="https://www.shadcn-vue.com/docs/components/dialog"
            external
            target="_blank"
          >
            <span class="i-radix-icons-code mr-2" />
            Component Source
          </NuxtLink>
        </Button>
        <Button size="xs" variant="outline" class="text-xs" as-child>
          <NuxtLink
            to="https://www.radix-vue.com/components/dialog"
            external
            target="_blank"
          >
            Primitive API Reference
          </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px">
            <DialogRoot size="xl">
              <DialogTrigger as-child>
                <Button variant="outline">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                      Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" class="col-span-3" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                      Username
                    </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button type="button" @click="isOpen = true">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Custom close button</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px">
            <DialogRoot>
              <DialogTrigger as-child>
                <Button variant="outline">
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody class="flex items-center space-x-2">
                  <div class="grid flex-1 gap-2">
                    <Label for="link" class="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      :default-value="link"
                      read-only
                    />
                  </div>
                  <Button type="submit" size="sm" class="px-3" @click="handleCopyLink">
                    <span class="sr-only">Copy</span>
                    <Icon name="radix-icons:copy" class="h-4 w-4" />
                  </Button>
                </DialogBody>
                <DialogFooter class="sm:justify-start">
                  <DialogClose as-child>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Scroll body</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px">
            <DialogRoot>
              <DialogTrigger as-child>
                <Button variant="outline">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent class="grid-rows-[auto_minmax(0,1fr)_auto] max-h-[calc(100dvh_-_3.2rem)] p-0 sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody class="grid gap-4 overflow-y-auto">
                  <div class="h-[300dvh] flex flex-col justify-between">
                    <p>
                      This is some placeholder content to show the scrolling behavior for modals. We use repeated line breaks to demonstrate how content can exceed minimum inner height, thereby showing inner scrolling. When content becomes longer than the predefined max-height of modal, content will be cropped and scrollable within the modal.
                    </p>

                    <p>This content should appear at the bottom after you scroll.</p>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>
          </div>
        </CardContent>
      </Card>
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Scroll overlay</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px">
            <DialogRoot>
              <DialogTrigger as-child>
                <Button variant="outline">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogScrollContent class="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Modal title</DialogTitle>
                  <DialogDescription>
                    Here is modal with overlay scroll
                  </DialogDescription>
                </DialogHeader>
                <DialogBody class="grid h-[300dvh] gap-4 py-4">
                  <p>
                    This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <Button type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogScrollContent>
            </DialogRoot>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Custom close button</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full grid grid-cols-[repeat(auto-fit,_minmax(8rem,_16rem))] items-center justify-center gap-4 md:min-h-200px">
            <Button variant="outline" @click="showDialog">
              Alert
            </Button>
            <Button variant="outline" @click="showDialog2('xs')">
              Warning xs
            </Button>
            <Button variant="outline" @click="showDialog2('sm')">
              Warning sm
            </Button>
            <Button variant="outline" @click="showDialog2('md')">
              Warning md
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
