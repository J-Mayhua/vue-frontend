<template>
  <div v-if="show" :class="['p-4 rounded-lg mb-4', typeClasses]">
    <div class="flex items-center">
      <span class="mr-2">{{ icon }}</span>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'info' },
  message: { type: String, required: true },
  show: { type: Boolean, default: true }
})

const typeClasses = computed(() => {
  const classes = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  }
  return classes[props.type] || classes.info
})

const icon = computed(() => {
  const icons = { success: '✓', error: '✗', warning: '⚠', info: 'ℹ' }
  return icons[props.type] || icons.info
})
</script>
