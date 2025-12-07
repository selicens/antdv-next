<script setup lang="ts">
import { ref } from 'vue'

const options = Array.from({ length: 26 }, (_, i) => {
  const value = (i + 10).toString(36) + (i + 10)
  return { value, label: value }
})

function handleChange(value: string[]) {
  console.log(`selected ${value}`)
}
const value = ref()
</script>

<template>
  <a-select
    v-model:value="value"
    mode="tags"
    style="width: 100%"
    :token-separators="[',']"
    :options="options"
    @change="handleChange"
  />
</template>
