<template>
  <main>
    <div class="container">
      <div class="header">
        <div class="header-description">
          <h2>Welcome to</h2>
          <h1 id="titulo1">My</h1>
          <img id="libreta" src="../images/agenda.png" alt="imagen libreta" />
          <div class="cajaTitulo">
            <h1>ToDo Tasks</h1>
            <h4>Will help you to Keep your tasks under control</h4>
          </div>
          <h3 class="header-title">Register to ToDo App</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <form @submit.prevent="signUp" class="form-sign-in">
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
          <div class="form-input">
            <label class="input-field-label">Confirm password</label>
            <input
              type="password"
              class="input-field"
              placeholder="**********"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="button" type="submit">Sign Up</button>
          <p>
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-up-link"
            />
          </p>
        </div>
      </form>

      <div v-show="errorMsg">{{ errorMsg }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      //he añadido un mensaje confirmando registro
      alert(
        "Congrats! Your registration has been succesfull. Please don't forget to check your email to confirm "
      );
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
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
  errorMsg.value = "error";
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Handlee&family=Neucha&family=Open+Sans&display=swap");

h1 {
  font-family: "Fredoka", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  text-shadow: 1px, 1px, 5px, #fafafa;
}

#titulo1 {
  font-style: italic;
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}
#libreta {
  width: 40%;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cajaTitulo {
  width: 120%;
  background-color: white;
  border-radius: 5px;
  margin: 5%;
  padding: 3%;
  text-align: center;
}
</style>
