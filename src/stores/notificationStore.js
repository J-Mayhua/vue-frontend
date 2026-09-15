import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
    const toast = ref({ show: false, message: '', type: 'success' })

    const showToast = (message, type = 'success') => {
        toast.value = { show: true, message, type }
        setTimeout(() => {
            toast.value.show = false
        }, 3000)
    }

    return { toast, showToast }
})
