<script setup lang="ts">
</script>

<template>
  <div class="w-full h-64 px-8 text-green9 font-medium text-sm">
    <SplitterGroup
      id="splitter-group-1"
      direction="horizontal"
    >
      <SplitterPanel
        id="splitter-group-1-panel-1"
        :min-size="20"
        class="bg-white rounded-xl flex items-center justify-center"
      >
        Panel A
      </SplitterPanel>
      <SplitterResizeHandle
        id="splitter-group-1-resize-handle-1"
        class="w-2"
      />
      <SplitterPanel
        id="splitter-group-1-panel-2"
        :min-size="20"
      >
        <SplitterGroup
          id="splitter-group-2"
          direction="vertical"
        >
          <SplitterPanel
            id="splitter-group-2-panel-1"
            :min-size="20"
            class="bg-white rounded-xl flex items-center justify-center"
          >
            Panel B
          </SplitterPanel>
          <SplitterResizeHandle
            id="splitter-group-2-resize-handle-1"
            class="h-2"
          />
          <SplitterPanel
            id="splitter-group-2-panel-2"
            :min-size="20"
            class="bg-white rounded-xl flex items-center justify-center"
          >
            Panel C
          </SplitterPanel>
        </SplitterGroup>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>