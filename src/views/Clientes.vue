<template>
  <div class="clientes-container">
    <h1>Clientes de la Tienda {{ tiendaId }}</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="cliente in clientes" 
          :key="cliente.id"
          @click="verCreditos(cliente.id)"
          class="clickable-row"
        >
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.telefono }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const tiendaId = route.params.id

// Datos de ejemplo: lista de clientes
const allClientes = [
  { 
    id: 1, 
    nombre: 'Juan Pérez', 
    telefono: '123-456-7890', 
    tiendaId: 1, 
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
    nombre: 'María López', 
    telefono: '987-654-3210', 
    tiendaId: 2, 
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
    nombre: 'Carlos Rodríguez', 
    telefono: '456-789-0123', 
    tiendaId: 1, 
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
    nombre: 'Ana Gómez', 
    telefono: '111-222-3333', 
    tiendaId: 3, 
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

const clientes = ref([])

onMounted(() => {
  // Filtra los clientes de acuerdo a la tienda seleccionada.
  clientes.value = allClientes.filter(cliente => cliente.tiendaId === Number(tiendaId))
})

const verCreditos = (clienteId) => {
  router.push(`/cliente/${clienteId}`)
}
</script>

<style scoped>
.clientes-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
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

.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.clickable-row:hover {
  background-color: #f0f0f0;
}
</style>
