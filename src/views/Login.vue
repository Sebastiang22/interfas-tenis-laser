<!-- views/Login.vue -->
<template>
    <div class="login-container">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nombre de Cuenta:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Entrar</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Variables reactivas para usuario y contraseña.
  const username = ref('')
  const password = ref('')
  const error = ref('')
  
  // Datos de ejemplo: en un escenario real, esto se validaría en el backend.
  const validUser = 'admin'
  const validPass = '1234'
  
  const login = () => {
    if (username.value === validUser && password.value === validPass) {
      // Marcar al usuario como autenticado.
      localStorage.setItem('authenticated', 'true')
      // Redirigir a la vista de clientes.
      router.push({ name: 'Tiendas' })
    } else {
      error.value = 'Nombre de cuenta o contraseña incorrectos.'
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
  
  .login-container form div {
    margin-bottom: 15px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  