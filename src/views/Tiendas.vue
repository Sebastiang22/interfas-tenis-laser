<template>
  <div class="tiendas-container">
    <h1>Tiendas de la Empresa</h1>
    <ul v-if="tiendas.length">
      <li
        v-for="tienda in tiendas"
        :key="tienda.id"
        @click="verClientes(tienda.id)"
        class="clickable-item"
      >
        {{ tienda.nombre }}
      </li>
    </ul>
    <p v-else>No hay tiendas disponibles.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tiendas = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:7071/api/tiendas');
    console.log('Respuesta de la API:', response); // Imprimir la respuesta completa

    if (!response.ok) {
      throw new Error('Error al cargar las tiendas');
    }

    const dataText = await response.text(); // Obtener la respuesta como texto
    console.log('Datos de la API (como texto):', dataText); // Imprimir los datos como texto

    const data = JSON.parse(dataText); // Parsear el texto como JSON
    console.log('Datos de la API (parseados):', data); // Imprimir los datos parseados

    tiendas.value = data; // Asignamos directamente la respuesta
  } catch (error) {
    console.error('Error al cargar las tiendas:', error);
    alert('No se pudieron cargar las tiendas. Por favor, intenta nuevamente.');
  }
});

const verClientes = (tiendaId) => {
  router.push(`/tienda/${tiendaId}/clientes`);
};
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