import { createRouter, createWebHistory } from 'vue-router'; // Import the necessary functions and objects

import HomePage from '@/components/HomePage.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for the default history mode
  routes,
});

export default router;