<script setup lang="ts">
withDefaults(defineProps<{
  placement?: 'top' | 'bottom'
}>(), {
  placement: 'top',
})
</script>

<template>
  <a-tooltip title="Hello, Ant Design!" :placement="placement">
    <a-button type="primary">
      Button
    </a-button>
  </a-tooltip>
</template>
