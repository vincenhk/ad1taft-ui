<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: Array,
    required: true
  },
  title: {
    type: String
  }
})
</script>

<template>
  <div class="inline-flex items-center space-x-2">
    <span class="p-3 bg-yellow-300 rounded-xl shadow">
      <font-awesome-icon :icon="icon" size="xl"/>
    </span>
    <p class="text-lg font-medium" >{{ title }}</p>
  </div>
</template>

<style scoped></style>
