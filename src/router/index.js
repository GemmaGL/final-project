import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Clock from "../views/Clock.vue";
import EditProfile from "../views/EditProfile.vue";
import Game from "../views/Game.vue";

const routes = [
  {
    path: "/auth",
    component: Auth,
    children: [
      { path: "login", component: SignIn },
      { path: "signup", component: SignUp },
    ],
  },
  { path: "/", component: Home },
  { path: "/account", component: Account },
  { path: "/clock", component: Clock },
  { path: "/editprof", component: EditProfile },
  { path: "/game", component: Game },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
