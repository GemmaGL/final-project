<template>
  <div class="notadh">
    <div class="containerTask">
      <h3 :class="props.task.is_complete ? 'taskCompleted' : 'taskNoCompleted'">
        {{ task.title }}
      </h3>
      <h4 :class="props.task.is_complete ? 'taskCompleted' : 'taskNoCompleted'">
        {{ task.description }}
      </h4>
    </div>
    <div>
      <template v-if="task.is_complete">
        <button class="disabled buttUpd"></button>
      </template>
      <template v-else>
        <button v-if="hideBut" class="buttUpd" @click="showModalInputToggle"></button>
      </template>
      <button v-if="hideBut" class="buttCompl" @click="toogleTask"></button>

      <button v-if="hideBut" class="buttDel" @click="showModalToggle"></button>
    </div>
    <div class="modalcontainer">
      <div class="modal-mask" v-if="showModal">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Are you sure you want to delete the task "{{ task.title }}" ?
              </slot>
            </div>

            <div class="modal-body">
              <!--<slot name="body">
              default body
            </slot>-->
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="botonokmod" @click="deleteTask">Yes</button>
                <button class="botoncancmod" @click="showModalToggle">Cancel</button>
              </slot>
            </div>
          </div>
        </div>
        <!-- <h2>Are you sure you want to delete the task "{{ task.title }}" ?</h2>
      <button @click="deleteTask">Yes</button>
      <button @click="showModalToggle">Cancel</button> -->
      </div>
    </div>
    <div class="modal-mask1" v-if="showModalEdit">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Here you can edit your task "{{ task.title }}"
            </slot>
          </div>

          <div class="modal-body">
            <div class="inputNewTitle">
              <p>Insert new title</p>
              <input type="text" v-model="newTitle" placeholder="Insert title" />
            </div>
            <div class="inputNewDescription">
              <p>Insert new description</p>
              <input type="text" v-model="newDescription" placeholder="Insert task description" />
            </div>
            <!--<slot name="body">
              default body
            </slot>-->
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="absolutePosition" v-if="showErrorMessage">
                <p class="error-text">{{ errorMessage }}</p>
              </div>

              <button class="buttonSendData" @click="sendData">Confirm</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const emit = defineEmits(["updateTask"]);

const props = defineProps({
  task: Object,
});

const showInput = ref(false);
const newTitle = ref("");
const newDescription = ref("");
const hideBut = (true)
const showModalEdit = ref(false);
const showModalInputToggle = () => {
  showModalEdit.value = !showModalEdit.value;
};

function inputToggle() {
  showInput.value = !showInput.value;
  showModalInputToggle();
}
// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id);
  showModalToggle();
};

const completedTask = ref(false);
const showModal = ref(false);
const showModalToggle = () => {
  showModal.value = !showModal.value;
};
//funcion para editar la tarea - mirar los nombres en task.js

const showErrorMessage = ref();
const errorMessage = ref(null);

const sendData = async () => {
  if (newTitle.value.length < 4 || newDescription.value.length < 4) {
    showErrorMessage.value = true;
    errorMessage.value =
      "The task title or description is empty or just too short. (That's what she said)";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
    //Lanzar un error
  } else {
    await taskStore.editTask(newTitle.value, newDescription.value, props.task.id);
    emit("updateTask");
    showModalEdit.value = !showModalEdit.value;
  }
};

const toogleTask = async () => {
  await taskStore.toggleTask(props.task.id, !props.task.is_complete);
  showInput.value = false;
  emit("updateTask");
  hideBut.value = !hideBut.value;
};

const editMessage = async () => {
  if (props.task.is_complete === true) {
    showErrorMessage.value = true;
    errorMessage.value = "If you want to edit mark the task as uncomplete";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  }
};
</script>

<style scoped>
body {
  margin-left: 20%;
}

.taskCompleted {
  text-decoration-line: line-through;
  color: #98f5e1;
}
</style>


<!-- **Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview. -->