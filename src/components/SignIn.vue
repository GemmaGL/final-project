<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <div class="header">
      <div class="header-description">
        <h2>Welcome to</h2>
        <div class="container0">
          <h1 id="titulo1">My first</h1>
          <img id="libreta" src="../images/agenda.png" alt="imagen libreta" />
        </div>
        <div class="container1">
          <h1>ToDo Tasks</h1>
          <h4>Will help you to Keep your tasks under control!</h4>
        </div>
      </div>
    </div>
  </div>
  <div class="container2">
    <h2 class="header-title">Log In to ToDo App</h2>
    <h3 class="header-subtitle">Start organizing your tasks!</h3>
    <form @submit.prevent="signIn" class="form-sign-in">
      <div class="form">
        <div class="form-input">
          <label class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />
        </div>
        <div class="form-input">
          <label class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />
        </div>
      </div>
      <button @click="signIn" class="button" type="submit">Sign In</button>
    </form>
    <p>
      Dont have an account?
      <PersonalRouter
        :route="route"
        :buttonText="buttonText"
        class="sign-up-link"
      />
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMsg = ref("");

const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  if (email.value && password.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signIn(email.value, password.value);
      //he añadido un mensaje confirmando registro
      redirect.push({ path: "/" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Handlee&family=Neucha&family=Open+Sans&display=swap");
</style>
