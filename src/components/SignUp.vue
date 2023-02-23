<template>
  <main class="singUpG">
    <div class="singingeneral">
      <div class="containersing0">
        <img class="libreta" src="../images/agenda.png" alt="imagen libreta" />
        <div class="containersing1">
          <h3>Welcome to</h3>
          <h2 class="tit1"><i>My first</i></h2>
          <h1>ToDo Tasks</h1>
          <h4>Will help you to Keep your tasks under control!</h4>
        </div>
      </div>
      <div class="containersing2">
        <h3 class="header.title">Register to ToDo App</h3>
        <p class="header-subtitle">Start organizing your tasks!</p>

        <form @submit.prevent="signUp" class="form-sign-in">
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
            <div class="form-input">
              <label class="input-field-label"></label>
              <input
                type="password"
                class="input-field"
                placeholder="confirm your password"
                id="confirmPassword"
                v-model="confirmPassword"
                required
              />
            </div>
            <button class="buttonSign" type="submit">Sign Up</button>
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
      </div>
    </div>
          

      <div v-show="errorMsg">{{ errorMsg }}</div>
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

/*h1 {
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
}*/
</style>
