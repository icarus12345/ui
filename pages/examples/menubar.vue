<script setup lang="ts">
const currentMenu = ref('')
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')
function handleClick() {
  // eslint-disable-next-line no-alert
  alert('hello!')
}
</script>

<template>
  <Menubar
    v-model="currentMenu"
  >
    <MenubarMenu value="file">
      <MenubarTrigger
      >
        File
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          align="start"
          :side-offset="5"
          :align-offset="-3"
        >
          <MenubarItem
          >
            New Tab
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ T
            </div>
          </MenubarItem>
          <MenubarItem
          >
            New Window
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ N
            </div>
          </MenubarItem>
          <MenubarItem
            disabled
          >
            New Incognito Window
          </MenubarItem>
          <LazyMenubarSeparator/>
          <MenubarSub>
            <MenubarSubTrigger
            >
              Share
              <div
              >
                <Icon name="radix-icons:chevron-right" />
              </div>
            </MenubarSubTrigger>
            <MenubarPortal>
              <MenubarSubContent
                :align-offset="-5"
              >
                <MenubarItem
                >
                  Email Link
                </MenubarItem>
                <MenubarItem
                >
                  Messages
                </MenubarItem>
                <MenubarItem
                >
                  Notes
                </MenubarItem>
              </MenubarSubContent>
            </MenubarPortal>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem
          >
            Print…
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ P
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>

    <MenubarMenu value="Edit">
      <MenubarTrigger
      >
        Edit
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          align="start"
          :side-offset="5"
          :align-offset="-3"
        >
          <MenubarItem
          >
            Undo
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ Z
            </div>
          </MenubarItem>
          <MenubarItem
          >
            Redo
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⇧ ⌘ Z
            </div>
          </MenubarItem>
          <MenubarSeparator/>
          <MenubarSub>
            <MenubarSubTrigger
            >
              Find
              <div
                class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
              >
                <Icon name="radix-icons:chevron-right" />
              </div>
            </MenubarSubTrigger>

            <MenubarPortal>
              <MenubarSubContent
                :align-offset="-5"
              >
                <MenubarItem
                >
                  Search the web…
                </MenubarItem>
                <MenubarSeparator/>
                <MenubarItem
                >
                  Find…
                </MenubarItem>
                <MenubarItem
                >
                  Find Next
                </MenubarItem>
                <MenubarItem
                >
                  Find Previous
                </MenubarItem>
              </MenubarSubContent>
            </MenubarPortal>
          </MenubarSub>
          <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" />
          <MenubarItem
          >
            Cut
          </MenubarItem>
          <MenubarItem
          >
            Copy
          </MenubarItem>
          <MenubarItem
          >
            Paste
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>

    <MenubarMenu value="View">
      <MenubarTrigger
      >
        View
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          align="start"
          :side-offset="5"
          :align-offset="-14"
        >
          <MenubarCheckboxItem
            v-model="checkboxOne"
          >
            <MenubarItemIndicator>
              <Icon name="radix-icons:check" />
            </MenubarItemIndicator>
            Show Bookmarks
            <div
            >
              ⌘+B
            </div>
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            v-model="checkboxTwo"
          >
            <MenubarItemIndicator>
              <Icon name="radix-icons:check" />
            </MenubarItemIndicator>
            Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator class="h-[1px] bg-green6 m-[5px]" />
          <MenubarItem
          >
            Reload
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⌘ R
            </div>
          </MenubarItem>
          <MenubarItem
            disabled
          >
            Force Reload
            <div class="ml-auto pl-5 text-mauve9 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              ⇧ ⌘ R
            </div>
          </MenubarItem>
          <MenubarSeparator/>
          <MenubarItem
          >
            Toggle Fullscreen
          </MenubarItem>
          <MenubarSeparator/>
          <MenubarItem
          >
            Hide Sidebar
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>

    <MenubarMenu value="Profiles">
      <MenubarTrigger
      >
        Profiles
      </MenubarTrigger>
      <MenubarPortal>
        <MenubarContent
          align="start"
          :side-offset="5"
          :align-offset="-14"
        >
          <MenubarRadioGroup v-model="person">
            <MenubarRadioItem
              value="pedro"
            >
              <MenubarItemIndicator>
                <Icon name="radix-icons:dot-filled" />
              </MenubarItemIndicator>
              Pedro Duarte
            </MenubarRadioItem>
            <MenubarRadioItem
              value="colm"
            >
              <MenubarItemIndicator>
                <Icon name="radix-icons:dot-filled" />
              </MenubarItemIndicator>
              Colm Tuite
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator/>
          <MenubarItem
            @click="handleClick"
          >
            Edit…
          </MenubarItem>
          <MenubarSeparator/>
          <MenubarItem
          >
            Add Profile…
          </MenubarItem>
        </MenubarContent>
      </MenubarPortal>
    </MenubarMenu>
  </Menubar>
</template>