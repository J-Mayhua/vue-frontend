<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Productos</h1>
      <router-link to="/products/create" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Nuevo Producto
      </router-link>
    </div>

    <LoadingSpinner v-if="loading" />
    <Alert v-else-if="error" type="error" :message="error" />

    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in products" :key="product.id">
            <td class="px-6 py-4">{{ product.name }}</td>
            <td class="px-6 py-4">S/ {{ product.price }}</td>
            <td class="px-6 py-4">{{ product.stock }}</td>
            <td class="px-6 py-4">{{ product.category?.name || 'Sin categoría' }}</td>
            <td class="px-6 py-4 space-x-2">
              <router-link :to="`/products/edit/${product.id}`" class="text-blue-600 hover:underline">Editar</router-link>
              <button @click="handleDelete(product.id)" class="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="products.length === 0" class="text-center py-8 text-gray-500">
        No hay productos registrados
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore.js'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import Alert from '../components/Alert.vue'

const store = useProductStore()
const { products, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchProducts()
})

const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await store.deleteProduct(id)
  }
}
</script>
