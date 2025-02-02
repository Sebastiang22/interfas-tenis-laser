// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Clientes from '../views/Clientes.vue'      // Vista con la tabla de clientes
import Creditos from '../components/Creditos.vue'   // Nuestro componente de crédito

const routes = [
  { 
    path: '/', 
    component: Clientes 
  },
  { 
    path: '/cliente/:id', 
    component: Creditos,
    props: true   // Esto hace que el parámetro "id" se pase como prop (opcional si usas useRoute())
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
