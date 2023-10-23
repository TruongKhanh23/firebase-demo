import { createRouter, createWebHistory } from "vue-router"; // Import the necessary functions and objects

import HomePage from "@/components/HomePage.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import FirestoreBasic from "@/components/FirestoreBasic.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/firestore-basic", component: FirestoreBasic },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for the default history mode
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You don't have access!");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
