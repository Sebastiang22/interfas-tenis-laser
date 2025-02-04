<template>
  <div class="creditos-container">
    <h2>Detalles de Crédito - Cliente {{ clienteId }}</h2>
    <button @click="volver">Volver</button>
    <div v-if="clienteCredito">
      <p><strong>Valor Artículo:</strong> ${{ clienteCredito.valorArticulo }}</p>
      <p><strong>Valor del Crédito:</strong> ${{ clienteCredito.valorCredito }}</p>
      <h3>Cuotas</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Precio Cuota</th>
              <th>Estado</th>
              <th>Fecha Vencimiento</th>
              <th>Fecha Pago</th>
              <th>Monto Abono</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cuota in clienteCredito.cuotas" :key="cuota.numero">
              <td>{{ cuota.numero }}</td>
              <td>${{ cuota.precio }}</td>
              <td>{{ cuota.estado }}</td>
              <td>{{ cuota.fechaVencimiento }}</td>
              <td>{{ cuota.fechaPago || 'No pagada' }}</td>
              <td>${{ cuota.montoAbono }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-else>Cargando crédito...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const clienteId = route.params.id;
const clienteCredito = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:7071/api/creditos/${clienteId}`);
    if (!response.ok) {
      throw new Error('Error al cargar el crédito');
    }
    clienteCredito.value = await response.json();
  } catch (error) {
    console.error(error);
    alert('No se pudo cargar el crédito. Por favor, intenta nuevamente.');
  }
});

const volver = () => {
  router.back();
};
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

.table-container {
  width: 100%;
  overflow-x: auto; /* Permite desplazarse horizontalmente si es necesario */
  box-sizing: border-box; /* Para incluir padding y border en el ancho total */
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
}
</style>