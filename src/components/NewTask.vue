<template>
  <div class="newTaskFull">
    <h1 class="tituloNewTask">Let's add a new Task!</h1>
    <div v-if="showErrorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>
    <div class="newTask">
      <div class="input-field">
        <input class="inputTitle" type="text" placeholder="Add a Task Title" v-model="name" />
      </div>
      <div class="input-field">
        <input
          class="inTextDescp"
          type="text"
          placeholder="Add a Task Description"
          v-model="description"
          cols="10"
          rows="30"
        />
        <div v-if="showErrorMessage">
          <p class="error-text">{{ errorMessage }}</p>
        </div>
      </div>
      <button @click="addTask" class="buttonAdd">Add</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

const emit = defineEmits(["addTitle"]);

// Arrow function para crear tareas.
const addTask = async () => {
  if (name.value.length < 4 || description.value.length < 4) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title or description is too short";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    await taskStore.addTask(name.value, description.value);
    name.value = "";
    description.value = "";

    emit("addTitle");
  }
};
</script>

<style></style>
