<script setup lang="ts">
// import { AccordionRoot, AccordionTrigger, AccordionItem, AccordionContent, AccordionHeader } from '@ui/components/Accordion'
// import { AvatarFallback, AvatarImage, AvatarRoot } from '@ui/components/Avatar'
// import { ConfigProvider } from '@ui/components/ConfigProvider'
// import { DialogRoot,DialogTrigger,DialogPortal,DialogContent,DialogOverlay,DialogTitle,DialogDescription,DialogClose } from '@ui/components/Dialog'
// import { AspectRatio } from '@ui/components/AspectRatio'
// import { CheckboxIndicator, CheckboxRoot } from '@ui/components/Checkbox'

// import { Icon } from '@iconify/vue'

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
const useIdFunction = () => useId()
const v = ref('')
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
const checkboxOne = ref(true)
const toggleState = ref(false)
const toggleStateSingle = ref('left')
const toggleStateMultiple = ref(['italic'])

const toggleGroupItemClasses
  = 'hover:bg-green3 text-mauve11 data-[state=on]:bg-green6 data-[state=on]:text-violet12 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none'
const switchState = ref(false)
const radioStateSingle = ref('default')
const progressValue = ref(10)

onMounted(() => {
  const timer = setTimeout(() => (progressValue.value = 66), 500)
  return () => clearTimeout(timer)
})
const items = [
  {
    title: 'composables',
    icon: 'lucide:folder',
    children: [
      { title: 'useAuth.ts', icon: 'vscode-icons:file-type-typescript' },
      { title: 'useUser.ts', icon: 'vscode-icons:file-type-typescript' },
    ],
  },
  {
    title: 'components',
    icon: 'lucide:folder',
    children: [
      {
        title: 'Home',
        icon: 'lucide:folder',
        children: [
          { title: 'Card.vue', icon: 'vscode-icons:file-type-vue' },
          { title: 'Button.vue', icon: 'vscode-icons:file-type-vue' },
        ],
      },
    ],
  },
  { title: 'app.vue', icon: 'vscode-icons:file-type-vue' },
  { title: 'nuxt.config.ts', icon: 'vscode-icons:file-type-nuxt' },
]
// const toggleStateSingle = ref('center')
// const toggleStateMultiple = ref([])
const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)

