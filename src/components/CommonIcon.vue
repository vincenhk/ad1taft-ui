<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: Array,
    required: true
  },
  size: {
    type: String
  }
})
</script>

<template>
    <span class="p-1">
      <font-awesome-icon :icon="icon" :size="size"/>
    </span>
</template>

<style scoped>

</style>