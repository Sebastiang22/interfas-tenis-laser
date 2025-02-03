<!-- views/Tiendas.vue -->
<template>
    <div class="tiendas-container">
      <h1>Tiendas de la Empresa</h1>
      <ul>
        <li v-for="tienda in tiendas" :key="tienda.id" @click="verClientes(tienda.id)" class="clickable-item">
          {{ tienda.nombre }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // Datos de ejemplo: lista de tiendas
  const tiendas = ref([
    { id: 1, nombre: "Tienda Centro" },
    { id: 2, nombre: "Tienda Norte" },
    { id: 3, nombre: "Tienda Sur" }
  ])
  
  const verClientes = (tiendaId) => {
    router.push(`/tienda/${tiendaId}/clientes`)
  }
  </script>
  
  <style scoped>
  .tiendas-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .clickable-item {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    margin: 10px 0;
    transition: background-color 0.3s;
  }
  
  .clickable-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  