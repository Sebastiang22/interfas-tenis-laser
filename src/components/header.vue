<template>
  <div class="header">
    <h3>Tenis Laser</h3>
    <!-- Si no estamos en la vista de Login, mostramos el botón -->
    <template v-if="route.name !== 'Login'">
      <button class="login-button" v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
      <button class="login-button" v-else @click="goToLogin">Iniciar Sesión</button>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Variable reactiva para saber si el usuario está autenticado.
const isAuthenticated = ref(localStorage.getItem('authenticated') === 'true')

// Observamos los cambios en la ruta y actualizamos el estado de autenticación.
watch(
  () => route.fullPath,
  () => {
    isAuthenticated.value = localStorage.getItem('authenticated') === 'true'
  }
)

// Función para redirigir al login.
const goToLogin = () => {
  router.push({ name: 'Login' })
}

// Función para cerrar sesión.
const logout = () => {
  // Remover el indicador de autenticación.
  localStorage.removeItem('authenticated')
  isAuthenticated.value = false
  // Redirigir a la vista de login o a otra ruta deseada.
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between; /* Título a la izquierda y botón a la derecha */
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: red;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.login-button {
  padding: 6px 12px;
  background-color: #fff;
  color: red;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #f0f0f0;
}
</style>
