import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ProductsBoard from "./components/ProductsBoard.vue";

const routes = [
  {
    path: "/",
    redirect: "/products"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/products",
    name: "products",
    component: ProductsBoard,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;