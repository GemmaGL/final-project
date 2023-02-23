<script setup>
import Nav from "../components/Nav.vue";
import FooterComponent from "../components/FooterComponent.vue";
import { ref, onMounted } from "vue";

const hours = ref("");
const minutes = ref("");
const seconds = ref("");

onMounted(() => {
  setInterval(() => {
    const now = new Date();
    hours.value = now.getHours();
    minutes.value = now.getMinutes();
    seconds.value = now.getSeconds();
  }, 1000);
});

/* export default {
  data() {
    return {
      hours: "",
      minutes: "",
      seconds: "",
    };
  },
  mounted() {
    setInterval(() => {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
      this.seconds = now.getSeconds();
    }, 1000);
  },
}; */
</script>

<template>
  <Nav></Nav>
  <div class="textClock">What time is it?</div>
  <img class="imgClock" src="../images/despertador.png" alt="despertador" />

  <div class="clock">
    <span class="hour">{{ hours }}</span
    >: <span class="minute">{{ minutes }}</span
    >:
    <span class="second">{{ seconds }}</span>
  </div>
  <div class="nino">
    <img src="../images/ninopaz.png" />
  </div>
  <div class="blanco"></div>
  <footer-component />
</template>

<style scoped>
.clock {
  display: inline-block;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  padding: 0.5em;
  background-color: #eee;
  padding: 2%;
  border-radius: 1em;
  width: 300px;
}
.hour,
.minute,
.second {
  display: inline-block;
  width: 1.5em;
}
</style>
