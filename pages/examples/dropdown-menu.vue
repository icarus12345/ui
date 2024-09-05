<script setup lang="ts">
const toggleState = ref(false)
const checkboxOne = ref(false)
const checkboxTwo = ref(false)
const person = ref('pedro')

function handleClick() {
  // eslint-disable-next-line no-alert
  alert('hello!')
}
</script>

<template>
  <DropdownMenu v-model:open="toggleState">
    <DropdownMenuTrigger
      aria-label="Customise options"
      as-child
    >
      <IconButton variant="ghost" size="xs">
        <Icon name="ic:round-menu" />
        <!-- <Icon name="radix-icons:hamburger-menu" /> -->
        <span class="sr-only">Toggle navigation menu</span>
      </IconButton>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class=""
        :side-offset="5"
      >
        <DropdownMenuItem
          value="New Tab"
          @click="handleClick"
        >
          New Tab
          <div
          >
            ⌘+T
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more toolsz"
          >
            More Tools
            <Icon class="ms-auto" name="radix-icons:chevron-right" />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
              >
                Save Page As…
                <div
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          value="New Window"
        >
          New Window
          <div
          >
            ⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          value="New Private Window"
          disabled
        >
          New Private Window
          <div
          >
            ⇧+⌘+N
          </div>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            value="more tools"
          >
            More Tools
            <Icon class="ms-auto" name="radix-icons:chevron-right" />
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              :side-offset="2"
              :align-offset="-5"
            >
              <DropdownMenuItem
              >
                Save Page As…
                <div
                >
                  ⌘+S
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
              >
                Create Shortcut…
              </DropdownMenuItem>
              <DropdownMenuItem
              >
                Name Window…
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              >
                Developer Tools
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  value="more toolsz"
                >
                  More Tools
                  <Icon class="ms-auto" name="radix-icons:chevron-right" />
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    :side-offset="2"
                    :align-offset="-5"
                  >
                    <DropdownMenuItem
                    >
                      Save Page As…
                      <div
                      >
                        ⌘+S
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    >
                      Create Shortcut…
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    >
                      Name Window…
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    >
                      Developer Tools
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger
                        value="more toolsz"
                      >
                        More Tools
                        <Icon class="ms-auto" name="radix-icons:chevron-right" />
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent
                          :side-offset="2"
                          :align-offset="-5"
                        >
                          <DropdownMenuItem
                          >
                            Save Page As…
                            <div
                            >
                              ⌘+S
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          >
                            Create Shortcut…
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          >
                            Name Window…
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                          >
                            Developer Tools
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem
              >
                Developer Tools
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxOne"
        >
          <DropdownMenuItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
            <Icon name="radix-icons:check" />
          </DropdownMenuItemIndicator>
          Show Bookmarks
          <div
            class="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
          >
            ⌘+B
          </div>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          v-model:checked="checkboxTwo"
        >
          <DropdownMenuItemIndicator>
            <Icon name="radix-icons:check" />
          </DropdownMenuItemIndicator>
          Show Full URLs
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator/>

        <DropdownMenuLabel>
          People
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup v-model="person">
          <DropdownMenuRadioItem
            value="pedro"
          >
            <DropdownMenuItemIndicator>
              <Icon name="radix-icons:dot-filled" />
            </DropdownMenuItemIndicator>
            Pedro Duarte
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="colm"
          >
            <DropdownMenuItemIndicator>
              <Icon name="radix-icons:dot-filled" />
            </DropdownMenuItemIndicator>
            Colm Tuite
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuArrow/>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenu>
</template>