import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchProducts = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await api.get('/products')
            products.value = response.data.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al cargar productos'
            console.error('Error fetching products:', error.value)
        } finally {
            loading.value = false
        }
    }

    const createProduct = async (productData) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.post('/products', productData)
            await fetchProducts()
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al crear producto'
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateProduct = async (id, productData) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.put(`/products/${id}`, productData)
            await fetchProducts()
            return response.data
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al actualizar producto'
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteProduct = async (id) => {
        loading.value = true
        error.value = null
        try {
            await api.delete(`/products/${id}`)
            await fetchProducts()
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al eliminar producto'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
})
