import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/categories')
      categories.value = response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al cargar categorías'
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (categoryData) => {
    loading.value = true
    try {
      await api.post('/categories', categoryData)
      await fetchCategories()
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id) => {
    loading.value = true
    try {
      await api.delete(`/categories/${id}`)
      await fetchCategories()
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  return { categories, loading, error, fetchCategories, createCategory, deleteCategory }
})
