<template>
  <div
    class="flex justify-center items-start h-screen w-full p-4 bg-white border border-gray-200 shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex justify-center"
  >
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Register to our platform
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            v-model="email"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            v-model="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="register"
        >
          Submit
        </button>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="signInWithGoogle"
        >
          Sign in with Google
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Have account already?
          <a
            href="/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
            >Login</a
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  console.log("went register");
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");

      console.log(auth.currentUser);
      // router.push("/")
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      //handle error
    });
};
</script>

<style scoped></style>
