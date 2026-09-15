import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductsList from '../views/ProductsList.vue'
import ProductForm from '../views/ProductForm.vue'
import CategoriesList from '../views/CategoriesList.vue'

const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/products', name: 'Products', component: ProductsList },
    { path: '/products/create', name: 'ProductCreate', component: ProductForm },
    { path: '/products/edit/:id', name: 'ProductEdit', component: ProductForm },
    { path: '/categories', name: 'Categories', component: CategoriesList },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
