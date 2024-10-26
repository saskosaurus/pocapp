import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeScreen.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginScreen.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterScreen.vue"),
  },
  {
    path: "/postDetails",
    name: "postDetails",
    component: () => import("../views/PostDetailsScreen.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
