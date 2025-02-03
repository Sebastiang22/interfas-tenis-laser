// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Tiendas from '../views/Tiendas.vue'
import Clientes from '../views/Clientes.vue'
import Creditos from '../components/Creditos.vue'

// Función simple para verificar autenticación (usando localStorage en este ejemplo)
const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true'
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: '/',
    name: 'Tiendas',
    component: Tiendas,
    meta: { requiresAuth: true }  // Ruta protegida: requiere autenticación
  },
  { 
    path: '/tienda/:id/clientes',
    name: 'Clientes',
    component: Clientes,
    props: true,
    meta: { requiresAuth: true }
  },
  { 
    path: '/cliente/:id',
    name: 'Creditos',
    component: Creditos,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia global para revisar la autenticación antes de cada navegación.
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
