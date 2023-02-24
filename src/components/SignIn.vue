<template>
  <div class="singingeneral">
    <div class="containersing0">
      <img class="libreta" src="../images/agenda.png" alt="imagen libreta" />
      <div class="containersing1">
        <h3>Welcome to</h3>
        <h2 class="tit1"><i>My first </i></h2>
        <h1>ToDo Tasks</h1>
        <h4>Will help you to Keep your tasks under control!</h4>
      </div>
      <div class="containersing2">
        <h3 class="header-title">Log In to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>
        <form @submit.prevent="signIn" class="form-sign-in">
          <div class="formInputs">
            <div class="form">
              <div class="form-input">
                <label class="input-field-label"></label>
                <input
                  type="email"
                  class="input-field"
                  placeholder="insert your email here"
                  id="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-input">
                <label class="input-field-label"></label>
                <input
                  type="password"
                  class="input-field"
                  placeholder="insert your pasword here"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <button @click="signIn" class="buttonSign" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <p class="account">
          Dont have an account?
          <PersonalRouter
            :route="route"
            :buttonText="buttonText"
            class="sign-up-link"
          />
        </p>
      </div>
    </div>
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
