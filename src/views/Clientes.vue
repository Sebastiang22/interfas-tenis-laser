<template>
  <div class="clientes-container">
    <h1>Clientes de la Tienda {{ tiendaId }}</h1>
    
    <p v-if="isLoading">Cargando clientes...</p>
    <p v-else-if="!clientes.length">No hay clientes registrados en esta tienda</p>
    
    <table v-else>
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
    <!-- Modal para mostrar los créditos del cliente -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>Créditos del Cliente {{ selectedClienteId }}</h2>
        <div v-if="creditoLoading">Cargando créditos...</div>
        <div v-else-if="!creditos.length">
          <p>No se encontraron créditos para este cliente.</p>
        </div>
        <div v-else>
          <div v-for="(credito, index) in creditos" :key="credito.credito_id" class="credito-item">
            <h3>Crédito #{{ index + 1 }}</h3>
            <p><strong>Valor del Artículo:</strong> ${{ credito.valorArticulo }}</p>
            <p><strong>Valor del Crédito:</strong> ${{ credito.valorCredito }}</p>
            <p><strong>Fecha de Solicitud:</strong> {{ credito.fechaSolicitud }}</p>
            <p><strong>Estado:</strong> {{ credito.estado }}</p>
            <h4>Cuotas</h4>
            <!-- Contenedor deslizante para la tabla -->
            <div class="scrollable-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Fecha de Pago</th>
                    <th>Monto Abono</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cuota in credito.cuotas" :key="cuota.numero">
                    <td>{{ cuota.numero }}</td>
                    <td>${{ cuota.precio }}</td>
                    <td>{{ cuota.estado }}</td>
                    <td>{{ cuota.fechaVencimiento }}</td>
                    <td>{{ cuota.fechaPago || 'No pagado' }}</td>
                    <td>${{ cuota.montoAbono || 0 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}

interface Cuota {
  numero: number;
  precio: number;
  estado: string;
  fechaVencimiento: string | null;
  fechaPago: string | null;
  montoAbono: number | null;
}

interface Credito {
  credito_id: number;
  valorArticulo: number;
  valorCredito: number;
  fechaSolicitud: string;
  estado: string;
  cuotas: Cuota[];
}

const route = useRoute();
const tiendaId = route.params.id as string;
const clientes = ref<Cliente[]>([]);
const isLoading = ref(true);

// Estado para el modal y los créditos
const showModal = ref(false);
const selectedClienteId = ref<number | null>(null);
const creditos = ref<Credito[]>([]);
const creditoLoading = ref(false);

onMounted(async () => {
  try {
    const response = await fetch(`https://tenis-laser-backend.azurewebsites.net/api/clientes/${tiendaId}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const rawData = await response.text();
    console.log("Respuesta de la API:", rawData); // Verificar formato
    
    // Intentar parsear manualmente
    clientes.value = JSON.parse(rawData.replace(/'/g, '"')); // Reemplazar comillas simples
  } catch (error) {
    console.error('Error fetching clientes:', error);
    alert('Error al cargar los clientes');
  } finally {
    isLoading.value = false;
  }
});

const verCreditos = async (clienteId: number) => {
  selectedClienteId.value = clienteId;
  creditoLoading.value = true;
  showModal.value = true;

  try {
    const response = await fetch(`https://tenis-laser-backend.azurewebsites.net/api/creditos/${clienteId}`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    // Asignar los créditos obtenidos
    creditos.value = await response.json();
  } catch (error) {
    console.error('Error fetching créditos:', error);
    alert('Error al cargar los créditos del cliente');
  } finally {
    creditoLoading.value = false;
  }
};
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

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  white-space: nowrap; /* Evitar que el texto se rompa */
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.clickable-row:hover {
  background-color: #f0f0f0;
}

/* Estilos para el modal */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: #000;
}

.credito-item {
  margin-bottom: 20px;
}

/* Contenedor deslizante para la tabla */
.scrollable-table {
  overflow-x: auto; /* Habilitar desplazamiento horizontal */
  max-width: 100%; /* Limitar el ancho máximo */
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.scrollable-table table {
  min-width: 600px; /* Ancho mínimo para forzar el desplazamiento */
}
</style>