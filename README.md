# Frontend - Gestión de Productos y Categorías

## Descripción
Aplicación frontend desarrollada con Vue 3, Vite, Pinia y Tailwind CSS para consumir la API REST de Laravel.

## Requisitos Previos
- Node.js 18 o superior
- npm o yarn

## Instalación

### 1. Clonar el repositorio
git clone <url-del-repositorio>
cd vue-frontend

### 2. Instalar dependencias
npm install

### 3. Configurar variable de entorno
Crea un archivo .env en la raíz:
VITE_API_URL=http://127.0.0.1:8000/api

### 4. Ejecutar en modo desarrollo
npm run dev

### 5. Compilar para producción
npm run build

## URLs de Acceso
- Desarrollo: http://localhost:5173
- Producción: npm run build y servir la carpeta dist/

## Vistas Implementadas
- Dashboard inicial (/)
- Listado de productos (/products)
- Formulario de producto (/products/create y /products/edit/:id)
- Listado de categorías (/categories)

## Características
- Vue 3 con Composition API
- State management con Pinia
- Ruteo con Vue Router
- Estilos con Tailwind CSS
- Peticiones HTTP con Axios
- Interceptor global de errores
- Manejo de estados loading/success/error
- Validaciones de formularios
- Alertas visuales

## Estructura del Proyecto
vue-frontend/
├── src/
│   ├── components/
│   ├── views/
│   │   ├── Dashboard.vue
│   │   ├── ProductsList.vue
│   │   ├── ProductForm.vue
│   │   └── CategoriesList.vue
│   ├── stores/
│   │   ├── index.js
│   │   ├── productStore.js
│   │   └── categoryStore.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env
├── package.json
├── tailwind.config.js
└── README.md

## Manejo de Estados
- Loading: Spinner o mensaje "Cargando..."
- Success: Mensaje visual de confirmación
- Error: Alerta roja con mensaje descriptivo

## Interceptor Axios
Todos los errores de red, 4xx y 5xx se manejan globalmente en src/services/api.js

## Tecnologías
- Vue 3
- Vite
- Pinia
- Vue Router
- Tailwind CSS
- Axios
