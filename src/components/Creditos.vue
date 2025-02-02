<template>
  <div class="creditos-container">
    <h2>Detalles de Crédito - Cliente {{ clienteId }}</h2>
    <button @click="volver">Volver</button>

    <div v-if="clienteCredito" class="credito-info">
      <p><strong>Valor Artículo:</strong> ${{ clienteCredito.valorArticulo }}</p>
      <p><strong>Valor del Crédito:</strong> ${{ clienteCredito.valorCredito }}</p>
    </div>

    <table v-if="clienteCredito">
      <thead>
        <tr>
          <th>#</th>
          <th>Precio Cuota</th>
          <th>Estado</th>
          <th>Fecha de Vencimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cuota, index) in clienteCredito.cuotas" :key="index">
          <td>{{ index + 1 }}</td>
          <td>${{ cuota.precio }}</td>
          <td>{{ cuota.estado }}</td>
          <td>{{ cuota.fechaVencimiento }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Obtenemos el id del cliente desde los parámetros de la ruta
const route = useRoute()
const router = useRouter()
const clienteId = route.params.id

// Datos de ejemplo (en un escenario real estos datos se obtendrían de una API)
const clientes = [
  { 
    id: 1, 
    credito: {
      valorArticulo: 10000,
      valorCredito: 5000,
      cuotas: [
        { precio: 500, estado: 'Pagada', fechaVencimiento: '2023-07-15' },
        { precio: 500, estado: 'Pendiente', fechaVencimiento: '2023-08-15' }
      ]
    }
  },
  { 
    id: 2, 
    credito: {
      valorArticulo: 15000,
      valorCredito: 8000,
      cuotas: [
        { precio: 800, estado: 'Pagada', fechaVencimiento: '2023-06-20' },
        { precio: 800, estado: 'Pendiente', fechaVencimiento: '2023-07-20' }
      ]
    }
  },
  { 
    id: 3, 
    credito: {
      valorArticulo: 8000,
      valorCredito: 3000,
      cuotas: [
        { precio: 300, estado: 'Pagada', fechaVencimiento: '2023-05-10' },
        { precio: 300, estado: 'Pendiente', fechaVencimiento: '2023-06-10' }
      ]
    }
  }
]

const clienteCredito = ref(null)

onMounted(() => {
  // Convertimos el id a número para hacer la comparación
  clienteCredito.value = clientes.find(c => c.id === Number(clienteId))?.credito
})

const volver = () => {
  router.push('/')
}
</script>

<style scoped>
.creditos-container {
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.credito-info {
  margin-bottom: 20px;
  font-size: 16px;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
