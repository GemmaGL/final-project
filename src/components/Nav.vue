<template>
  <nav>
    <div class="navbar">
      <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->
      <img class="libretanav" src="../images/agenda.png" />
      <div class="textsNav">
        <router-link to="/"> Home </router-link>

        <ul class="navList">
          <li>
            <router-link to="/">Task Manager</router-link>
          </li>
          <li>
            <router-link to="/clock">Clock</router-link>
          </li>
          <!--<li>
            <router-link to="/account">Your Account</router-link>
          </li>-->
        </ul>

        <div>
          <ul>
            <li class="log-out-welcome">
            </li>
            <li>
              <button @click="signOut" class="buttonsign">Log out</button>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
    <div class="menuHamb">
      
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

<style>
</style>
