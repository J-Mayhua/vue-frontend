<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Categorías</h1>
      <button @click="showForm = !showForm" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ showForm ? 'Cancelar' : 'Nueva Categoría' }}
      </button>
    </div>

    <div v-if="showForm" class="bg-white shadow rounded-lg p-6 mb-4 max-w-md">
      <form @submit.prevent="handleCreate">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input v-model="newCategory.name" type="text" required class="w-full border rounded px-3 py-2 mb-3">
        <button type="submit" :disabled="loading" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400">
          {{ loading ? 'Creando...' : 'Crear' }}
        </button>
      </form>
    </div>

    <LoadingSpinner v-if="loading && !showForm" />

    <div v-else class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="category in categories" :key="category.id">
            <td class="px-6 py-4">{{ category.name }}</td>
            <td class="px-6 py-4">
              <button @click="handleDelete(category.id)" class="text-red-600 hover:underline">Eliminar</button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="2" class="px-6 py-4 text-center text-gray-500">No hay categorías</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../stores/categoryStore'
import { useNotificationStore } from '../stores/notificationStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = useCategoryStore()
const notification = useNotificationStore()
const { categories, loading } = storeToRefs(store)

const showForm = ref(false)
const newCategory = ref({ name: '' })

onMounted(() => { store.fetchCategories() })

const handleCreate = async () => {
  try {
    await store.createCategory(newCategory.value)
    notification.showToast('Categoría creada', 'success')
    newCategory.value = { name: '' }
    showForm.value = false
  } catch (err) {
    notification.showToast('Error al crear', 'error')
  }
}

const handleDelete = async (id) => {
  if (confirm('¿Eliminar categoría?')) {
    try {
      await store.deleteCategory(id)
      notification.showToast('Categoría eliminada', 'success')
    } catch (err) {
      notification.showToast('Error al eliminar', 'error')
    }
  }
}
</script>
