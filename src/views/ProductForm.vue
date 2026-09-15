<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Editar' : 'Nuevo' }} Producto</h1>

    <LoadingSpinner v-if="loading && isEdit" />

    <form v-else @submit.prevent="handleSubmit" class="bg-white shadow rounded-lg p-6 max-w-2xl">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input v-model="form.name" type="text" required class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500" :class="{'border-red-500': errors.name}">
        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea v-model="form.description" rows="3" class="w-full border rounded px-3 py-2"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Precio * (Mayor a 0)</label>
          <input v-model="form.price" type="number" step="0.01" min="0.01" required class="w-full border rounded px-3 py-2" :class="{'border-red-500': errors.price}">
          <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price[0] }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
          <input v-model="form.stock" type="number" min="0" required class="w-full border rounded px-3 py-2" :class="{'border-red-500': errors.stock}">
          <p v-if="errors.stock" class="text-red-500 text-xs mt-1">{{ errors.stock[0] }}</p>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
        <select v-model="form.category_id" required class="w-full border rounded px-3 py-2" :class="{'border-red-500': errors.category_id}">
          <option value="">Seleccionar...</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <p v-if="errors.category_id" class="text-red-500 text-xs mt-1">{{ errors.category_id[0] }}</p>
      </div>

      <div class="flex space-x-2">
        <button type="submit" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
        <router-link to="/products" class="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">Cancelar</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCategoryStore } from '../stores/categoryStore'
import { useNotificationStore } from '../stores/notificationStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const notification = useNotificationStore()

const { categories } = storeToRefs(categoryStore)
const { loading } = storeToRefs(productStore)

const isEdit = computed(() => !!route.params.id)
const errors = ref({})

const form = ref({ name: '', description: '', price: 0, stock: 0, category_id: '' })

onMounted(async () => {
  await categoryStore.fetchCategories()
  if (isEdit.value) {
    try {
      const product = await productStore.fetchProduct(route.params.id)
      form.value = { ...product }
    } catch (err) {
      notification.showToast('Producto no encontrado', 'error')
      router.push('/products')
    }
  }
})

const handleSubmit = async () => {
  errors.value = {}
  try {
    if (isEdit.value) {
      await productStore.updateProduct(route.params.id, form.value)
      notification.showToast('Producto actualizado', 'success')
    } else {
      await productStore.createProduct(form.value)
      notification.showToast('Producto creado', 'success')
    }
    router.push('/products')
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors
    } else {
      notification.showToast('Error al guardar', 'error')
    }
  }
}
</script>
