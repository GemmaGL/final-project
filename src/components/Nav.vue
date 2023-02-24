<template>
  <nav class="navtotal">
    <div class="navbar">
      <button @click="toggleMenuHamburger" class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <img class="libretanav" src="../images/agenda.png" />

      <div class="textsNav">

        <span class="nav-menu" :class="{ active: showMenu }">
          <router-link v-if="showMenu" to="/" class="navBtn"> Home </router-link>
          <router-link v-if="showMenu" to="/" class="navBtn">Tasks</router-link>
          <router-link v-if="showMenu" to="/Clock" class="navBtn">Clock</router-link>
          <!--<router-link v-if="showMenu" to="/account" class="navBtn">Your Account</router-link>-->
        </span>

        <span class="nav-ordernador">
          <router-link to="/" class="navBtn"> Home </router-link>
          <router-link to="/" class="navBtn">Tasks</router-link>
          <router-link to="/Clock" class="navBtn">Clock</router-link>
        </span>

        <!--<li>
            <router-link to="/account">Your Account</router-link>
          </li>-->
        <div class="log-out-welcome">
          <button @click="signOut" class="buttonsign butLog">Log out</button>
        </div>
      </div>


    </div>
  </nav>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Clock from "../views/Clock.vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const showMenu = ref(false);

const toggleMenuHamburger = () => {
  showMenu.value = !showMenu.value;
  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("active");
};

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    useUserStore().signOut();
    // then redirect user to the homeView
    redirect.push({ path: "auth/login" });
  } catch (error) {
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
  errorMsg.value = "error";
};


</script>

<style></style>
