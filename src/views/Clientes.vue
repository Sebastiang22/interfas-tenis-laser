<template>
  <div class="table-container">
    <h1>Lista de Clientes</h1>
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
          @click="verCredito(cliente.id)"
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
import { useRouter } from 'vue-router'

const router = useRouter()

const clientes = [
  { 
    id: 1, 
    nombre: 'Juan Pérez', 
    email: 'juan@example.com', 
    telefono: '123-456-7890',
    credito: {
      limite: 5000,
      utilizado: 2300,
      historial: ['2023-01: $300', '2023-02: $2000']
    }
  },
  {
    id: 2, 
    nombre: 'María López', 
    email: 'maria@example.com', 
    telefono: '987-654-3210',
    credito: {
      limite: 8000,
      utilizado: 4500,
      historial: ['2023-03: $1500', '2023-04: $3000']
    }
  },
  {
    id: 3, 
    nombre: 'Carlos Rodríguez', 
    email: 'carlos@example.com', 
    telefono: '456-789-0123',
    credito: {
      limite: 3000,
      utilizado: 1000,
      historial: ['2023-05: $500', '2023-06: $500']
    }
  }
]

const verCredito = (id) => {
  router.push(`/cliente/${id}`)
}
</script>

<style>
.table-container {
  padding: 20px;
  max-width: 800px;
  margin: 20px auto; /* Centra horizontalmente el contenedor */
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center; /* Centra el contenido interno */
}

table {
  width: 100%;
  margin-top: 20px;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.clickable-row:hover {
  background-color: #f0f0f0;
}
</style>
