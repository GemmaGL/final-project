<script setup>
import { ref } from "vue";
const message = ref("");
</script>

<template>
  <Nav></Nav>
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
  
</template>

<style scoped></style>
