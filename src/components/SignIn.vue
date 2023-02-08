<!-- COMPONENTE BOILERPLATE -->

<template>
  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <p class="header-subtitle">Start organizing your tasks!</p>

    Estamos en la ruta de login. Aquí deberíais crear un form con la lógica
    correspondiente para que este permita al usuario loguearse con su email y su
    contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)
  </div>
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
    <button class="button" type="submit">Sign In</button>
  </form>
  <p>
    Dont have an account?
    <PersonalRouter
      :route="route"
      :buttonText="buttonText"
      class="sign-up-link"
    />
  </p>
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
// repasarla con detenimiento porque tengo dudas
//NO ESTA ACABADA//
//const signIn = async () => {
//  if(password.value === confirmPassword.value){
//   try {
//     await useUserStore().signIn(email.value, password.value);
//      redirect.push({path:})

//} catch (error) {}
//};
</script>

<style></style>
