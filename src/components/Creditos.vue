<!-- components/Creditos.vue -->
<template>
  <div class="creditos-container">
    <h2>Detalles de Crédito - Cliente {{ clienteId }}</h2>
    <button @click="volver">Volver</button>

    <div v-if="clienteCredito">
      <p><strong>Valor Artículo:</strong> ${{ clienteCredito.valorArticulo }}</p>
      <p><strong>Valor del Crédito:</strong> ${{ clienteCredito.valorCredito }}</p>
      <h3>Cuotas</h3>
      <table>
        <thead>
          <tr>
            <th>Número</th>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const clienteId = route.params.id

// Datos de ejemplo: lista de clientes con sus créditos (normalmente vendrían de un API)
const allClientes = [
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
  },
  { 
    id: 4, 
    credito: {
      valorArticulo: 9000,
      valorCredito: 4000,
      cuotas: [
        { precio: 400, estado: 'Pagada', fechaVencimiento: '2023-04-15' },
        { precio: 400, estado: 'Pendiente', fechaVencimiento: '2023-05-15' }
      ]
    }
  }
]

const clienteCredito = ref(null)

onMounted(() => {
  const cliente = allClientes.find(c => c.id === Number(clienteId))
  if (cliente) {
    clienteCredito.value = cliente.credito
  }
})

const volver = () => {
  router.back()
}
</script>

<style scoped>
.creditos-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

button {
  margin-bottom: 20px;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