function oneWeekAway() {
  const now = new Date()
  const inOneWeek = now.setDate(now.getDate() + 7)
  return new Date(inOneWeek)
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

function handleClick() {
  open.value = false
  window.clearTimeout(timerRef.value)
  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true
  }, 100)
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <LazyDialogRoot>
      <LazyDialogTrigger
        class="text-grass11 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
      >
        Edit profile
      </LazyDialogTrigger>
      <LazyDialogPortal>
        <LazyDialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
        <LazyDialogContent
          class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
        >
          <LazyDialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
            Edit profile
          </LazyDialogTitle>
          <LazyDialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Make changes to your profile here. Click save when you're done.
          </LazyDialogDescription>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-grass11 w-[90px] text-right text-[15px]"
              for="name"
            > Name </label>
            <input
              id="name"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="Pedro Duarte"
            >
          </fieldset>
          <fieldset class="mb-[15px] flex items-center gap-5">
            <label
              class="text-grass11 w-[90px] text-right text-[15px]"
              for="username"
            > Username </label>
            <input
              id="username"
              class="text-grass11 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              defaultValue="@peduarte"
            >
          </fieldset>
          <div class="mt-[25px] flex justify-end">
            <LazyDialogClose as-child>
              <button
                class="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </LazyDialogClose>
          </div>
          <LazyDialogClose
            class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Icon name="lucide:x" />
          </LazyDialogClose>
        </LazyDialogContent>
      </LazyDialogPortal>
    </LazyDialogRoot>
    <div class="h-[50dvh]"></div>
    <LazyAccordionRoot
      class="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
      default-value="item-1"
      type="single"
      :collapsible="true"
    >
      <LazyAccordionItem
        v-for="item in accordionItems"
        :key="item.value"
        class="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]"
        :value="item.value"
      >
        <LazyAccordionHeader class="flex">
          <AccordionTrigger class="text-grass11 shadow-mauve6 hover:bg-mauve2 flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none group">
            <span>{{ item.title }}</span>
            <Icon
              name="material-symbols:keyboard-arrow-down-rounded"
              class="text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
          </AccordionTrigger>
        </LazyAccordionHeader>
        <LazyAccordionContent class="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">
          <div class="px-5 py-4">
            {{ item.content }}
          </div>
        </LazyAccordionContent>
      </LazyAccordionItem>
    </LazyAccordionRoot>
  </ConfigProvider>
  <div class="flex gap-5">
    <LazyAvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <LazyAvatarImage
        class="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <LazyAvatarFallback
        class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        :delay-ms="600"
      >
        CT
      </LazyAvatarFallback>
    </LazyAvatarRoot>
    <LazyAvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <LazyAvatarImage
        class="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <LazyAvatarFallback
        class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        :delay-ms="600"
      >
        JD
      </LazyAvatarFallback>
    </LazyAvatarRoot>
    <LazyAvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <LazyAvatarFallback class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
        PD
      </LazyAvatarFallback>
    </LazyAvatarRoot>
    <div class="shadow-blackA7 w-full sm:w-[300px] overflow-hidden rounded-md shadow-[0_2px_10px]">
      <LazyAspectRatio :ratio="16 / 9">
        <img
          class="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          alt="Landscape photograph by Tobias Tullius"
        >
      </LazyAspectRatio>
    </div>
  </div>
  <div class="flex flex-col gap-2.5 bg-blue-400">
    <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
      <LazyCheckboxRoot
        v-model:checked="checkboxOne"
        class="shadow-blackA7 hover:bg-green3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus-within:shadow-[0_0_0_2px_black]"
      >
        <LazyCheckboxIndicator class="bg-white h-full w-full rounded flex items-center justify-center">
          <Icon
            name="radix-icons:check"
            class="h-3.5 w-3.5 text-grass11"
          />
        </LazyCheckboxIndicator>
      </LazyCheckboxRoot>
      <span class="select-none text-white">Accept terms and conditions.</span>
    </label>
  </div>
  <LazyComboboxRoot
    v-model="v"
    class="relative"
  >
    <LazyComboboxAnchor class="min-w-[160px] inline-flex items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white text-grass11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-grass9 outline-none">
      <LazyComboboxInput
        class="!bg-transparent outline-none text-grass11 h-full selection:bg-grass5 placeholder-mauve8"
        placeholder="Placeholder..."
      />
      <LazyComboboxTrigger>
        <Icon
          name="radix-icons:chevron-down"
          class="h-4 w-4 text-grass11"
        />
      </LazyComboboxTrigger>
    </LazyComboboxAnchor>

    <LazyComboboxContent class="absolute z-10 w-full mt-2 min-w-[160px] bg-white overflow-hidden rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
      <LazyComboboxViewport class="p-[5px]">
        <LazyComboboxEmpty class="text-mauve8 text-xs font-medium text-center py-2" />

        <LazyComboboxGroup>
          <LazyComboboxLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
            Fruits
          </LazyComboboxLabel>

          <LazyComboboxItem
            v-for="(option, index) in options"
            :key="index"
            class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-grass9 data-[highlighted]:text-grass1"
            :value="option"
          >
            <LazyComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon name="radix-icons:check" />
            </LazyComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </LazyComboboxItem>
          <LazyComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
        </LazyComboboxGroup>

        <LazyComboboxGroup>
          <LazyComboboxLabel
            class="px-[25px] text-xs leading-[25px] text-mauve11"
          >
            Vegetables
          </LazyComboboxLabel>
          <LazyComboboxItem
            v-for="(option, index) in vegetables"
            :key="index"
            
            :value="option"
          >
            <LazyComboboxItemIndicator
              class="absolute left-0 w-[25px] inline-flex items-center justify-center"
            >
              <Icon name="radix-icons:check" />
            </LazyComboboxItemIndicator>
            <span>
              {{ option }}
            </span>
          </LazyComboboxItem>
        </LazyComboboxGroup>
      </LazyComboboxViewport>
    </LazyComboboxContent>
  </LazyComboboxRoot>
  <LazyToggle
    v-model:pressed="toggleState"
    aria-label="Toggle italic"
    class="hover:bg-green3 text-mauve11 data-[state=on]:bg-green6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
  >
    <Icon
      name="radix-icons:font-italic"
      class="w-[15px] h-[15px]"
    />
  </LazyToggle>
  <LazyToggleGroupRoot
      v-model="toggleStateSingle"
      type="single"
      class="flex"
    >
      <LazyToggleGroupItem
        value="left"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:text-align-left"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
      <LazyToggleGroupItem
        value="center"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:text-align-center"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
      <LazyToggleGroupItem
        value="right"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:text-align-right"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
    </LazyToggleGroupRoot>
    <br>
    <LazyToggleGroupRoot
      v-model="toggleStateMultiple"
      type="multiple"
      class="flex"
    >
      <LazyToggleGroupItem
        value="bold"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:font-bold"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
      <LazyToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:font-italic"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
      <LazyToggleGroupItem
        value="strikethrough"
        aria-label="Toggle italic"
        :class="toggleGroupItemClasses"
      >
        <Icon
          name="radix-icons:strikethrough"
          class="w-[15px] h-[15px]"
        />
      </LazyToggleGroupItem>
    </LazyToggleGroupRoot>
    <div class="flex gap-2 items-center">
    <label
      class="text-white text-[15px] leading-none pr-[15px] select-none"
      for="airplane-mode"
    >
      Airplane mode
    </label>
    <Switch
      id="airplane-mode"
      v-model:checked="switchState" />
    <LazyRadioGroupRoot
    v-model="radioStateSingle"
    class="flex flex-col gap-2.5"
    default-value="default"
    aria-label="View density"
  >
    <div class="flex items-center">
      <LazyRadioGroupItem
        id="r1"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        value="default"
      >
        <LazyRadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </LazyRadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r1"
      >
        Default
      </label>
    </div>
    <div class="flex items-center">
      <LazyRadioGroupItem
        id="r2"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        value="comfortable"
      >
        <LazyRadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </LazyRadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r2"
      >
        Comfortable
      </label>
    </div>
    <div class="flex items-center">
      <LazyRadioGroupItem
        id="r3"
        class="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
        value="compact"
      >
        <LazyRadioGroupIndicator
          class="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-grass11"
        />
      </LazyRadioGroupItem>
      <label
        class="text-white text-[15px] leading-none pl-[15px]"
        for="r3"
      >
        Compact
      </label>
    </div>
  </LazyRadioGroupRoot>
  </div>
  <ProgressRoot
    v-model="progressValue"
    class="relative overflow-hidden bg-blackA9 rounded-full w-full sm:w-[300px] h-4 sm:h-5"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      class="bg-white rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
  
</template>
