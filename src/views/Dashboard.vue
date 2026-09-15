<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold text-blue-600 mb-4">¡HOLA! El frontend está funcionando</h1>
    <p class="text-gray-700 mb-4">Si ves este texto, Vue, Router y Tailwind están cargando correctamente.</p>

    <div class="flex space-x-4">
      <router-link to="/products" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Ir a Productos
      </router-link>
      <router-link to="/categories" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Ir a Categorías
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No usamos stores aquí por ahora para evitar errores de importación
</script>
