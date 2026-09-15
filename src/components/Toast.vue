<template>
  <div v-if="toast.show" class="fixed top-5 right-5 z-50 transition-all duration-300">
    <div :class="[
      'px-4 py-3 rounded-lg shadow-lg text-white min-w-[300px] flex justify-between items-center',
      toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    ]">
      <span>{{ toast.message }}</span>
      <button @click="toast.show = false" class="ml-4 text-xl font-bold">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()
const { toast } = storeToRefs(notificationStore)
</script>
