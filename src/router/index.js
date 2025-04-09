import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/data/InternalStorage.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeScreen.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginScreen.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterScreen.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/postDetails",
    name: "postDetails",
    component: () => import("../views/PostDetailsScreen.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/newPost",
    name: "newPost",
    component: () => import("../views/NewPostScreen.vue"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  if (!auth.isAuthenticated() && routeTo.meta.requireAuth) {
    alert("Unauthorized");
    next("login");
  } else {
    next();
  }
});

export default router;
