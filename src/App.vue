<!-- App.vue -->
<template>
  <Header />
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from './components/header.vue'
</script>

<style>
.content {
  margin-top: 100px; /* Ajusta este valor para separar el header del contenido */
}
</style>
