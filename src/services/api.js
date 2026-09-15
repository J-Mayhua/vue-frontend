import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

// Interceptor de respuesta para manejar errores globalmente
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const message = error.response?.data?.message || 'Error de conexión con el servidor'
        console.error('API Error:', message)

        // Aquí podrías disparar una notificación global si lo deseas
        return Promise.reject(error)
    }
)

export default api
