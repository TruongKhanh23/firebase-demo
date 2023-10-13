import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIdso7Vq4kbD6NaGlHJhjvPmDqTZqxFLU",
  authDomain: "kdotkhanh-firebase-demo.firebaseapp.com",
  projectId: "kdotkhanh-firebase-demo",
  storageBucket: "kdotkhanh-firebase-demo.appspot.com",
  messagingSenderId: "519468087445",
  appId: "1:519468087445:web:c61563afed34bf6109c39c"
};

initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
