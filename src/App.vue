<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 py-3 flex space-x-4">
        <router-link to="/" class="text-gray-700 hover:text-blue-600 font-medium">Dashboard</router-link>
        <router-link to="/products" class="text-gray-700 hover:text-blue-600 font-medium">Productos</router-link>
        <router-link to="/categories" class="text-gray-700 hover:text-blue-600 font-medium">Categorías</router-link>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto py-6 px-4">
      <router-view />
    </main>
    <Toast />
  </div>
</template>

<script setup>
import Toast from './components/Toast.vue'
</script>
