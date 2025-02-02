<template>
  <div class="header">
    <h3>Tenis Laser</h3>
  </div>
</template>

<script setup>
// No necesitamos lógica adicional aquí
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: red; /* Fondo rojo */
  color: white; /* Texto blanco */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra opcional para mejor visibilidad */
  z-index: 1000; /* Asegura que el header esté por encima de otros elementos */
}
</style>